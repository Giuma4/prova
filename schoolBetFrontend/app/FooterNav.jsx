import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

export default function FooterNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params?.user;

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('auth_token');
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('auth_token');
    navigation.replace('index');
  };

  const handleHomePress = () => {
    navigation.replace('index', { user });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleHomePress} style={styles.iconContainer}>
        <Icon name="home-outline" size={28} color="#0066cc" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      {!isLoggedIn ? (
        <>
          <TouchableOpacity onPress={() => navigation.replace('LoginPage')} style={styles.iconContainer}>
            <Icon name="log-in-outline" size={28} color="#0066cc" />
            <Text style={styles.label}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace('SignupPage')} style={styles.iconContainer}>
            <Icon name="person-add-outline" size={28} color="#0066cc" />
            <Text style={styles.label}>Signup</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => navigation.navigate('ClassesPage', { user })} style={styles.iconContainer}>
            <Icon name="school-outline" size={28} color="#0066cc" />
            <Text style={styles.label}>Classi</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.iconContainer}>
            <Icon name="log-out-outline" size={28} color="#0066cc" />
            <Text style={styles.label}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
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