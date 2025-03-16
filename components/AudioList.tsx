import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Composant pour afficher la liste des fichiers audio
const AudioList = ({ audioFiles }: { audioFiles: any[] }) => {
  if (audioFiles.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Aucun fichier audio trouvé</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fichiers Audio</Text>
      <FlatList
        data={audioFiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    width: '100%',
  },
  itemText: {
    fontSize: 18,
  },
});

export default AudioList;
