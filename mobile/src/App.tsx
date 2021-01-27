import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { LocationProvider } from './hooks/useGetLocation';
import Home from './pages/Home';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LocationProvider>
        <Home />
      </LocationProvider>
    </>
  );
};

export default App;
