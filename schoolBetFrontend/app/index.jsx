import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

import { useNavigation, useRoute } from '@react-navigation/native';
import FooterNav from './FooterNav';  // <-- import
const API_BASE = 'http://127.0.0.1:8000';

export default function Index() {
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params?.user;
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/users/`)
      .then(res => {
        const sortedData = res.data.sort((a, b) => b.balance - a.balance); // Ordina in ordine decrescente
        setLeaderboard(sortedData);
      })
      .catch(err => console.error(err));
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.loginPromptContainer}>
          <Icon name="person-add-outline" size={28} color="#0066cc" />         
          <Text style={styles.loginPrompt}>Effettua il login per vedere i dati del tuo account!</Text>
          <Text style={styles.subText}>Chi sarà il prossimo a essere interrogato?</Text>
        </View>
        <FooterNav />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Saldo</Text>
        <Text style={styles.balance}>€{user?.balance ?? '—'}</Text>
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
  loginPromptContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
    elevation: 5,
  },
  loginPrompt: {
    fontSize: 20,
    color: '#ff6347', // un colore più caldo
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  subText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
});
