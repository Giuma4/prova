//ClassesPage.jsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import FooterNav from './FooterNav';  // <-- import
const API_BASE = 'http://127.0.0.1:8000';

export default function ClassesPage() {
  const route = useRoute();
  const user = route.params?.user;
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [classes, setClasses] = useState([]);
  const [newName, setNewName] = useState('');
  const [newMax, setNewMax] = useState('');
  console.log(user);
  const fetchClasses = () => {
    axios.get(`${API_BASE}/classes/`, { params: { search } })
      .then(res => setClasses(res.data))
      .catch(() => Alert.alert('Errore', 'Impossibile caricare le classi'));
  };

  useEffect(() => { fetchClasses(); }, [search]);

  const handleCreate = () => {
  // Verifica se il nome è vuoto o il numero di partecipanti è invalido
  if (!newName || !newMax) {
    Alert.alert('Errore', 'Inserisci nome e numero partecipanti');
    return;
  }

  // Controlla se il nome della classe esiste già
  axios.get(`${API_BASE}/classes/`, { params: { name: newName } })
    .then(res => {
      if (res.data.exists) {
        Alert.alert('Errore', 'Il nome della classe esiste già. Scegli un altro nome.');
        return;
      }

      // Se il nome è unico, procedi con la creazione della classe
      axios.post(`${API_BASE}/classes/`, {
        name: newName,
        max_participants: parseInt(newMax, 10),
        admin_id: user.id,
      })
        .then(() => {
          Alert.alert('Successo', 'Classe creata');
          setNewName('');
          setNewMax('');
          fetchClasses();
        })
        .catch(err => {
          console.error(err);
          Alert.alert('Errore', err.response?.data?.detail || 'Creazione fallita');
        });
    })
    .catch(err => {
      console.error(err);
      Alert.alert('Errore', 'Impossibile verificare il nome della classe');
    });
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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
          contentContainerStyle={styles.scrollContent} // <-- spazio extra
        />

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
         <Text style={styles.buttonText}>Crea Classe</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Nuova Classe</Text>
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
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleCreate();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Crea</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancel}>Annulla</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>

      {/* Navbar fissa in fondo */}
      <FooterNav style={styles.footerNav} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f0f0f5',
    paddingBottom: 80, // <-- aggiungi padding per spazio alla navbar
  },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120, // <-- lascia spazio sufficiente per non sovrapporsi
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bottomSection: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  footerNav: {
    position: 'absolute', // Fissa la navbar
    bottom: 0,            // Posizionala in fondo
    left: 0,
    right: 0,
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContainer: {
  width: '90%',
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 20,
  elevation: 5,
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
},
modalCancel: {
  color: 'red',
  textAlign: 'center',
  marginTop: 10,
  fontSize: 16,
},

});
