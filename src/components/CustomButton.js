import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import fonts from '../constants/fonts';
import {SCREEN_WIDTH, wp} from '../constants/scaling';
import colors from '../constants/theme';
const CustomButton = ({
  disabled = false,
  isloading = false,
  buttonStyle,
  textStyle,
  title = 'GET STARTED',
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{...styles.button, buttonStyle}}>
      {isloading ? (
        <ActivityIndicator color={colors.white} size={'small'} />
      ) : (
        <Text style={{...styles.text}}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
    borderRadius: moderateScale(100),
    height: moderateScale(50),
  },
  text: {
    fontFamily: fonts.Bold,
    includeFontPadding: false,
    color: colors.white,
  },
});
