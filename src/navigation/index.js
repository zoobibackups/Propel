import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AuthStack from './AuthStackNavigator';
import MainStack from './MainStackNavigator';
const MainApp = () => {
  const {is_logged_in} = useSelector(state => state.userReducer);
  return (
    <NavigationContainer>
      {is_logged_in ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainApp;
