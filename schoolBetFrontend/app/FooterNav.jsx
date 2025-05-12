// FooterNav.jsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function FooterNav() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.replace('HomePage')} style={styles.iconContainer}>
        <Icon name="home-outline" size={28} color="#0066cc" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace('LoginPage')} style={styles.iconContainer}>
        <Icon name="log-in-outline" size={28} color="#0066cc" />
        <Text style={styles.label}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace('SignupPage')} style={styles.iconContainer}>
        <Icon name="person-add-outline" size={28} color="#0066cc" />
        <Text style={styles.label}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
  },
  iconContainer: {
    alignItems: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: '#0066cc',
  },
});
