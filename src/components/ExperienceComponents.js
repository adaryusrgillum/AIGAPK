import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme';

export function AmbientBackdrop({ tone = 'gold' }) {
  const values = useRef([
    new Animated.Value(0),
    new Animated.Value(0.35),
    new Animated.Value(0.7),
  ]).current;

  useEffect(() => {
    const loops = values.map((value, index) => (
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: 3800 + (index * 500),
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 3800 + (index * 500),
            useNativeDriver: true,
          }),
        ])
      )
    ));

    loops.forEach((loop) => loop.start());

    return () => {
      loops.forEach((loop) => loop.stop());
    };
  }, [values]);

  const palette = tone === 'blue'
    ? [COLORS.signalBlue, COLORS.primary, COLORS.secondarySoft]
    : [COLORS.signalBlue, COLORS.secondarySoft, COLORS.primary];

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {values.map((value, index) => {
        const translateY = value.interpolate({
          inputRange: [0, 1],
          outputRange: [0, index % 2 === 0 ? -26 : 22],
        });
        const translateX = value.interpolate({
          inputRange: [0, 1],
          outputRange: [0, index % 2 === 0 ? 16 : -18],
        });
        const scale = value.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.92, 1.05, 0.96],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.orb,
              styles[`orb${index}`],
              {
                backgroundColor: palette[index],
                transform: [{ translateX }, { translateY }, { scale }],
              },
            ]}
          />
        );
      })}
      <View style={styles.gridOverlay} />
    </View>
  );
}

export function TiltCard({ style, children }) {
  const motion = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(motion, {
          toValue: 1,
          duration: 2400,
          useNativeDriver: true,
        }),
        Animated.timing(motion, {
          toValue: 0,
          duration: 2400,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();

    return () => loop.stop();
  }, [motion]);

  const rotateY = motion.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['-7deg', '7deg', '-7deg'],
  });
  const rotateX = motion.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['7deg', '-5deg', '7deg'],
  });
  const translateY = motion.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -12, 0],
  });

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [
            { perspective: 900 },
            { rotateX },
            { rotateY },
            { translateY },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

export function InsightChip({ icon, label, value }) {
  return (
    <View style={styles.insightChip}>
      <View style={styles.insightIconWrap}>
        <MaterialCommunityIcons name={icon} size={16} color={COLORS.secondary} />
      </View>
      <View>
        <Text style={styles.insightValue}>{value}</Text>
        <Text style={styles.insightLabel}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.16,
  },
  orb0: {
    width: 220,
    height: 220,
    top: -40,
    right: -70,
  },
  orb1: {
    width: 170,
    height: 170,
    top: 160,
    left: -55,
  },
  orb2: {
    width: 150,
    height: 150,
    bottom: 30,
    right: 26,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
    borderRadius: 0,
  },
  insightChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.glass,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minWidth: 116,
  },
  insightIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightValue: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
  },
  insightLabel: {
    fontSize: 11,
    color: COLORS.slateText,
    marginTop: 2,
  },
});