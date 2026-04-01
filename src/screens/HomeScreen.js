import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, StatusBar, FlatList, Linking, TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme';
import { TESTIMONIALS, CARRIERS, CONTACT_INFO } from '../data';
import { ActionButton, FeatureItem, TestimonialCard, SectionHeader } from '../components/SharedComponents';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.logoRow}>
          <MaterialCommunityIcons name="shield-check" size={40} color={COLORS.secondary} />
          <Text style={styles.logoText}>Abel Insurance{'\n'}Group</Text>
        </View>
        <Text style={styles.heroTitle}>We're Here to Put{'\n'}Your Needs First</Text>
        <Text style={styles.heroSubtitle}>
          Dedicated to protecting what matters most. Family-owned independent insurance agency serving Buckhannon, WV and beyond.
        </Text>
        <View style={styles.heroButtons}>
          <ActionButton
            title="Get a Quote"
            icon="file-document-edit"
            onPress={() => Linking.openURL(CONTACT_INFO.website + '/request-quote/')}
          />
          <ActionButton
            title="Call Us"
            icon="phone"
            variant="secondary"
            onPress={() => Linking.openURL('tel:' + CONTACT_INFO.phone)}
          />
        </View>
      </View>

      {/* Features */}
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

      {/* Insurance Solutions */}
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

      {/* Testimonials */}
      <SectionHeader title="What Our Clients Say" />
      <FlatList
        data={TESTIMONIALS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 10 }}
        renderItem={({ item }) => <TestimonialCard item={item} />}
      />

      {/* Carriers */}
      <SectionHeader
        title="Our Insurance Partners"
        subtitle="An independent agency gives you options"
      />
      <View style={styles.carriersRow}>
        {CARRIERS.map((carrier, i) => (
          <View key={i} style={styles.carrierBadge}>
            <Text style={styles.carrierText}>{carrier}</Text>
          </View>
        ))}
      </View>

      {/* Quick Contact */}
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

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Local Knowledge, Innovative Solutions.</Text>
        <Text style={styles.footerSub}>
          © 2026 Abel Insurance Group. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.offWhite },
  hero: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 36,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
    marginLeft: 10,
    lineHeight: 22,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.white,
    lineHeight: 38,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 15,
    color: COLORS.secondaryLight,
    lineHeight: 22,
    marginBottom: 24,
  },
  heroButtons: {
    gap: 10,
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
});
