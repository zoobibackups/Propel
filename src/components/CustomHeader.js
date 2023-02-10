import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fonts from '../constants/fonts';
import {wp} from '../constants/scaling';
import colors from '../constants/theme';
const CustomeHeader = ({backgroundColor, title = 'Home'}) => {
  return (
    <View style={{...styles.container, backgroundColor: backgroundColor}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity>
          <AntDesign size={moderateScale(25)} name={'menuunfold'} />
        </TouchableOpacity>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};
export default CustomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: wp(100),
    height: moderateScale(50),
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
  },
  text: {
    color: colors,
    fontFamily: fonts.Bold,
    marginLeft: moderateScale(15),
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: colors.textColor,
  },
});
