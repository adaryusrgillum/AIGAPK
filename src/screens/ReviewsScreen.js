import React from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, Linking, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme';
import { TESTIMONIALS, CONTACT_INFO } from '../data';
import { SectionHeader, ActionButton } from '../components/SharedComponents';

function ReviewCard({ item }) {
  return (
    <View style={styles.reviewCard}>
      <View style={styles.quoteRow}>
        <MaterialCommunityIcons name="format-quote-open" size={28} color={COLORS.primary} />
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((s) => (
            <MaterialCommunityIcons key={s} name="star" size={16} color={COLORS.primary} />
          ))}
        </View>
      </View>
      <Text style={styles.reviewText}>{item.text}</Text>
      <View style={styles.authorRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.author[0]}</Text>
        </View>
        <Text style={styles.authorName}>{item.author}</Text>
      </View>
    </View>
  );
}

export default function ReviewsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />
      <View style={styles.header}>
        <MaterialCommunityIcons name="star-circle" size={40} color={COLORS.secondary} />
        <Text style={styles.headerTitle}>Client Reviews</Text>
        <Text style={styles.headerSub}>
          Real clients. Real reviews. See what people are saying about Abel Insurance Group.
        </Text>
      </View>
      <FlatList
        data={TESTIMONIALS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewCard item={item} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
        ListFooterComponent={
          <View style={styles.footer}>
            <ActionButton
              title="Read More Reviews"
              icon="open-in-new"
              onPress={() => Linking.openURL(CONTACT_INFO.website + '/about-our-agency/read-our-reviews/')}
            />
            <ActionButton
              title="Leave a Review"
              icon="pencil"
              variant="secondary"
              onPress={() => Linking.openURL(CONTACT_INFO.facebook)}
            />
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.offWhite },
  header: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 28,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
    marginTop: 10,
    marginBottom: 6,
  },
  headerSub: {
    fontSize: 14,
    color: COLORS.secondaryLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  quoteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewText: {
    fontSize: 15,
    color: COLORS.darkGray,
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 14,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  footer: {
    marginTop: 8,
    gap: 8,
  },
});
