import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FooterNav from './FooterNav';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Index from './index';
import ClassesPage from './ClassesPage';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
            if (route.name === 'LoginPage') name = 'log-in-outline';
            if (route.name === 'SignupPage') name = 'person-add-outline';
            if (route.name === 'index') name = 'home-outline';
            if (route.name === 'ClassesPage') name = 'school-outline';
            return <Icon name={name} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0066cc',
          tabBarInactiveTintColor: '#666',
        })}
      >
        <Tab.Screen name="LoginPage" component={LoginPage} />
        <Tab.Screen name="SignupPage" component={SignupPage} />
        <Tab.Screen name="index" component={Index} />
        <Tab.Screen name="ClassesPage" component={ClassesPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}