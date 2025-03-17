import RNFS from 'react-native-fs';

export const getAudioFiles = async (): Promise<any[]> => {
  let allFiles: any[] = [];
  try {
    const rootDir = RNFS.ExternalStorageDirectoryPath; 

    const readDirRecursively = async (dirPath: string) => {
      try {
        const files = await RNFS.readDir(dirPath);
        if (!files || files.length === 0) {
          console.log(`Aucun fichier dans le répertoire: ${dirPath}`);
          return; 
        }

        for (const file of files) {
          if (file.isDirectory()) {
            await readDirRecursively(file.path);
          } else if (file.isFile() && (file.name.endsWith('.mp3') || file.name.endsWith('.m4a'))) {
            allFiles.push({
              id: file.path,
              title: file.name.replace(/\.[^/.]+$/, ''),
              path: file.path,
            });
          }
        }
      } catch (error) {
        console.warn('Erreur lors de la lecture du répertoire:', dirPath, error);
      }
    };

    await readDirRecursively(rootDir);
    console.log('Fichiers audio trouvés:', allFiles);
  } catch (error) {
    console.warn('Erreur d\'accès au répertoire:', error);
  }
  return allFiles;
};
