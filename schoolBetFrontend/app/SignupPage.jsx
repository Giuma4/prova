import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FooterNav from './FooterNav';  // <-- import
const API_BASE = 'http://127.0.0.1:8000';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!username || !password) {
      Alert.alert('Errore', 'Inserisci username e password');
      return;
    }
    try {
      const response = await axios.post(`${API_BASE}/users/`, { username, password });
      if ([200, 201].includes(response.status)) {
        Alert.alert('Successo', 'Utente registrato');
        // ✏️ Torna a LoginPage
        navigation.replace('LoginPage');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Errore', 'Registrazione fallita');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrati</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Registrati" onPress={handleSignup} />
      <FooterNav />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f0f0f5' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});
