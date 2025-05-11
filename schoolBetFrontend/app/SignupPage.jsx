// SignupPage.jsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000';

const SignupPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
  if (!username || !password) {
    Alert.alert('Errore', 'Inserisci username e password');
    return;
  }

  try {
    const response = await axios.post(`${API_BASE}/users`, {
      username,
      password,
    });

    if (response.status === 200 || response.status === 201) {
      Alert.alert('Successo', 'Utente registrato correttamente');
      navigation.navigate('Homepage'); // Naviga alla home dopo il successo
    }
  } catch (error) {
    console.error('Errore nella registrazione:', error);
    Alert.alert('Errore', 'Registrazione fallita. Riprova.');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrazione</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrati" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default SignupPage;
