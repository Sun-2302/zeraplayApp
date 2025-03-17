import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import Sound from 'react-native-sound';

const AudioPlayer = ({ filePath }: { filePath: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<Sound | null>(null);
  const [duration, setDuration] = useState(0);

  const togglePlayback = () => {
    if (isPlaying) {
      audio?.pause();
    } else {
      audio?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const initializeAudio = () => {
    const sound = new Sound(filePath, '', (error) => {
      if (error) {
        console.log('Erreur de chargement du fichier audio :', error);
        return;
      }
      setDuration(sound.getDuration());
      setAudio(sound);
      sound.setNumberOfLoops(0); 
    });
  };

  React.useEffect(() => {
    initializeAudio();

    return () => {
      if (audio) {
        audio.release();
      }
    };
  }, [filePath]);

  
  const formatDuration = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes} min ${seconds < 10 ? '0' : ''}${seconds} sec`;
  };

  return (
    <View>
      <Text>Durée : {formatDuration(duration)}</Text>
      <Button title={isPlaying ? 'Pause' : 'Lire'} onPress={togglePlayback} />
    </View>
  );
};

export default AudioPlayer;
