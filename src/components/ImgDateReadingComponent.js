import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {API_URL} from '../apis';
import fonts from '../constants/fonts';
import {SCREEN_WIDTH, wp} from '../constants/scaling';
import colors from '../constants/theme';

const ImgDateReadingComponent = ({
  title,
  date = null,
  is_meter,
  readging = null,
  img,
  img2 = null,
}) => {
  return (
    <View style={styles.ImageCardView}>
      <View style={styles.row}>
        <Text style={styles.bluetxt}>
          {title} : {is_meter}
        </Text>
        {readging !== null && (
          <Text style={styles.bluetxt}>Reading: {readging}</Text>
        )}
      </View>
      <View
        style={{
          ...styles.row2,
          justifyContent: img2 !== null ? 'space-evenly' : 'flex-start',
        }}>
        <Image source={{uri: `${API_URL}${img}`}} style={styles.imgStyle} />
        {img2 !== null && (
          <Image source={{uri: `${API_URL}${img2}`}} style={styles.imgStyle} />
        )}
      </View>
    </View>
  );
};

export default ImgDateReadingComponent;

const styles = StyleSheet.create({
  ImageCardView: {
    width: SCREEN_WIDTH + moderateScale(10),
    borderRadius: moderateScale(5),
    margin: moderateScale(10),
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: colors.borderColor,
    elevation: 0,
  },
  row: {
    borderBottomColor: colors.borderColor,
    paddingBottom: moderateScale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
  },
  imgStyle: {
    width: wp(40),
    height: wp(20),
    borderRadius: moderateScale(5),
    marginHorizontal: moderateScale(5),
  },
  row2: {
    flexDirection: 'row',
    borderBottomColor: colors.white,
    borderBottomWidth: moderateScale(1),
    paddingVertical: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bluetxt: {
    fontFamily: fonts.Bold,
    color: colors.primaryColor,
    fontSize: moderateScale(12),
  },
  title: {
    fontFamily: fonts.Bold,
    color: colors.textColor,
    lineHeight: moderateScale(12) * 1.4,
    fontSize: moderateScale(12),
  },
});
