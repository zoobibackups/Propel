import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import fonts from '../constants/fonts';
import {SCREEN_WIDTH} from '../constants/scaling';
import colors from '../constants/theme';
const CustomInput = ({
  value,
  label = null,
  placeholder,
  errorMessage,
  secureTextEntry = false,
  onChangeText,
  containerStyle,
}) => {
  const [eyeon, setEyeOn] = useState(secureTextEntry);
  return (
    <View style={{...styles.textinputContainer, ...containerStyle}}>
      <Text style={styles.label}>{label}</Text>
      <View>
        <TextInput
          secureTextEntry={eyeon}
          placeholder={placeholder}
          placeholderTextColor={'#0006'}
          value={value}
          autoCapitalize={'none'}
          onChangeText={onChangeText}
          style={{
            ...styles.input,
            width: placeholder !== null ? SCREEN_WIDTH : SCREEN_WIDTH / 1.4,
            backgroundColor: '#0000',
            borderWidth:
              placeholder !== null ? moderateScale(1) : moderateScale(0),
          }}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setEyeOn(!eyeon)}
            style={styles.eyeicon}>
            <FontAwesome
              name={!eyeon ? 'eye' : 'eye-slash'}
              size={scale(16)}
              color={colors.textSecondaryColor}
            />
          </TouchableOpacity>
        )}
      </View>

      {errorMessage !== null && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  textinputContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    backgroundColor: '#0000',
    marginTop: moderateScale(5),
    alignSelf: 'center',
    height: verticalScale(70),
  },
  label: {
    marginBottom: moderateScale(5),
    color: colors.textColor,
    fontSize: moderateScale(12),
    fontFamily: fonts.Medium,
  },
  input: {
    backgroundColor: '#fff',
    width: SCREEN_WIDTH,
    borderColor: colors.borderColor,
    borderRadius: moderateScale(5),
    paddingVertical: 0,
    borderWidth: moderateScale(1),
    height: verticalScale(45),
    fontFamily: fonts.Medium,
    paddingHorizontal: scale(10),
    color: colors.textColor,
  },
  errorText: {
    color: 'red',
    fontFamily: fonts.Light,
    fontSize: moderateScale(10),
  },
  eyeicon: {
    position: 'absolute',
    width: scale(30),
    marginVertical: verticalScale(5),
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: 'rgba(0,0,0,0)',
    height: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
