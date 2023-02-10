//
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {USER_REGISTER} from '../apis';

import LOGO from '../assets/svgs/logo.svg';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import fonts from '../constants/fonts';
import {moderateScale, SCREEN_WIDTH} from '../constants/scaling';
import colors from '../constants/theme';
const RegisterScreen = ({navigation}) => {
  const [first_name, setFirstName] = useState('');
  const [first_nameErrorMessage, setFirstNameErrorMessage] = useState('');

  const [last_name, setLastName] = useState('');
  const [last_nameErrorMessage, setLastNameErrorMessage] = useState('');

  const [useremail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMiessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const registerUser = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch(USER_REGISTER, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        title: 'Mr',
        firstName: first_name,
        lastName: last_name,
        email: useremail,
        password: password,
        confirmPassword: password,
        acceptTerms: true,
      }),
    })
      .then(data => data.json())
      .then(data => {
        console.log(data, 'DATa');
        alert('Register Successfully');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <KeyboardAwareScrollView bounces={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          alignItems: 'center',
        }}>
        <View style={styles.logoContainer}>
          <LOGO width={moderateScale(300)} heigth={moderateScale(200)} />
        </View>
        <CustomInput
          label={'First Name'}
          value={first_name}
          errorMessage={emailErrorMessage}
          onChangeText={text => setFirstName(text)}
        />
        <CustomInput
          label={'Last Name'}
          value={last_name}
          errorMessage={emailErrorMessage}
          onChangeText={text => setLastName(text)}
        />
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

        <CustomButton title={'Register'} onPress={() => registerUser()} />
        <View style={{height: moderateScale(10)}}></View>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.forgotpassword}>Already have account? Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;

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
});
