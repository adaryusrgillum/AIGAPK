import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Linking, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme';
import { CARRIERS, CONTACT_INFO } from '../data';
import { ActionButton, SectionHeader } from '../components/SharedComponents';

function ValueCard({ icon, title, description }) {
  return (
    <View style={styles.valueCard}>
      <View style={styles.valueIcon}>
        <MaterialCommunityIcons name={icon} size={28} color={COLORS.white} />
      </View>
      <Text style={styles.valueTitle}>{title}</Text>
      <Text style={styles.valueDesc}>{description}</Text>
    </View>
  );
}

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="shield-check" size={50} color={COLORS.secondary} />
        </View>
        <Text style={styles.headerTitle}>Abel Insurance Group</Text>
        <Text style={styles.headerSub}>A Family Tradition of Service</Text>
      </View>

      {/* About Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.aboutText}>
          Abel Insurance Group was founded on the principles of integrity and community service. Our agency takes pride in offering personal insurance solutions that reflect our deep understanding of the Buckhannon, WV, area and its residents.
        </Text>
        <Text style={styles.aboutText}>
          We combine years of experience with a friendly approach to help meet the unique needs of our clients. As a family-owned independent insurance agency, we deliver personal service that combines local expertise with modern technology.
        </Text>
      </View>

      {/* Mission */}
      <View style={styles.missionSection}>
        <MaterialCommunityIcons name="bullseye-arrow" size={36} color={COLORS.secondary} />
        <Text style={styles.missionTitle}>Our Mission</Text>
        <Text style={styles.missionText}>
          At Abel Insurance Group, we aim to offer exceptional insurance services by combining local knowledge with innovative solutions. Our goal is to build strong relationships with our clients, so that their insurance needs are met with professionalism and care.
        </Text>
      </View>

      {/* Values */}
      <SectionHeader title="What Makes Us Different" />
      <View style={styles.valuesGrid}>
        <ValueCard
          icon="tune-variant"
          title="Personalized Solutions"
          description="Insurance designed for your unique needs with the power of choice."
        />
        <ValueCard
          icon="school"
          title="Knowledgeable Service"
          description="Reliable support to help you make informed decisions."
        />
        <ValueCard
          icon="handshake"
          title="Trusted Relationships"
          description="We simplify the insurance process and advise you on your coverage."
        />
        <ValueCard
          icon="flag-checkered"
          title="Independent Agency"
          description="We shop multiple carriers to find you the best coverage and price."
        />
      </View>

      {/* Licensed States */}
      <View style={styles.statesSection}>
        <Text style={styles.statesTitle}>Licensed & Serving</Text>
        <View style={styles.statesRow}>
          {CONTACT_INFO.states.map((state, i) => (
            <View key={i} style={styles.stateBadge}>
              <Text style={styles.stateText}>{state}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Carriers */}
      <SectionHeader title="Our Insurance Partners" />
      <View style={styles.carriersGrid}>
        {CARRIERS.map((carrier, i) => (
          <View key={i} style={styles.carrierCard}>
            <MaterialCommunityIcons name="shield-check-outline" size={22} color={COLORS.primary} />
            <Text style={styles.carrierName}>{carrier}</Text>
          </View>
        ))}
      </View>

      {/* CTA */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Learn More About Us</Text>
        <ActionButton
          title="Visit Our Website"
          icon="web"
          onPress={() => Linking.openURL(CONTACT_INFO.website + '/about-our-agency/')}
        />
        <ActionButton
          title="Meet Our Team"
          icon="account-group"
          variant="secondary"
          onPress={() => Linking.openURL(CONTACT_INFO.website + '/about-our-agency/meet-our-team/')}
        />
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.offWhite },
  header: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
  },
  headerSub: {
    fontSize: 15,
    color: COLORS.secondaryLight,
    marginTop: 4,
  },
  aboutSection: {
    padding: 20,
  },
  aboutText: {
    fontSize: 15,
    color: COLORS.darkGray,
    lineHeight: 24,
    marginBottom: 12,
  },
  missionSection: {
    backgroundColor: COLORS.primaryDark,
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  missionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
    marginTop: 10,
    marginBottom: 8,
  },
  missionText: {
    fontSize: 14,
    color: COLORS.secondaryLight,
    lineHeight: 22,
    textAlign: 'center',
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 12,
    marginBottom: 8,
  },
  valueCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    width: '47%',
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  valueIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  valueTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  valueDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 16,
  },
  statesSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  statesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 12,
  },
  statesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  stateBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  stateText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
  carriersGrid: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  carrierCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 10,
    gap: 10,
    elevation: 1,
  },
  carrierName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  ctaSection: {
    padding: 20,
    gap: 8,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
});
