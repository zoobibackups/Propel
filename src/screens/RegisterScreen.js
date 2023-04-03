//
import React, {useState} from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {USER_REGISTER} from '../apis';

import LOGO from '../assets/svgs/logo.svg';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import fonts from '../constants/fonts';
import {moderateScale, SCREEN_WIDTH, wp} from '../constants/scaling';
import colors from '../constants/theme';
const RegisterScreen = ({navigation}) => {
  const [first_name, setFirstName] = useState('');
  const [isloading, setLoading] = useState(false);

  const [last_name, setLastName] = useState('');

  const [useremail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMiessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [company_name, setCompnayName] = useState('');
  const [company_address, setAddress] = useState('');
  const [mobile_number, setMobileNumber] = useState('');
  const [company_email, setCompanyEmail] = useState('');
  const [company_logo, setLogo] = useState('uploads/pdf_logo.png');
  const registerUser = () => {
    if (first_name == '' || first_name == null) {
      alert('Please Enter your first Name');
      return;
    }
    if (last_name == '' || last_name == null) {
      alert('Please Enter your last name');
      return;
    }

    if (useremail == '' || useremail == null) {
      alert('Please Enter your email');
      return;
    }

    if (password == null || password.length < 6) {
      alert('Password must be at least 6 charters ');
      return;
    }

    if (company_name == '' || company_name == null) {
      alert('Compnay name cannot be empty');
      return;
    }

    if (company_address == '' || company_address == null) {
      alert('Please Enter compnay Address');
      return;
    }

    if (mobile_number == '' || mobile_number == null) {
      alert('Please Enter company Mobile Number');
      return;
    }

    if (company_email == '' || company_email == null) {
      alert('Please Enter company Email');
      return;
    }
    setLoading(true);
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
        company_name: company_name,
        company_address: company_address,
        mobile_number: mobile_number,
        company_email: company_email,
        company_logo: company_logo,
      }),
    })
      .then(data => data.json())
      .then(data => {
        if (data.status) {
          Alert.alert(data.title, data.message, [
            {
              text: 'Open Email',
              onPress: () =>
                Linking.openURL('mailto:admin@propelinspections.com').catch(
                  err => {},
                ),
            },
          ]);
        } else {
          Alert.alert(data.title, data.message, [
            {
              text: 'Try different Email',
            },
            {
              text: 'Reset Pasword',
              onPress: () => navigation.navigate('ForgotPasswordScreen'),
            },
          ]);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        Alert.alert(
          'Registeration Failed',
          'There was some issue with your account . Please Try again or contact support throught email ',
          [
            {
              text: 'Support Contact',
              onPress: () =>
                Linking.openURL('mailto:admin@propelinspections.com').catch(
                  err => {},
                ),
            },
            {
              text: 'Try Again',
            },
          ],
        );
      });
  };
  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: '#fff'}}
      bounces={false}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
          alignItems: 'center',
        }}>
        <View style={styles.logoContainer}>
          <LOGO width={wp(80)} height={moderateScale(200)} />
        </View>
        <Text style={styles.headingText}>Personal Info</Text>
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
          label={'Email'}
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

        <Text style={styles.headingText}>Company Info</Text>

        <CustomInput
          label={'Company Name'}
          value={company_name}
          errorMessage={null}
          onChangeText={text => setCompnayName(text)}
        />

        <CustomInput
          label={'Company Phone'}
          value={mobile_number}
          errorMessage={null}
          onChangeText={text => setMobileNumber(text)}
        />
        <CustomInput
          label={'Company Email'}
          value={company_email}
          errorMessage={null}
          onChangeText={text => setCompanyEmail(text)}
        />
        <CustomInput
          label={'Company Address'}
          value={company_address}
          errorMessage={null}
          onChangeText={text => setAddress(text)}
        />
        <View style={{height: moderateScale(10)}}></View>

        <CustomButton
          isloading={isloading}
          title={'Register'}
          onPress={() => registerUser()}
        />
        <View style={{height: moderateScale(10)}}></View>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.forgotpassword}>Already have account? Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
    height: moderateScale(150),
    marginTop: moderateScale(50),
  },
  headingText: {
    marginBottom: moderateScale(10),
    fontSize: moderateScale(16),
    color: colors.primaryColor,
    width: SCREEN_WIDTH,
    textAlign: 'left',
    fontFamily: fonts.Bold,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  forgotpassword: {
    marginBottom: moderateScale(5),
    color: colors.primaryColor,
    width: SCREEN_WIDTH,
    textAlign: 'right',
    fontFamily: fonts.Medium,
  },
});
