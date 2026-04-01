import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext';
import { COLORS } from '../theme';

const MOCK_STATS = {
  totalPolicies: 1247,
  activeClaims: 23,
  newQuotes: 58,
  monthlyRevenue: 184500,
  clientSatisfaction: 4.8,
  renewalRate: 94,
};

const RECENT_ACTIVITY = [
  { id: '1', type: 'policy', text: 'New auto policy issued — Brenda H.', time: '2 min ago', icon: 'car' },
  { id: '2', type: 'claim', text: 'Claim #4821 submitted — home water damage', time: '18 min ago', icon: 'water' },
  { id: '3', type: 'quote', text: 'Business insurance quote requested', time: '45 min ago', icon: 'briefcase-variant' },
  { id: '4', type: 'renewal', text: 'Policy renewal — Regina M.', time: '1 hr ago', icon: 'refresh' },
  { id: '5', type: 'payment', text: 'Payment received — Sara A. ($1,284)', time: '2 hr ago', icon: 'credit-card-check' },
  { id: '6', type: 'policy', text: 'Umbrella policy added — Maceala S.', time: '3 hr ago', icon: 'umbrella' },
];

const QUICK_ACTIONS = [
  { id: '1', label: 'New Quote', icon: 'file-plus', color: '#3B82F6' },
  { id: '2', label: 'Add Client', icon: 'account-plus', color: '#10B981' },
  { id: '3', label: 'Process Claim', icon: 'clipboard-check', color: '#F59E0B' },
  { id: '4', label: 'Run Report', icon: 'chart-bar', color: '#8B5CF6' },
];

const TOP_POLICIES = [
  { name: 'Auto Insurance', count: 412, pct: 33 },
  { name: 'Home Insurance', count: 328, pct: 26 },
  { name: 'Business Owners', count: 198, pct: 16 },
  { name: 'Umbrella', count: 142, pct: 11 },
  { name: 'Life Insurance', count: 167, pct: 14 },
];

function StatCard({ label, value, icon, color }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        <MaterialCommunityIcons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ActivityItem({ item }) {
  const colors = {
    policy: '#3B82F6',
    claim: '#EF4444',
    quote: '#F59E0B',
    renewal: '#10B981',
    payment: '#8B5CF6',
  };
  const c = colors[item.type] || COLORS.steel;
  return (
    <View style={styles.activityItem}>
      <View style={[styles.activityDot, { backgroundColor: c + '20' }]}>
        <MaterialCommunityIcons name={item.icon} size={18} color={c} />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityText}>{item.text}</Text>
        <Text style={styles.activityTime}>{item.time}</Text>
      </View>
    </View>
  );
}

export default function AdminDashboardScreen() {
  const { adminSignOut } = useAuth();
  const enter = useRef(new Animated.Value(0)).current;
  const [greeting, setGreeting] = useState('Good morning');

  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 17) setGreeting('Good evening');
    else if (h >= 12) setGreeting('Good afternoon');

    Animated.timing(enter, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [enter]);

  const opacity = enter.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const translateY = enter.interpolate({ inputRange: [0, 1], outputRange: [30, 0] });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.midnight} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image source={require('../../assets/logo-icon.png')} style={styles.headerLogo} />
              <View>
                <Text style={styles.greeting}>{greeting}, Admin</Text>
                <Text style={styles.headerSubtitle}>Abel Insurance Group Dashboard</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.logoutBtn} onPress={adminSignOut} activeOpacity={0.8}>
              <MaterialCommunityIcons name="logout" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Admin Badge */}
          <View style={styles.adminBadge}>
            <MaterialCommunityIcons name="shield-crown" size={16} color="#FFD700" />
            <Text style={styles.adminBadgeText}>Admin Panel — Demo Mode</Text>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatCard label="Active Policies" value={MOCK_STATS.totalPolicies.toLocaleString()} icon="file-document-multiple" color="#3B82F6" />
            <StatCard label="Open Claims" value={MOCK_STATS.activeClaims} icon="clipboard-alert" color="#EF4444" />
            <StatCard label="New Quotes" value={MOCK_STATS.newQuotes} icon="file-plus" color="#F59E0B" />
            <StatCard label="Monthly Rev." value={'$' + (MOCK_STATS.monthlyRevenue / 1000).toFixed(0) + 'K'} icon="currency-usd" color="#10B981" />
            <StatCard label="Satisfaction" value={MOCK_STATS.clientSatisfaction + '/5'} icon="star" color="#F59E0B" />
            <StatCard label="Renewal Rate" value={MOCK_STATS.renewalRate + '%'} icon="refresh-circle" color="#8B5CF6" />
          </View>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity key={action.id} style={styles.actionCard} activeOpacity={0.82}>
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <MaterialCommunityIcons name={action.icon} size={22} color={action.color} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Top Policies Chart */}
          <Text style={styles.sectionTitle}>Policy Distribution</Text>
          <View style={styles.card}>
            {TOP_POLICIES.map((p) => (
              <View key={p.name} style={styles.policyRow}>
                <View style={styles.policyInfo}>
                  <Text style={styles.policyName}>{p.name}</Text>
                  <Text style={styles.policyCount}>{p.count}</Text>
                </View>
                <View style={styles.barBg}>
                  <View style={[styles.barFill, { width: p.pct + '%' }]} />
                </View>
              </View>
            ))}
          </View>

          {/* Recent Activity */}
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.card}>
            {RECENT_ACTIVITY.map((item) => (
              <ActivityItem key={item.id} item={item} />
            ))}
          </View>

          {/* System Status */}
          <Text style={styles.sectionTitle}>System Status</Text>
          <View style={styles.card}>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.statusText}>Firebase Auth</Text>
              <Text style={styles.statusBadge}>Operational</Text>
            </View>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.statusText}>Client Portal</Text>
              <Text style={styles.statusBadge}>Operational</Text>
            </View>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.statusText}>API Gateway</Text>
              <Text style={styles.statusBadge}>Operational</Text>
            </View>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.statusText}>Email Service</Text>
              <Text style={[styles.statusBadge, { color: '#F59E0B' }]}>Degraded</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Abel Insurance Group — Admin v1.3.0</Text>
          </View>

        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.midnight,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 54,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.slateText,
    marginTop: 2,
  },
  logoutBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,215,0,0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 20,
  },
  adminBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFD700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    width: '31%',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 14,
    alignItems: 'center',
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.white,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.slateText,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 14,
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    marginBottom: 24,
  },
  policyRow: {
    marginBottom: 14,
  },
  policyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  policyName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
  },
  policyCount: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.slateText,
  },
  barBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: 6,
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  activityDot: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
    lineHeight: 18,
  },
  activityTime: {
    fontSize: 11,
    color: COLORS.slateText,
    marginTop: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  statusText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 11,
    color: COLORS.slateText,
  },
});
