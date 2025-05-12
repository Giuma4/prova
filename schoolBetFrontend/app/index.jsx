import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import FooterNav from './FooterNav';  // <-- import
const API_BASE = 'http://127.0.0.1:8000';

export default function index() {
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params?.user;
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/users/`)
      .then(res => setLeaderboard(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('auth_token');
    // ✏️ Torna a LoginPage
    navigation.replace('LoginPage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Saldo</Text>
        <Text style={styles.balance}>€{user?.balance ?? '—'}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Classifica</Text>
        <FlatList
          data={leaderboard}
          keyExtractor={i => i.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.leaderboardItem}>
              {item.username} — €{item.balance}
            </Text>
          )}
        />
      </View>
      <FooterNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f5' },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
    elevation: 5,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  balance: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  leaderboardItem: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
