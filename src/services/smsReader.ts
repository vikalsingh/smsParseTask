import { PermissionsAndroid, Platform } from 'react-native';

const BANK_SENDERS = ['AXISBK', 'HDFCBK', 'ICICIB', 'SBIINB'];

export const requestSmsPermission = async () => {
  if (Platform.OS !== 'android') return true;

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_SMS,
    {
      title: 'SMS Permission',
      message: 'App needs access to your SMS to track expenses automatically.',
      buttonPositive: 'OK',
    },
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

// Implementation depends on library – you’ll adapt from docs
export const readBankSms = async (): Promise<string[]> => {
  return [];
};
