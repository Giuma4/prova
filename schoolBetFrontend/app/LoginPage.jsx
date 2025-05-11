  // LoginPage.jsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert,TouchableOpacity } from 'react-native';
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE}/login/`, {
        username,
        password,
      });

      if (response.status === 200) {
        const userData = response.data;
        Alert.alert('Benvenuto!', `Saldo: €${userData.balance}`);
        navigation.navigate('Homepage', { user: userData });
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Errore', 'Login fallito');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Accedi" onPress={handleLogin} />
      <TouchableOpacity style={styles.input} onPress={() => navigation.navigate('Signup')}>
  <Text>Registrati</Text>
</TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 16, borderRadius: 8 },
});

export default LoginPage;
