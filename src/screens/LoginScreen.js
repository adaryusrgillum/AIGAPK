import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AmbientBackdrop, TiltCard } from '../components/ExperienceComponents';
import { CONTACT_INFO } from '../data';
import { signIn, signUp, resetPassword } from '../services/auth';
import { COLORS } from '../theme';

const MODE_SIGN_IN = 'signin';
const MODE_SIGN_UP = 'signup';
const MODE_RESET = 'reset';

export default function LoginScreen() {
  const [mode, setMode] = useState(MODE_SIGN_IN);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const enter = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(enter, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [enter]);

  const opacity = enter.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const translateY = enter.interpolate({ inputRange: [0, 1], outputRange: [36, 0] });

  const friendlyError = (code) => {
    const map = {
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/user-disabled': 'This account has been disabled.',
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password. Try again.',
      'auth/invalid-credential': 'Invalid email or password.',
      'auth/email-already-in-use': 'An account already exists with this email.',
      'auth/weak-password': 'Password must be at least 6 characters.',
      'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
      'auth/network-request-failed': 'Network error. Check your connection.',
    };
    return map[code] || 'Something went wrong. Please try again.';
  };

  const handleSubmit = async () => {
    setError('');
    const trimEmail = email.trim();
    if (!trimEmail) {
      setError('Please enter your email.');
      return;
    }
    if (mode !== MODE_RESET && !password) {
      setError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === MODE_SIGN_IN) {
        await signIn(trimEmail, password);
      } else if (mode === MODE_SIGN_UP) {
        await signUp(trimEmail, password, name.trim() || undefined);
      } else {
        await resetPassword(trimEmail);
        Alert.alert('Check your email', 'A password reset link has been sent to ' + trimEmail);
        setMode(MODE_SIGN_IN);
      }
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = (next) => {
    setError('');
    setMode(next);
  };

  const titles = {
    [MODE_SIGN_IN]: 'Sign in to your policy dashboard',
    [MODE_SIGN_UP]: 'Create your account',
    [MODE_RESET]: 'Reset your password',
  };
  const buttonLabels = {
    [MODE_SIGN_IN]: isSubmitting ? 'Signing in...' : 'Continue to Dashboard',
    [MODE_SIGN_UP]: isSubmitting ? 'Creating account...' : 'Create Account',
    [MODE_RESET]: isSubmitting ? 'Sending...' : 'Send Reset Link',
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.midnight} />
      <AmbientBackdrop tone="blue" />

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Animated.View style={[styles.content, { opacity, transform: [{ translateY }] }]}>
          <View style={styles.topCopy}>
            <Text style={styles.eyebrow}>Secure Client Access</Text>
            <Text style={styles.title}>{titles[mode]}</Text>
            <Text style={styles.subtitle}>
              Manage your policies, request quotes, and connect with our team from anywhere.
            </Text>
          </View>

          {mode === MODE_SIGN_IN && (
            <TiltCard style={styles.showcaseCard}>
              <View style={styles.showcaseHeader}>
                <View style={styles.showcaseIcon}>
                  <MaterialCommunityIcons name="shield-check" size={24} color={COLORS.secondary} />
                </View>
                <View>
                  <Text style={styles.showcaseTitle}>Your insurance, simplified</Text>
                  <Text style={styles.showcaseDesc}>Quotes, policy management, and expert support in one place.</Text>
                </View>
              </View>
              <View style={styles.showcaseStats}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>6</Text>
                  <Text style={styles.statLabel}>Licensed States</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>19+</Text>
                  <Text style={styles.statLabel}>Coverage Types</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>24/7</Text>
                  <Text style={styles.statLabel}>Portal Access</Text>
                </View>
              </View>
            </TiltCard>
          )}

          <View style={styles.formCard}>
            {error ? (
              <View style={styles.errorBox}>
                <MaterialCommunityIcons name="alert-circle-outline" size={18} color="#FF6B6B" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {mode === MODE_SIGN_UP && (
              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>Full Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  placeholder="Jane Doe"
                  placeholderTextColor={COLORS.slateText}
                  style={styles.input}
                />
              </View>
            )}

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="name@example.com"
                placeholderTextColor={COLORS.slateText}
                style={styles.input}
              />
            </View>

            {mode !== MODE_RESET && (
              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholder="Enter password"
                  placeholderTextColor={COLORS.slateText}
                  style={styles.input}
                />
              </View>
            )}

            <TouchableOpacity
              style={[styles.primaryButton, isSubmitting && styles.buttonDisabled]}
              onPress={handleSubmit}
              activeOpacity={0.86}
              disabled={isSubmitting}
            >
              <Text style={styles.primaryButtonText}>{buttonLabels[mode]}</Text>
              {!isSubmitting && (
                <MaterialCommunityIcons name="arrow-right" size={18} color={COLORS.midnight} />
              )}
            </TouchableOpacity>

            {mode === MODE_SIGN_IN && (
              <>
                <TouchableOpacity
                  style={styles.textButton}
                  onPress={() => switchMode(MODE_RESET)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.textButtonLabel}>Forgot password?</Text>
                </TouchableOpacity>

                <View style={styles.dividerRow}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => switchMode(MODE_SIGN_UP)}
                  activeOpacity={0.82}
                >
                  <MaterialCommunityIcons name="account-plus-outline" size={18} color={COLORS.white} />
                  <Text style={styles.secondaryButtonText}>Create a New Account</Text>
                </TouchableOpacity>
              </>
            )}

            {mode === MODE_SIGN_UP && (
              <TouchableOpacity
                style={styles.textButton}
                onPress={() => switchMode(MODE_SIGN_IN)}
                activeOpacity={0.7}
              >
                <Text style={styles.textButtonLabel}>Already have an account? Sign in</Text>
              </TouchableOpacity>
            )}

            {mode === MODE_RESET && (
              <TouchableOpacity
                style={styles.textButton}
                onPress={() => switchMode(MODE_SIGN_IN)}
                activeOpacity={0.7}
              >
                <Text style={styles.textButtonLabel}>Back to sign in</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.portalButton}
              onPress={() => Linking.openURL(CONTACT_INFO.clientPortal)}
              activeOpacity={0.82}
            >
              <MaterialCommunityIcons name="open-in-new" size={18} color={COLORS.white} />
              <Text style={styles.secondaryButtonText}>Open Existing Client Portal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkRow}
              onPress={() => Linking.openURL('tel:' + CONTACT_INFO.phone)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="phone-in-talk" size={18} color={COLORS.secondary} />
              <Text style={styles.linkText}>Need help? Call {CONTACT_INFO.phone}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.midnight,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 34,
  },
  content: {
    gap: 18,
  },
  topCopy: {
    gap: 10,
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.secondary,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.slateText,
  },
  showcaseCard: {
    backgroundColor: COLORS.glassStrong,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    padding: 22,
  },
  showcaseHeader: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  showcaseIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: 'rgba(200, 169, 81, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showcaseTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 4,
  },
  showcaseDesc: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.slateText,
    maxWidth: '88%',
  },
  showcaseStats: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    lineHeight: 15,
    color: COLORS.slateText,
  },
  formCard: {
    backgroundColor: 'rgba(8, 20, 37, 0.88)',
    borderRadius: 26,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  fieldWrap: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.secondarySoft,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: COLORS.white,
    fontSize: 15,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    paddingVertical: 15,
    marginTop: 4,
  },
  primaryButtonText: {
    color: COLORS.midnight,
    fontSize: 15,
    fontWeight: '900',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    paddingVertical: 15,
    marginTop: 12,
  },
  secondaryButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,107,107,0.12)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,107,107,0.25)',
    padding: 12,
    marginBottom: 14,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: '#FF6B6B',
    lineHeight: 18,
  },
  textButton: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 4,
  },
  textButtonLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    color: COLORS.slateText,
    fontSize: 12,
    marginHorizontal: 14,
  },
  portalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    paddingVertical: 15,
    marginTop: 12,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  linkText: {
    fontSize: 13,
    color: COLORS.slateText,
  },
});