// ClassesPage.jsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import FooterNav from './FooterNav';  // <-- import
const API_BASE = 'http://127.0.0.1:8000';
import { ScrollView } from 'react-native';


export default function ClassesPage() {
  const route = useRoute();
  const user = route.params?.user;
  const [search, setSearch] = useState('');
  const [classes, setClasses] = useState([]);
  const [newName, setNewName] = useState('');
  const [newMax, setNewMax] = useState('');

  const fetchClasses = () => {
    axios.get(`${API_BASE}/classes/`, { params: { search } })
      .then(res => setClasses(res.data))
      .catch(() => Alert.alert('Errore', 'Impossibile caricare le classi'));
  };

  useEffect(() => { fetchClasses(); }, [search]);

  const handleCreate = () => {
    console.log('user', user);
    if (!newName || !newMax) {
      Alert.alert('Errore', 'Inserisci nome e numero partecipanti');
      return;
    }
    axios.post(`${API_BASE}/classes/`, {
      name: newName,
      max_participants: parseInt(newMax, 10),
      admin_id: user.id,
    })
      .then(() => {
        Alert.alert('Successo', 'Classe creata');
        setNewName(''); setNewMax('');
        fetchClasses();
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Errore', err.response?.data?.detail || 'Creazione fallita');
      });
  };

  return (
  <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <TextInput
        style={styles.search}
        placeholder="Cerca classe..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={classes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name} ({item.max_participants})</Text>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome nuova classe"
        value={newName}
        onChangeText={setNewName}
      />
      <TextInput
        style={styles.input}
        placeholder="Numero partecipanti"
        keyboardType="numeric"
        value={newMax}
        onChangeText={setNewMax}
      />
      <Button title="Crea Classe" onPress={handleCreate} />
    </ScrollView>
    <FooterNav />
  </View>
);

}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f5' },
  search: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 8, backgroundColor: '#fff' },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginTop: 10, borderRadius: 8, backgroundColor: '#fff' },
  btn: { marginBottom: 10 },
  scrollContent: {
  paddingBottom: 0, // o quanto basta a evitare sovrapposizione
  } ,

});