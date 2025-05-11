import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Stato per determinare se l'utente è loggato
  const [isLoading, setIsLoading] = useState(true);      // Stato per gestire il loading della verifica del login

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token'); // Ottieni il token salvato
        if (token) {
          setIsLoggedIn(true); // L'utente è loggato se c'è un token
        } else {
          setIsLoggedIn(false); // L'utente non è loggato
        }
      } catch (error) {
        console.error('Errore durante il controllo del login:', error);
        setIsLoggedIn(false); // Assicurati di considerare l'utente come non loggato in caso di errore
      } finally {
        setIsLoading(false); // Dopo aver verificato, cambia lo stato di loading
      }
    };

    checkLoginStatus(); // Controlla il login al caricamento dell'app
  }, []);

  if (isLoading) {
    return null; // Puoi mostrare uno spinner o qualcosa del genere mentre il login è in fase di verifica
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Homepage' : 'Login'}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen name="Homepage" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
