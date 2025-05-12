import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import FooterNav from './FooterNav';  // <-- import
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import index from './index';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Se vuoi mostrare i tab anche prima del login, non serve controllare isLoggedIn qui
  useEffect(() => {
    // eventuale check token, ma non blocchiamo il rendering dei tab
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let name;
            if (route.name === 'LoginPage')    name = 'log-in-outline';
            if (route.name === 'SignupPage')   name = 'person-add-outline';
            if (route.name === 'index')     name = 'home-outline';
            return <Icon name={name} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0066cc',
          tabBarInactiveTintColor: '#666',
        })}
      >
        <Tab.Screen name="LoginPage"  component={LoginPage} />
        <Tab.Screen name="Signuppage" component={SignupPage} />
        <Tab.Screen name="index"   component={index} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
