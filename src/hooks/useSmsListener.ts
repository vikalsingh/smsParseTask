import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import SmsRetriever from 'react-native-sms-retriever';

type SmsEvent = { message: string };

export const useSmsListener = () => {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listenerSet = useRef(false);

  const startListening = useCallback(async () => {
    if (Platform.OS !== 'android') {
      setError('SMS Retriever only works on Android.');
      return false;
    }

    try {
      console.log('Starting SMS Retriever...');
      const registered = await SmsRetriever.startSmsRetriever();
      console.log('Registered:', registered);

      if (registered && !listenerSet.current) {
        listenerSet.current = true;
        setIsListening(true);

        SmsRetriever.addSmsListener((event: SmsEvent) => {
          console.log('SMS received:', event.message);
          setLastMessage(event.message);
          setIsListening(false);

          SmsRetriever.removeSmsListener();
          listenerSet.current = false;
        });

        return true;
      }
      return false;
    } catch (e: any) {
      console.log('SMS Retriever error:', e);
      setError(String(e));
      setIsListening(false);
      return false;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (listenerSet.current) {
        SmsRetriever.removeSmsListener();
        listenerSet.current = false;
      }
    };
  }, []);

  return {
    startListening,
    lastMessage,
    isListening,
    error,
  };
};
