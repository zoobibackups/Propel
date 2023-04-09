//
import React, { useState } from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { RESET_PASSWORD, USER_LOGIN } from '../apis';
import LOGO from '../assets/svgs/logo.svg';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import fonts from '../constants/fonts';
import { SCREEN_WIDTH, moderateScale, wp } from '../constants/scaling';
import colors from '../constants/theme';
const ResetPasswordScreen = ({navigation}) => {
  const [useremail, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    fetch(RESET_PASSWORD, {
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
         Alert.alert(data.title, data.message , [
          {
            text:"OK",
            onPress:navigation.goBack()
          }
         ])
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
          'Password Reset Failed',
          'There is some issue with request. Please try again or contact support',
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
        title={'Reset'}
        onPress={() => UserLogin()}
      />
    </KeyboardAwareScrollView>
  );
};

export default ResetPasswordScreen;

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
