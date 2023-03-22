//
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FORGOT_PASS} from '../apis';
import LOGO from '../assets/svgs/logo.svg';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import fonts from '../constants/fonts';
import {moderateScale, SCREEN_WIDTH, wp} from '../constants/scaling';
import colors from '../constants/theme';
const ForgotPasswordScreen = ({navigation}) => {
  const [useremail, setEmail] = useState(''); //
  const [emailErrorMessage, setEmailErrorMiessage] = useState(null);
  const [isloading, setLoading] = useState(false);
  const UserLogin = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (useremail.trim() == '' || useremail == null) {
      alert('Enter your email');
      return;
    }

    setLoading(true);
    fetch(`${FORGOT_PASS}?email=${useremail}`, {
      method: 'GET',
      headers: myHeaders,
    })
      .then(data => data.json())
      .then(data => {
        if (
          data.message ==
            'Please check your email for password reset instructions' ||
          data.message == 'Unauthorized'
        ) {
          alert(data.message);
        } else {
          alert('There is some issue. Please try agian later');
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
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          alignItems: 'center',
        }}>
        <View style={styles.logoContainer}>
          <LOGO width={wp(80)} height={moderateScale(200)} />
        </View>
        <CustomInput
          label={'Enter your valid email'}
          value={useremail}
          errorMessage={emailErrorMessage}
          onChangeText={text => setEmail(text)}
        />

        <View style={{height: moderateScale(10)}}></View>

        <CustomButton
          isloading={isloading}
          title={'Get Password Reset Link'}
          onPress={() => UserLogin()}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPasswordScreen;

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
