import React, { useEffect, useRef, useState } from 'react';
import { Animated, StatusBar, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AmbientBackdrop, InsightChip, TiltCard } from '../components/ExperienceComponents';
import { COLORS } from '../theme';

const STAGES = [
  'Connecting to Abel Insurance Group',
  'Loading your insurance options',
  'Getting everything ready',
];

export default function LoadingScreen({ onComplete }) {
  const progress = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const [stage, setStage] = useState(STAGES[0]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(STAGES[1]), 900),
      setTimeout(() => setStage(STAGES[2]), 1800),
      setTimeout(() => onComplete(), 2800),
    ];

    const progressAnimation = Animated.timing(progress, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
    });
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 1100, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 1100, useNativeDriver: true }),
      ])
    );

    progressAnimation.start();
    glowAnimation.start();

    return () => {
      timers.forEach(clearTimeout);
      progressAnimation.stop();
      glowAnimation.stop();
    };
  }, [glow, onComplete, progress]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  const pulseScale = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1.04],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.midnight} />
      <AmbientBackdrop tone="gold" />

      <View style={styles.content}>
        <Animated.View style={{ transform: [{ scale: pulseScale }] }}>
          <TiltCard style={styles.centerCard}>
            <View style={styles.iconShell}>
              <MaterialCommunityIcons name="shield-star" size={34} color={COLORS.secondary} />
            </View>
            <Text style={styles.brand}>Abel Insurance Group</Text>
            <Text style={styles.title}>We're here to put your needs first</Text>
            <Text style={styles.subtitle}>
              Personal service that combines local expertise with modern technology. Serving Buckhannon, WV and beyond.
            </Text>
          </TiltCard>
        </Animated.View>

        <View style={styles.metricsRow}>
          <InsightChip icon="lightning-bolt" label="States" value="6" />
          <InsightChip icon="shield-check" label="Coverage" value="30+" />
          <InsightChip icon="account-group" label="Family-owned" value="Yes" />
        </View>

        <View style={styles.progressWrap}>
          <Animated.View style={[styles.progressBar, { width }]} />
        </View>
        <Text style={styles.stage}>{stage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.midnight,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  centerCard: {
    backgroundColor: COLORS.glassStrong,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    padding: 28,
  },
  iconShell: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: 'rgba(200, 169, 81, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  brand: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.secondary,
    marginBottom: 10,
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 31,
    lineHeight: 36,
    fontWeight: '900',
    color: COLORS.white,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.slateText,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 22,
    marginBottom: 26,
  },
  progressWrap: {
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: COLORS.secondary,
  },
  stage: {
    fontSize: 13,
    color: COLORS.slateText,
    marginTop: 14,
    textAlign: 'center',
  },
});