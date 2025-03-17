import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { checkPermission } from './utils/permissions';
import { getAudioFiles } from './utils/audioFiles';
import AudioPlayer from './components/AudioPlayer';

const App = () => {
  const [audioFiles, setAudioFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Fonction pour récupérer et afficher les fichiers audio
  const fetchAudioFiles = async () => {
    const permissionGranted = await checkPermission();
    if (permissionGranted) {
      const files = await getAudioFiles();
      setAudioFiles(files); // Mettre à jour l'état avec les fichiers récupérés
    }
  };

  React.useEffect(() => {
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
