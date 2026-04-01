import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme';

export function InsuranceCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={item.icon} size={28} color={COLORS.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.desc}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={22} color={COLORS.gray} />
    </TouchableOpacity>
  );
}

export function SectionHeader({ title, subtitle }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    </View>
  );
}

export function TestimonialCard({ item }) {
  return (
    <View style={styles.testimonialCard}>
      <MaterialCommunityIcons name="format-quote-open" size={24} color={COLORS.secondary} />
      <Text style={styles.testimonialText}>{item.text}</Text>
      <Text style={styles.testimonialAuthor}>— {item.author}</Text>
    </View>
  );
}

export function FeatureItem({ icon, title, description }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>
        <MaterialCommunityIcons name={icon} size={30} color={COLORS.white} />
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{description}</Text>
    </View>
  );
}

export function ActionButton({ title, onPress, variant = 'primary', icon }) {
  const isPrimary = variant === 'primary';
  return (
    <TouchableOpacity
      style={[styles.actionBtn, isPrimary ? styles.primaryBtn : styles.secondaryBtn]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={18}
          color={isPrimary ? COLORS.white : COLORS.primary}
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={[styles.actionBtnText, isPrimary ? styles.primaryBtnText : styles.secondaryBtnText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.offWhite,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  desc: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 16,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
    lineHeight: 20,
  },
  testimonialCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 20,
    marginHorizontal: 8,
    width: 300,
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  testimonialText: {
    fontSize: 14,
    color: COLORS.darkGray,
    lineHeight: 22,
    marginVertical: 10,
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  featureItem: {
    alignItems: 'center',
    paddingHorizontal: 12,
    flex: 1,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    marginVertical: 6,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
  },
  secondaryBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  actionBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryBtnText: {
    color: COLORS.white,
  },
  secondaryBtnText: {
    color: COLORS.primary,
  },
});
