import { PermissionsAndroid } from 'react-native';

// Fonction pour demander les permissions
export const requestPermission = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Accès au stockage',
        message: 'Cette application a besoin d\'accéder à votre stockage pour fonctionner.',
        buttonNeutral: 'Demander plus tard',
        buttonNegative: 'Annuler',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permission d\'accès au stockage accordée');
      return true;
    } else {
      console.log('Permission d\'accès au stockage refusée');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
