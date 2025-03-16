import { PermissionsAndroid } from 'react-native';

// Fonction pour vérifier les permissions
export const checkPermission = async (): Promise<boolean> => {
  const granted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  );
  console.log('Permission granted:', granted);
  return granted;
};
