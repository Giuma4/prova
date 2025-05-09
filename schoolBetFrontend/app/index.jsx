import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';

const API_BASE = 'https://tuo-backend-url.com/api'; // <-- Modifica con il tuo URL reale

const HomePage = ({ navigation }) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const userBalance = 1000;

    // Fetch items all'avvio
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get(`${API_BASE}/items/`);
            setLeaderboard(response.data);
        } catch (error) {
            console.error('Errore durante il fetch degli item:', error);
        }
    };

    const renderLeaderboardItem = ({ item }) => (
        <View style={styles.leaderboardItem}>
            <Image source={{ uri: item.avatar || 'https://via.placeholder.com/40' }} style={styles.avatar} />
            <Text style={styles.leaderboardText}>{item.title}: {item.description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>School Bet</Text>
            </View>

            {/* Balance Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Soldi</Text>
                <Text style={styles.balance}>€{userBalance}</Text>
            </View>

            {/* Leaderboard Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Classifica classe</Text>
                <FlatList
                    data={leaderboard}
                    renderItem={renderLeaderboardItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            {/* Bottom Navigation */}
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Icon name="home" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Icon name="search" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={fetchItems}>
                    <Icon name="refresh-cw" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Icon name="user" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingBottom: 70,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 8,
    },
    balance: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    leaderboardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20, 
        marginRight: 12,
    },
    leaderboardText: {
        fontSize: 16,
    },
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
