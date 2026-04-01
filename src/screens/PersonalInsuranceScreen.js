import React from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, Linking } from 'react-native';
import { COLORS } from '../theme';
import { PERSONAL_INSURANCE, CONTACT_INFO } from '../data';
import { InsuranceCard, SectionHeader, ActionButton } from '../components/SharedComponents';

export default function PersonalInsuranceScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Personal Insurance</Text>
        <Text style={styles.headerSub}>
          Protect what is most important to you with personal insurance solutions.
        </Text>
      </View>
      <FlatList
        data={PERSONAL_INSURANCE}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <SectionHeader
            title="Our Coverages"
            subtitle="Explore our wide range of personal insurance products"
          />
        }
        renderItem={({ item }) => (
          <InsuranceCard
            item={item}
            onPress={() => Linking.openURL(CONTACT_INFO.website + '/personal-insurance/')}
          />
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <ActionButton
              title="Request a Quote"
              icon="file-document-edit"
              onPress={() => Linking.openURL(CONTACT_INFO.website + '/request-quote/')}
            />
            <ActionButton
              title="Call 304-878-5900"
              icon="phone"
              variant="secondary"
              onPress={() => Linking.openURL('tel:' + CONTACT_INFO.phone)}
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
    paddingBottom: 24,
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
  },
  footer: {
    padding: 20,
    gap: 8,
  },
});
