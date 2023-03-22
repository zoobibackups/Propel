//
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {USER_LOGIN} from '../apis';
import LOGO from '../assets/svgs/logo.svg';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import fonts from '../constants/fonts';
import {moderateScale, SCREEN_WIDTH, wp} from '../constants/scaling';
import colors from '../constants/theme';
import {userLogin} from '../store/actions/userActions';
const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [useremail, setEmail] = useState(''); //
  const [password, setPassword] = useState(''); //
  const [emailErrorMessage, setEmailErrorMiessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [isloading, setLoading] = useState(false);

  const UserLogin = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (useremail.trim() == '' || useremail == null) {
      alert('Enter emial');
      return;
    }
    if (password.trim() == '' || password == null) {
      alert('Enter password');
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
        if (data?.message == 'Email or password is incorrect') {
          alert(data?.message);
        } else if (
          data?.message == "Cannot read property 'scope' of undefined"
        ) {
          alert(
            'Please check your email and password. and try again in a while',
          );
        } else {
          dispatch(userLogin(data));
        }

        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        alert('Some Error');
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
