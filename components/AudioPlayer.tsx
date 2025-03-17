import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import Sound from 'react-native-sound';

const AudioPlayer = ({ filePath }: { filePath: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<Sound | null>(null);
  const [duration, setDuration] = useState(0);

  // Fonction pour démarrer ou arrêter la lecture
  const togglePlayback = () => {
    if (isPlaying) {
      audio?.pause();
    } else {
      audio?.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Fonction pour initialiser le fichier audio et récupérer la durée
  const initializeAudio = () => {
    const sound = new Sound(filePath, '', (error) => {
      if (error) {
        console.log('Erreur de chargement du fichier audio :', error);
        return;
      }
      setDuration(sound.getDuration());
      setAudio(sound);
      sound.setNumberOfLoops(0); // Lecture une seule fois
    });
  };

  // Initialisation au changement de filePath
  React.useEffect(() => {
    initializeAudio();

    // Nettoyer l'audio à la destruction du composant
    return () => {
      if (audio) {
        audio.release();
      }
    };
  }, [filePath]);

  return (
    <View>
      <Text>Durée : {duration} secondes</Text>
      <Button title={isPlaying ? 'Pause' : 'Lire'} onPress={togglePlayback} />
    </View>
  );
};

export default AudioPlayer;
