import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MainApp from './src/navigation';
import {persistor, store} from './src/store/index';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        onBeforeLift={() => SplashScreen.hide()}
        persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
