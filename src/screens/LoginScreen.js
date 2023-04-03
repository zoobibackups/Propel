//
import React, {useState} from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {USER_LOGIN} from '../apis';
import LOGO from '../assets/svgs/logo.svg';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import fonts from '../constants/fonts';
import {SCREEN_WIDTH, moderateScale, wp} from '../constants/scaling';
import colors from '../constants/theme';
import {userLogin} from '../store/actions/userActions';
const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [useremail, setEmail] = useState('aqeel.saqlain@hotmail.co.uk'); //
  const [password, setPassword] = useState('DB8W2B6N2I5'); //
  const [emailErrorMessage, setEmailErrorMiessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [isloading, setLoading] = useState(false);

  const UserLogin = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (useremail.trim() == '' || useremail == null) {
      Alert.alert("Email Can't be empty", 'Please Enter your registered Email');
      return;
    }
    if (password.trim() == '' || password == null) {
      Alert.alert("Password Can't be empty", 'Please Enter Password');
      return;
    }
    setLoading(true);
    fetch(USER_LOGIN, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        email: useremail,
        password: password,
      }),
    })
      .then(data => data.json())
      .then(data => {
        if (data.status == true) {
          dispatch(userLogin(data.data));
        } else if (data.status == false) {
          Alert.alert(data.title, data.message, [
            {
              text: 'Open Email',
              onPress: () =>
                Linking.openURL('mailto:admin@propelinspections.com').catch({}),
            },
            {
              text: 'Try Again',
            },
          ]);
        }

        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        Alert.alert(
          'Login Failed',
          'There is some issue with your login. Please try again or contact support',
          [
            {
              text: 'Contact Support',
              onPress: () =>
                Linking.openURL('mailto:admin@propelinspections.com'),
            },
            {
              text: 'Cancel',
            },
          ],
        );
      });
  };
  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: '#fff'}}
      bounces={false}>
      <View style={styles.logoContainer}>
        <LOGO width={wp(80)} height={moderateScale(200)} />
      </View>
      <CustomInput
        label={'Username'}
        value={useremail}
        errorMessage={emailErrorMessage}
        onChangeText={text => setEmail(text)}
      />
      <CustomInput
        label={'Password'}
        secureTextEntry={true}
        value={password}
        errorMessage={passwordErrorMessage}
        onChangeText={text => setPassword(text)}
      />
      <View style={{height: moderateScale(10)}}></View>

      <CustomButton
        isloading={isloading}
        title={'Login'}
        onPress={() => UserLogin()}
      />
      <View style={{height: moderateScale(10)}} />
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgotpassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={{height: moderateScale(20)}} />
      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.registerText}>
          Don't have an account? Register Here
        </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(200),
    marginTop: moderateScale(50),
  },
  forgotpassword: {
    marginBottom: moderateScale(5),
    color: colors.primaryColor,
    width: SCREEN_WIDTH,
    textAlign: 'right',
    fontFamily: fonts.Medium,
  },
  registerText: {
    marginBottom: moderateScale(5),
    color: colors.primaryColor,
    alignSelf: 'center',

    fontFamily: fonts.Medium,
    borderBottomColor: '#0090FF11',
    borderBottomWidth: 2,
  },
});
