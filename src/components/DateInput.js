import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import fonts from '../constants/fonts';
import {SCREEN_WIDTH} from '../constants/scaling';
import colors from '../constants/theme';
const DataInput = ({value, label, errorMessage, onChangeText}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <View style={styles.mainView}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Text style={styles.placeholdertext}>{value}</Text>
        <TouchableOpacity onPress={() => setOpen(true)} style={styles.iconBg}>
          <FontAwesome
            name={'calendar'}
            size={scale(16)}
            color={colors.primaryColor}
          />
        </TouchableOpacity>
      </View>

      {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
      <DatePicker
        modal
        open={open}
        date={date}
        mode={'date'}
        onConfirm={date => {
          setOpen(false);
          onChangeText(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default DataInput;
const styles = StyleSheet.create({
  mainView: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    backgroundColor: '#0000',
    marginTop: moderateScale(5),
    alignSelf: 'center',
    height: verticalScale(70),
  },
  label: {
    marginBottom: moderateScale(5),
    fontSize: moderateScale(12),
    color: colors.textColor,
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
    fontFamily: fonts.Medium,
    paddingLeft: moderateScale(20),
    color: colors.textColor,
  },
  placeholdertext: {
    fontFamily: fonts.Medium,
    fontSize: moderateScale(12),
    textAlignVertical: 'center',
    color: colors.primaryColor,
  },
  iconBg: {
    width: moderateScale(50),
    position: 'absolute',
    right: 0,

    // backgroundColor: 'rgba(0,0,0,0)',
    height: verticalScale(48),
    justifyContent: 'center',
    alignItems: 'center',
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
