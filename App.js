import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import colors from './src/constants/theme';
import MainApp from './src/navigation';
import {persistor, store} from './src/store/index';

const App = () => {
  const is_permission_done = true;
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);

    StatusBar.setBarStyle('dark-content');
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
