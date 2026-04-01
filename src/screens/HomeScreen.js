import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, StatusBar, FlatList, Linking, TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '../theme';
import { TESTIMONIALS, CARRIERS, CONTACT_INFO } from '../data';
import { FeatureItem, TestimonialCard, SectionHeader } from '../components/SharedComponents';
import { AmbientBackdrop, InsightChip, TiltCard } from '../components/ExperienceComponents';
import { signOut } from '../services/auth';

export default function HomeScreen({ navigation }) {
  const insights = [
    { icon: 'map-marker-radius', label: 'Licensed states', value: String(CONTACT_INFO.states.length) },
    { icon: 'handshake-outline', label: 'Carrier partners', value: String(CARRIERS.length) },
    { icon: 'clock-fast', label: 'Response model', value: 'Fast' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.midnight} />

      <View style={styles.hero}>
        <AmbientBackdrop tone="gold" />

        <View style={styles.logoRow}>
          <MaterialCommunityIcons name="shield-check" size={40} color={COLORS.secondary} />
          <Text style={styles.logoText}>{'Abel Insurance\nGroup'}</Text>
        </View>

        <Text style={styles.heroEyebrow}>Interactive insurance workspace</Text>
        <Text style={styles.heroTitle}>{'Fast mobile onboarding with\n3D-style motion and secure access'}</Text>
        <Text style={styles.heroSubtitle}>
          Dedicated to protecting what matters most. Family-owned independent insurance agency serving Buckhannon, WV and beyond with a richer client-ready mobile experience.
        </Text>

        <View style={styles.insightsRow}>
          {insights.map((item) => (
            <InsightChip
              key={item.label}
              icon={item.icon}
              label={item.label}
              value={item.value}
            />
          ))}
        </View>

        <View style={styles.heroScene}>
          <TiltCard style={styles.heroPrimaryCard}>
            <Text style={styles.heroCardEyebrow}>Coverage cockpit</Text>
            <Text style={styles.heroCardTitle}>Personal + business policies in one mobile flow</Text>
            <View style={styles.heroCardRow}>
              <View style={styles.heroStatBadge}>
                <MaterialCommunityIcons name="home-city" size={16} color={COLORS.secondary} />
                <Text style={styles.heroStatText}>Personal</Text>
              </View>
              <View style={styles.heroStatBadge}>
                <MaterialCommunityIcons name="briefcase" size={16} color={COLORS.secondary} />
                <Text style={styles.heroStatText}>Commercial</Text>
              </View>
            </View>
          </TiltCard>

          <TiltCard style={styles.heroAccentCard}>
            <MaterialCommunityIcons name="chart-timeline-variant" size={24} color={COLORS.secondary} />
            <Text style={styles.accentCardTitle}>Client-ready dashboard</Text>
            <Text style={styles.accentCardText}>
              Loading, login, animations, and quick action routing are now built into the app shell.
            </Text>
          </TiltCard>
        </View>

        <View style={styles.heroButtons}>
          <TouchableOpacity
            style={styles.heroPrimaryButton}
            onPress={() => Linking.openURL(CONTACT_INFO.website + '/request-quote/')}
            activeOpacity={0.84}
          >
            <MaterialCommunityIcons name="rocket-launch-outline" size={18} color={COLORS.midnight} />
            <Text style={styles.heroPrimaryButtonText}>Start a Quote</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.heroSecondaryButton}
            onPress={() => Linking.openURL('tel:' + CONTACT_INFO.phone)}
            activeOpacity={0.84}
          >
            <MaterialCommunityIcons name="phone" size={18} color={COLORS.white} />
            <Text style={styles.heroSecondaryButtonText}>Call Agency</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.featuresSection}>
        <View style={styles.featuresRow}>
          <FeatureItem
            icon="shield-star"
            title="Wide Variety"
            description="Insurance solutions for every need"
          />
          <FeatureItem
            icon="account-group"
            title="By Your Side"
            description="Support every step of the way"
          />
          <FeatureItem
            icon="certificate"
            title="Licensed"
            description="Licensed insurance advisors"
          />
        </View>
      </View>

      <SectionHeader
        title="Insurance Solutions"
        subtitle="Explore our personal and business insurance options"
      />
      <View style={styles.solutionsGrid}>
        <TouchableOpacity
          style={styles.solutionCard}
          onPress={() => navigation.navigate('Personal')}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="home-heart" size={40} color={COLORS.primary} />
          <Text style={styles.solutionTitle}>Personal Insurance</Text>
          <Text style={styles.solutionDesc}>Home, Auto, Life, and more</Text>
          <View style={styles.solutionArrow}>
            <MaterialCommunityIcons name="arrow-right" size={18} color={COLORS.secondary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.solutionCard}
          onPress={() => navigation.navigate('Business')}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="briefcase" size={40} color={COLORS.primary} />
          <Text style={styles.solutionTitle}>Business Insurance</Text>
          <Text style={styles.solutionDesc}>Liability, Property, Workers' Comp</Text>
          <View style={styles.solutionArrow}>
            <MaterialCommunityIcons name="arrow-right" size={18} color={COLORS.secondary} />
          </View>
        </TouchableOpacity>
      </View>

      <SectionHeader title="What Our Clients Say" />
      <FlatList
        data={TESTIMONIALS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 10 }}
        renderItem={({ item }) => <TestimonialCard item={item} />}
      />

      <SectionHeader
        title="Our Insurance Partners"
        subtitle="An independent agency gives you options"
      />
      <View style={styles.carriersRow}>
        {CARRIERS.map((carrier, index) => (
          <View key={index} style={styles.carrierBadge}>
            <Text style={styles.carrierText}>{carrier}</Text>
          </View>
        ))}
      </View>

      <View style={styles.quickContact}>
        <Text style={styles.quickContactTitle}>Ready to Get Started?</Text>
        <Text style={styles.quickContactDesc}>
          Contact us today to learn more about our services across WV, VA, MD, OH, PA, and KY.
        </Text>
        <View style={styles.quickContactRow}>
          <TouchableOpacity
            style={styles.contactChip}
            onPress={() => Linking.openURL('tel:' + CONTACT_INFO.phone)}
          >
            <MaterialCommunityIcons name="phone" size={18} color={COLORS.primary} />
            <Text style={styles.contactChipText}>{CONTACT_INFO.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactChip}
            onPress={() => Linking.openURL('mailto:' + CONTACT_INFO.email)}
          >
            <MaterialCommunityIcons name="email" size={18} color={COLORS.primary} />
            <Text style={styles.contactChipText}>Email Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Local Knowledge, Innovative Solutions.</Text>
        <Text style={styles.footerSub}>© 2026 Abel Insurance Group. All rights reserved.</Text>
        <TouchableOpacity style={styles.signOutButton} onPress={() => signOut()} activeOpacity={0.8}>
          <MaterialCommunityIcons name="logout" size={16} color={COLORS.gray} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.offWhite },
  hero: {
    backgroundColor: COLORS.midnight,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 36,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
    marginLeft: 10,
    lineHeight: 22,
  },
  heroEyebrow: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.secondary,
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 31,
    fontWeight: '900',
    color: COLORS.white,
    lineHeight: 39,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 15,
    color: COLORS.slateText,
    lineHeight: 23,
    marginBottom: 20,
  },
  insightsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 22,
  },
  heroScene: {
    minHeight: 250,
    marginBottom: 16,
  },
  heroPrimaryCard: {
    backgroundColor: COLORS.glassStrong,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    padding: 22,
    width: '72%',
  },
  heroCardEyebrow: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.secondary,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  heroCardTitle: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 16,
  },
  heroCardRow: {
    flexDirection: 'row',
    gap: 10,
  },
  heroStatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  heroStatText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
  heroAccentCard: {
    position: 'absolute',
    right: 0,
    bottom: 16,
    width: '50%',
    backgroundColor: 'rgba(15, 36, 64, 0.94)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    padding: 18,
  },
  accentCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
    marginTop: 12,
    marginBottom: 8,
  },
  accentCardText: {
    fontSize: 12,
    lineHeight: 19,
    color: COLORS.slateText,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  heroPrimaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    paddingVertical: 15,
  },
  heroPrimaryButtonText: {
    color: COLORS.midnight,
    fontSize: 15,
    fontWeight: '900',
  },
  heroSecondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    paddingVertical: 15,
  },
  heroSecondaryButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  featuresSection: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  solutionsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 8,
  },
  solutionCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  solutionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 4,
  },
  solutionDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 16,
  },
  solutionArrow: {
    alignSelf: 'flex-end',
    marginTop: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.offWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carriersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 16,
  },
  carrierBadge: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 1,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  carrierText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  quickContact: {
    backgroundColor: COLORS.primaryDark,
    margin: 16,
    borderRadius: 16,
    padding: 24,
  },
  quickContactTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 8,
  },
  quickContactDesc: {
    fontSize: 14,
    color: COLORS.secondaryLight,
    lineHeight: 20,
    marginBottom: 16,
  },
  quickContactRow: {
    flexDirection: 'row',
    gap: 10,
  },
  contactChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  contactChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 4,
  },
  footerSub: {
    fontSize: 12,
    color: COLORS.gray,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: COLORS.offWhite,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  signOutText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray,
  },
});
