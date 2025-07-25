import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

const API_BASE = 'http://<IP_MACHINE>:3000/api';

export default function SongListScreen() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/songs`)
      .then(res => setSongs(res.data))
      .catch(err => console.error('Erreur:', err));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
        Liste des chansons
      </Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.title} - {item.artist}</Text>
            <Text style={{ color: 'gray' }}>Pour : {item.person_name}</Text>
          </View>
        )}
      />
    </View>
  );
}