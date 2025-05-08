import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';  // Importa l'hook

const HomeScreen = () => {
  const navigation = useNavigation(); // Usa l'hook per ottenere la navigazione

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => {}} />
        <Appbar.Content title="School Bet" />
        <View style={styles.redSquareSmall} />
      </Appbar.Header>

      <ScrollView style={styles.scroll}>
        {/* Balance Card */}
        <Card style={styles.moneyCard}>
          <Card.Content>
            <Text style={styles.label}>Soldi</Text>
            <Text style={styles.money}>€1000</Text>
          </Card.Content>
        </Card>

        {/* Classifica */}
        <Card style={styles.classificaCard}>
          <Card.Title title="Classifica classe" titleStyle={styles.classificaTitle} />
          <Card.Content>
            {/* Lista degli utenti */}
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        <Icon name="home-outline" size={28} onPress={() => navigation.navigate('Home')} />
        <Icon name="magnify" size={28} onPress={() => navigation.navigate('Search')} />
        <Icon name="swap-horizontal" size={28} onPress={() => navigation.navigate('Swap')} />
        <Icon name="calendar-outline" size={28} onPress={() => navigation.navigate('Calendar')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingHorizontal: 16 },
  moneyCard: { marginTop: 20 },
  label: { fontSize: 16, color: '#555' },
  money: { fontSize: 28, fontWeight: 'bold', marginTop: 5 },
  classificaCard: { marginTop: 20 },
  classificaTitle: { fontSize: 16 },
  redSquareSmall: {
    width: 36,
    height: 36,
    backgroundColor: 'red',
    borderRadius: 8,
    marginRight: 12,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default HomeScreen;
