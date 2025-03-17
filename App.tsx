import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { checkPermission } from './utils/permissions';
import { getAudioFiles } from './utils/audioFiles';
import AudioPlayer from './components/AudioPlayer';
import AudioList from './components/AudioList';

const App = () => {
  const [audioFiles, setAudioFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

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

  const handleSelectFile = (filePath: string) => {
    setSelectedFile(filePath); 
  };

  return (
    <View style={{ flex: 1 }}>
      <AudioList audioFiles={audioFiles} onSelectFile={handleSelectFile} />
      {selectedFile && <AudioPlayer filePath={selectedFile} />}
    </View>
  );
};

export default App;
