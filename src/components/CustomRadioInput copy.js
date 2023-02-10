import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import fonts from '../constants/fonts';
import {SCREEN_WIDTH} from '../constants/scaling';
import colors from '../constants/theme';
const CustomRadioInput = ({
  options,
  is_reading = true,
  label,
  cameraimage = [],
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.textinputContainer}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.input}>
        {options.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onChangeText(item)}
              key={`${index}`}
              style={{
                ...styles.RadioButton,

                backgroundColor:
                  item == value ? colors.primaryColor : colors.white,
              }}>
              <View
                style={{
                  ...styles.checkBg,
                  backgroundColor:
                    item !== value ? colors.borderColor : colors.white,
                }}>
                <AntDesign
                  name={'check'}
                  size={scale(12)}
                  color={item == value ? colors.primaryColor : colors.white}
                />
              </View>
              <Text
                style={{
                  color: item == value ? colors.white : colors.textColor,
                  paddingLeft: moderateScale(10),
                  fontSize: moderateScale(12),
                  fontFamily: fonts.Medium,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
        {is_reading && (
          <TextInput
            value={'123123'}
            style={{
              backgroundColor: colors.primaryColor,
              width: moderateScale(80),
              height: moderateScale(35),
              borderRadius: moderateScale(2),
              paddingHorizontal: moderateScale(5),
              color: colors.white,
            }}
          />
        )}
        {cameraimage.map(item => {
          return (
            <TouchableOpacity
              style={{
                opacity: item == 0 ? 0 : 1,
                paddingHorizontal: moderateScale(10),
              }}>
              <Entypo
                name={'camera'}
                size={moderateScale(30)}
                color={colors.primaryColor}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomRadioInput;

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
    color: colors.textSecondaryColor,
    fontSize: moderateScale(12),
    fontFamily: fonts.Medium,
  },
  input: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    overflow: 'hidden',
    borderColor: colors.borderColor,
    borderRadius: moderateScale(5),
    alignItems: 'center',
    borderWidth: moderateScale(1),
    height: verticalScale(45),
    paddingHorizontal: moderateScale(2),
    fontFamily: fonts.Medium,
    justifyContent: 'space-between',
    color: colors.textColor,
  },
  errorText: {
    color: 'red',
    fontFamily: fonts.Light,
    fontSize: moderateScale(10),
  },
  RadioButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(70),
    height: moderateScale(40),
    borderRadius: moderateScale(5),
    borderColor: colors.borderColor,
    borderWidth: 1,
    backgroundColor: colors.borderColor,
  },
  checkBg: {
    width: scale(18),
    height: scale(18),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
});
