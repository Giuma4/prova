import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const HomePage = ({ navigation }) => {
    const userBalance = 1000;
    const leaderboard = [
        { id: '1', name: 'User1', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: '2', name: 'User2', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { id: '3', name: 'User3', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: '4', name: 'User4', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { id: '5', name: 'User5', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
    ];

    const renderLeaderboardItem = ({ item }) => (
        <View style={styles.leaderboardItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.leaderboardText}>{item.name}</Text>
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
                    keyExtractor={(item) => item.id}
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
                <TouchableOpacity onPress={() => navigation.navigate('Refresh')}>
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
