  // index.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const API_BASE = 'http://127.0.0.1:8000';

const HomePage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = route?.params?.user;
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${API_BASE}/users/`);
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Errore fetch leaderboard:', error.message);
    }
  };

  const renderLeaderboardItem = ({ item }) => (
    <View style={styles.leaderboardItem}>
      <Image
        source={{ uri: item.avatar || 'https://via.placeholder.com/40' }}
        style={styles.avatar}
      />
      <Text style={styles.leaderboardText}>
        {item.id}° {item.username} — €{item.balance}
      </Text>
    </View>
  );

  const handleLogout = () => {
    Alert.alert('Logout', 'Sei stato disconnesso.');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>School Bet</Text>
      </View>

      {/* Card Saldo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Soldi</Text>
        <Text style={styles.balance}>€{user?.balance ?? '—'}</Text>
      </View>

      {/* Card Classifica */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Classifica classe</Text>
        <FlatList
          data={leaderboard}
          renderItem={renderLeaderboardItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      {/* Navbar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Icon name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignupPage')}>
          <Icon name="user-plus" size={24} color="#000" />
        </TouchableOpacity>
         <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
          <Icon name="log-in" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="log-out" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingBottom: 70, backgroundColor: '#fff' },
  header: { alignItems: 'center', marginBottom: 16 },
  headerText: { fontSize: 20, fontWeight: 'bold' },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardTitle: { fontWeight: 'bold', fontSize: 14, marginBottom: 8 },
  balance: { fontSize: 28, fontWeight: 'bold' },
  leaderboardItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  leaderboardText: { fontSize: 16 },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default HomePage;
