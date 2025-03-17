import React, { useState, useEffect } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import { requestPermission } from './utils/permissions';
import { getAudioFiles } from './utils/audioFiles';
import AudioPlayer from './components/AudioPlayer';

const App = () => {
  const [audioFiles, setAudioFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Fonction pour récupérer et afficher les fichiers audio
  const fetchAudioFiles = async () => {
    const permissionGranted = await requestPermission(); 
    if (permissionGranted) {
      try {
        const files = await getAudioFiles();
        if (files.length === 0) {
          Alert.alert('Aucun fichier audio trouvé');
        } else {
          setAudioFiles(files);
        }
      } catch (error) {
        Alert.alert('Erreur', 'Une erreur s\'est produite lors de la récupération des fichiers audio.');
      }
    } else {
      Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès au stockage pour voir les fichiers audio.');
    }
  };

  useEffect(() => {
    fetchAudioFiles(); 
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Fichiers Audio</Text>
      {audioFiles.length === 0 ? (
        <Text>Aucun fichier audio trouvé</Text>
      ) : (
        audioFiles.map((file) => (
          <Button
            key={file.id}
            title={`Lire ${file.title}`}
            onPress={() => setSelectedFile(file.path)}
          />
        ))
      )}

      {selectedFile && <AudioPlayer filePath={selectedFile} />}
    </View>
  );
};

export default App;
