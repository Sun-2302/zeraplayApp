import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';


const AudioList = ({ audioFiles, onSelectFile }: { audioFiles: any[]; onSelectFile: (filePath: string) => void }) => {
  if (audioFiles.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Aucun fichier audio trouvé</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chansons</Text>
      <FlatList
        data={audioFiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectFile(item.path)} style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
  },
});

export default AudioList;
