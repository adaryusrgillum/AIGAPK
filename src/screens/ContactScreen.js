import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, StatusBar, Linking,
  TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme';
import { CONTACT_INFO } from '../data';
import { ActionButton, SectionHeader } from '../components/SharedComponents';

function ContactItem({ icon, label, value, onPress }) {
  return (
    <TouchableOpacity style={styles.contactItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.contactIcon}>
        <MaterialCommunityIcons name={icon} size={22} color={COLORS.white} />
      </View>
      <View style={styles.contactTextContainer}>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue}>{value}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.gray} />
    </TouchableOpacity>
  );
}

export default function ContactScreen() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });

  const handleSubmit = () => {
    if (!form.firstName.trim() || !form.email.trim()) {
      Alert.alert('Required Fields', 'Please fill in at least your first name and email.');
      return;
    }
    const subject = encodeURIComponent('Insurance Inquiry from ' + form.firstName + ' ' + form.lastName);
    const body = encodeURIComponent(
      'Name: ' + form.firstName + ' ' + form.lastName +
      '\nPhone: ' + form.phone +
      '\nMessage: ' + form.message
    );
    Linking.openURL('mailto:' + CONTACT_INFO.email + '?subject=' + subject + '&body=' + body);
    setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Contact Us</Text>
          <Text style={styles.headerSub}>
            Have questions about your insurance? We're here to help.
          </Text>
        </View>

        {/* Contact Info */}
        <SectionHeader title="Get in Touch" />
        <View style={styles.contactList}>
          <ContactItem
            icon="phone"
            label="Phone"
            value={CONTACT_INFO.phone}
            onPress={() => Linking.openURL('tel:' + CONTACT_INFO.phone)}
          />
          <ContactItem
            icon="email"
            label="Email"
            value={CONTACT_INFO.email}
            onPress={() => Linking.openURL('mailto:' + CONTACT_INFO.email)}
          />
          <ContactItem
            icon="map-marker"
            label="Address"
            value={CONTACT_INFO.address + ', ' + CONTACT_INFO.city}
            onPress={() => Linking.openURL('https://maps.google.com/?q=172+S+Kanawha+Street+Buckhannon+WV+26201')}
          />
          <ContactItem
            icon="clock-outline"
            label="Office Hours"
            value={CONTACT_INFO.hours}
            onPress={() => {}}
          />
          <ContactItem
            icon="fax"
            label="Fax"
            value={CONTACT_INFO.fax}
            onPress={() => {}}
          />
        </View>

        {/* Social Links */}
        <View style={styles.socialRow}>
          <TouchableOpacity
            style={styles.socialBtn}
            onPress={() => Linking.openURL(CONTACT_INFO.facebook)}
          >
            <MaterialCommunityIcons name="facebook" size={24} color={COLORS.white} />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialBtn}
            onPress={() => Linking.openURL(CONTACT_INFO.linkedin)}
          >
            <MaterialCommunityIcons name="linkedin" size={24} color={COLORS.white} />
            <Text style={styles.socialText}>LinkedIn</Text>
          </TouchableOpacity>
        </View>

        {/* Client Portal */}
        <View style={styles.portalSection}>
          <MaterialCommunityIcons name="account-circle" size={32} color={COLORS.primary} />
          <View style={styles.portalText}>
            <Text style={styles.portalTitle}>Client Portal</Text>
            <Text style={styles.portalDesc}>Manage your policies and make requests</Text>
          </View>
          <TouchableOpacity
            style={styles.portalBtn}
            onPress={() => Linking.openURL(CONTACT_INFO.clientPortal)}
          >
            <Text style={styles.portalBtnText}>Open</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Form */}
        <SectionHeader title="Send Us a Message" subtitle="Fill out the form and we'll get back to you." />
        <View style={styles.form}>
          <View style={styles.formRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="First Name *"
              placeholderTextColor={COLORS.gray}
              value={form.firstName}
              onChangeText={(v) => setForm({ ...form, firstName: v })}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Last Name"
              placeholderTextColor={COLORS.gray}
              value={form.lastName}
              onChangeText={(v) => setForm({ ...form, lastName: v })}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email *"
            placeholderTextColor={COLORS.gray}
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(v) => setForm({ ...form, email: v })}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor={COLORS.gray}
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(v) => setForm({ ...form, phone: v })}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="How can we help?"
            placeholderTextColor={COLORS.gray}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={form.message}
            onChangeText={(v) => setForm({ ...form, message: v })}
          />
          <ActionButton title="Submit" icon="send" onPress={handleSubmit} />
        </View>

        {/* Steps */}
        <View style={styles.stepsSection}>
          <View style={styles.step}>
            <View style={styles.stepNumber}><Text style={styles.stepNumText}>1</Text></View>
            <Text style={styles.stepText}>Fill out the form</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.step}>
            <View style={styles.stepNumber}><Text style={styles.stepNumText}>2</Text></View>
            <Text style={styles.stepText}>Review options with us</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.step}>
            <View style={styles.stepNumber}><Text style={styles.stepNumText}>3</Text></View>
            <Text style={styles.stepText}>Get the coverage you need</Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </KeyboardAvoidingView>
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
  contactList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 12,
    elevation: 1,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactTextContainer: { flex: 1 },
  contactLabel: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '500',
  },
  contactValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
    marginTop: 1,
  },
  socialRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 16,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
  },
  socialText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  portalSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    margin: 16,
    padding: 16,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  portalText: { flex: 1, marginLeft: 12 },
  portalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  portalDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  portalBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  portalBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  form: {
    paddingHorizontal: 16,
    gap: 10,
  },
  formRow: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  halfInput: { flex: 1 },
  textArea: {
    minHeight: 100,
  },
  stepsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  step: {
    alignItems: 'center',
    flex: 1,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepNumText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
  stepText: {
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: 'center',
    fontWeight: '500',
  },
  stepLine: {
    height: 2,
    flex: 0.5,
    backgroundColor: COLORS.lightGray,
    marginBottom: 20,
  },
});
