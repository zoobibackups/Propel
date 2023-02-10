import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import LOGO from '../assets/svgs/logo.svg';
import CustomButton from '../components/CustomButton';
import fonts from '../constants/fonts';
import colors from '../constants/theme';
const GettingStartedScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <LOGO width={moderateScale(400)} heigth={moderateScale(300)} />
      <View style={{position: 'absolute', bottom: moderateScale(20)}}>
        <CustomButton onPress={() => navigation.replace('LoginScreen')} />
      </View>
    </SafeAreaView>
  );
};

export default GettingStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.Medium,
    fontSize: moderateScale(23),
    textAlign: 'center',
    marginTop: moderateScale(80),
    color: colors.primaryColor,
  },
});
