import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { checkPermission } from './utils/permissions';
import { getAudioFiles } from './utils/audioFiles';
import AudioList from './components/AudioList';

const App = () => {
  const [audioFiles, setAudioFiles] = useState<any[]>([]);

  // Utilisation de useEffect pour récupérer les fichiers au démarrage
  useEffect(() => {
    const fetchAudioFiles = async () => {
      const permissionGranted = await checkPermission();
      if (permissionGranted) {
        const files = await getAudioFiles();
        setAudioFiles(files); 
      }
    };
    fetchAudioFiles();
  }, []); 

  return (
    <View style={{ flex: 1 }}>
      <AudioList audioFiles={audioFiles} />
    </View>
  );
};

export default App;
