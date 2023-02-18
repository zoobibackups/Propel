import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MainApp from './src/navigation';
import {persistor, store} from './src/store/index';
const App = () => {
  const HideSPlashScreen = () => {
    SplashScreen.hide();
    setTimeout(() => {}, 2000);
  };
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        onBeforeLift={() => HideSPlashScreen()}
        persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
