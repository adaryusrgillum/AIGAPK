import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, Linking, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme';
import { BUSINESS_INSURANCE, INDUSTRY_INSURANCE, CONTACT_INFO } from '../data';
import { InsuranceCard, SectionHeader, ActionButton } from '../components/SharedComponents';

export default function BusinessInsuranceScreen() {
  const [activeTab, setActiveTab] = useState('business');

  const data = activeTab === 'business' ? BUSINESS_INSURANCE : INDUSTRY_INSURANCE;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Business Insurance</Text>
        <Text style={styles.headerSub}>
          Safeguard the future of your business with comprehensive coverage.
        </Text>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'business' && styles.activeTab]}
            onPress={() => setActiveTab('business')}
          >
            <Text style={[styles.tabText, activeTab === 'business' && styles.activeTabText]}>
              Business
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'industry' && styles.activeTab]}
            onPress={() => setActiveTab('industry')}
          >
            <Text style={[styles.tabText, activeTab === 'industry' && styles.activeTabText]}>
              By Industry
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InsuranceCard
            item={item}
            onPress={() => Linking.openURL(CONTACT_INFO.website + '/business-insurance/')}
          />
        )}
        ListHeaderComponent={
          <SectionHeader
            title={activeTab === 'business' ? 'Business Coverages' : 'Industry Solutions'}
            subtitle={
              activeTab === 'business'
                ? 'Coverage to protect your business operations'
                : 'Insurance tailored to your specific industry'
            }
          />
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <ActionButton
              title="Request a Quote"
              icon="file-document-edit"
              onPress={() => Linking.openURL(CONTACT_INFO.website + '/request-quote/')}
            />
          </View>
        }
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.offWhite },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 6,
  },
  headerSub: {
    fontSize: 14,
    color: COLORS.secondaryLight,
    lineHeight: 20,
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryDark,
    borderRadius: 10,
    padding: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.white,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.secondaryLight,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  footer: {
    padding: 20,
    gap: 8,
  },
});
