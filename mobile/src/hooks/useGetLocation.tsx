import React, { createContext, useContext, useCallback, useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

interface LocationProps {
  currentLatitude: string;
  currentLongitude: string;
  handleCallLocation: () => void;
}

const LocationContext = createContext<LocationProps>({} as LocationProps);

const LocationProvider: React.FC = ({ children }) => {
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');

  const handleCallLocation = useCallback(() => {
    // se o dispositivo for ios já é liberado permissão
    if (Platform.OS === 'ios') {
      getLocation();
      return;
    }

    const requestLocationPermisson = async () => {
      // solicitação de permissão de ativação do gps para dispositivos android
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de acesso à localização',
          message: 'Este aplicativo precisa acessar sua localização.',
          buttonNeutral: 'Pergunte-me mais tarde',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Ok',
        },
      );

      // verifica se a solicitação foi liberada para capturar os dados.
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      } else {
        Alert.alert('Aviso', 'Permissão de localização negada.');
      }
    };

    requestLocationPermisson();
  }, []); //eslint-disable-line

  const getLocation = useCallback(() => {
    // pegar localização em tempo real do usuário
    Geolocation.getCurrentPosition(
      position => {
        const currentLatitud = JSON.stringify(position.coords.latitude);
        const currentLongitud = JSON.stringify(position.coords.longitude);
        setCurrentLatitude(currentLatitud);
        setCurrentLongitude(currentLongitud);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  return (
    <LocationContext.Provider
      value={{
        handleCallLocation,
        currentLatitude,
        currentLongitude,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

const useGetLocation = (): LocationProps => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useGetLocation deve ser usado dentro de um provedor');
  }

  return context;
};

export { LocationProvider, useGetLocation };
