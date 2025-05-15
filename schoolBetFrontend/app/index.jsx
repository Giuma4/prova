// index.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import api from './api';
import { useNavigation, useRoute } from '@react-navigation/native';
import FooterNav from './FooterNav';

export default function Index() {
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params?.user;
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    api.get('/users/')
      .then(res => setLeaderboard(res.data.sort((a, b) => b.balance - a.balance)))
      .catch(err => console.error(err));
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loginPrompt}>Effettua il login per vedere i dati del tuo account!</Text>
        <Button title="Login" onPress={() => navigation.replace('LoginPage')} />
        <FooterNav />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Saldo</Text>
        <Text style={styles.balance}>€{user.balance}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Classifica</Text>
        <FlatList
          data={leaderboard}
          keyExtractor={i => i.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.leaderboardItem}>{item.username} — €{item.balance}</Text>
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
  loginPrompt: {
    fontSize: 20,
    color: '#ff6347',
    textAlign: 'center',
    marginTop: 50,
  },
});

