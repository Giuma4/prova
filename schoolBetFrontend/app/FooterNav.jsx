import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FooterNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('auth_token');
    setIsLoggedIn(false);
    navigation.replace('index');  // Torna alla schermata home dopo il logout
  };

  const handleHomePress = () => {
    if (isLoggedIn) {
      navigation.replace('Index');  // Vai alla home se l'utente è loggato
    } else {
      navigation.replace('index');  // Vai alla home senza autenticazione
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleHomePress} style={styles.iconContainer}>
        <Icon name="home-outline" size={28} color="#0066cc" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      {/* Mostra Login/Signup se l'utente non è loggato */}
      {!isLoggedIn && (
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
      )}

      {/* Mostra Logout se l'utente è loggato */}
      {isLoggedIn && (
        <TouchableOpacity onPress={handleLogout} style={styles.iconContainer}>
          <Icon name="log-out-outline" size={28} color="#0066cc" />
          <Text style={styles.label}>Logout</Text>
        </TouchableOpacity>
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
