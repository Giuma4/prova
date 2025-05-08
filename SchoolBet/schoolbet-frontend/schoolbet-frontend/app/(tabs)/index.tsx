import React, { useState } from 'react';
import { View, Text, Button, Alert, FlatList, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [money, setMoney] = useState(100);

  const scommesse = [
    { id: '1', titolo: 'Prof di mate interroga', quota: 1.3 },
    { id: '2', titolo: 'Verifica a sorpresa', quota: 2.5 },
    { id: '3', titolo: 'Prof di italiano porta i compiti dopo 2 giorni', quota: 1.8 },
  ];

  const classifica = [
    { nome: 'Loris', soldi: 30 },
    { nome: 'Alex', soldi: 25 },
    { nome: 'Sara', soldi: 50 },
  ];

  const eventi = ['Settimana dello studente', 'Gita a fine maggio'];

  const handleScommessa = (quota) => {
    if (money >= 10) {
      setMoney(prev => prev - 10);
      const vincita = 10 * quota;
      setMoney(prev => prev + vincita);
      Alert.alert("Hai vinto!", `Hai guadagnato ${vincita} soldi.`);
    } else {
      Alert.alert("Attenzione", "Non hai abbastanza soldi per scommettere!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎓 SchoolBet</Text>
      <Text style={styles.subtitle}>Saldo: {money} soldi</Text>

      <Text style={styles.sectionTitle}>Scommesse disponibili</Text>
      {scommesse.map((s) => (
        <View key={s.id} style={styles.item}>
          <Text>{s.titolo} - Quota: {s.quota}</Text>
          <Button title="Scommetti 10 soldi" onPress={() => handleScommessa(s.quota)} />
        </View>
      ))}

      <Text style={styles.sectionTitle}>🏆 Classifica</Text>
      {classifica.map((u, i) => (
        <Text key={i}>{i + 1}. {u.nome}: {u.soldi} soldi</Text>
      ))}

      <Text style={styles.sectionTitle}>🎯 Eventi Speciali</Text>
      {eventi.map((ev, i) => (
        <Text key={i}>{ev}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '600',
  },
  item: {
    marginBottom: 10,
  },
});
