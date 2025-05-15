import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import FooterNav from './FooterNav';  // <-- import
const API_BASE = 'http://127.0.0.1:8000';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Stato per l'errore
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const { data, status } = await axios.post(`${API_BASE}/login/`, { username, password });
      if (status === 200) {
        await AsyncStorage.setItem('auth_token', data.token || 'dummy');
        navigation.replace('index', { user: data });
      } else {
        // Se la risposta non è 200, mostra un errore
        setError('Credenziali non valide');
      }
    } catch (e) {
        setError('Credenziali non valide, se non sei registrato, registrati ora!');
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      {error ? <Text style={styles.error}>{error}</Text> : null} {/* Mostra l'errore se presente */}
      <Button title="Accedi" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('SignupPage')}>
        <Text style={styles.link}>Non hai un account? Registrati</Text>
      </TouchableOpacity>
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
  link: { marginTop: 16, color: '#0066cc', textAlign: 'center' },
  error: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});
