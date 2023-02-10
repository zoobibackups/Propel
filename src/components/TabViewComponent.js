import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import fonts from '../constants/fonts';
import {SCREEN_WIDTH} from '../constants/scaling';
import colors from '../constants/theme';
const TabViewComponent = ({data}) => {
  return (
    <View style={styles.mainView}>
      <Text
        style={{
          ...styles.text,
          fontFamily: fonts.Bold,
          color: colors.primaryColor,
          fontSize: moderateScale(14),
          marginBottom: moderateScale(5),
        }}>
        {data.name} Details
      </Text>
      <Text style={styles.text}>{data.description}</Text>
      <Text style={styles.text}>Images</Text>
      <View style={styles.Row}>
        {data.property_images.map((item, index) => {
          return (
            <TouchableOpacity key={`${index}`} style={styles.imagebg}>
              <Image
                style={{
                  width: moderateScale(90),
                  resizeMode: 'cover',
                  borderRadius: moderateScale(5),
                  height: moderateScale(60),
                }}
                source={{uri: item.url ? null : null}}
                defaultSource={require('../assets/default.jpg')}
                color={colors.primaryColor}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default TabViewComponent;

const styles = StyleSheet.create({
  mainView: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(2),
    borderColor: colors.borderColor,
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    width: SCREEN_WIDTH + moderateScale(5),
  },
  text: {
    fontSize: scale(12),
    color: colors.textColor,
    alignSelf: 'flex-start',
    fontFamily: fonts.Medium,
    textAlign: 'justify',
  },
  Row: {
    borderWidth: moderateScale(1),
    borderRadius: scale(5),
    borderColor: colors.white,
    width: SCREEN_WIDTH - moderateScale(10),
    alignItems: 'center',
    marginVertical: moderateScale(5),
    marginBottom: 0,
    margin: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imagebg: {
    width: moderateScale(92),
    alignItems: 'center',
    borderColor: colors.borderColor,
    backgroundColor: colors.white,
    borderWidth: moderateScale(2),
    margin: moderateScale(2),
    borderRadius: moderateScale(2),

    overflow: 'hidden',
    justifyContent: 'center',
    height: moderateScale(62),
  },
});
