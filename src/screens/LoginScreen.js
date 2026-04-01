import React, { useEffect, useRef, useState } from 'react';
import {
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
import { COLORS } from '../theme';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onLogin({ email: email || 'guest@abelinsgroup.com' });
    }, 700);
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
            <Text style={styles.title}>Sign in to your policy dashboard</Text>
            <Text style={styles.subtitle}>
              Access coverages, review policy options, contact the agency, and jump into the client portal from a modern mobile flow.
            </Text>
          </View>

          <TiltCard style={styles.showcaseCard}>
            <View style={styles.showcaseHeader}>
              <View style={styles.showcaseIcon}>
                <MaterialCommunityIcons name="cube-outline" size={24} color={COLORS.secondary} />
              </View>
              <View>
                <Text style={styles.showcaseTitle}>Animated account shell</Text>
                <Text style={styles.showcaseDesc}>Ready for quotes, onboarding, and richer 3D-style motion.</Text>
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

          <View style={styles.formCard}>
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

            <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} activeOpacity={0.86}>
              <Text style={styles.primaryButtonText}>
                {isSubmitting ? 'Unlocking Workspace...' : 'Continue to Dashboard'}
              </Text>
              <MaterialCommunityIcons name="arrow-right" size={18} color={COLORS.midnight} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
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
              <Text style={styles.linkText}>Need help signing in? Call {CONTACT_INFO.phone}</Text>
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