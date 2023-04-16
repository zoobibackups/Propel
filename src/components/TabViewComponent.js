import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import {API_URL} from '../apis';
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
        {data?.name}
      </Text>
      {data.floor != null && (
        <Text style={styles.text}>
          <Text style={styles.boldText}>
            {data?.name == 'Rear Garden ' ? 'Lawn ' : 'Floor '}:{' '}
          </Text>
          {data?.floor}
        </Text>
      )}
      {data.walls != null && (
        <Text style={styles.text}>
          <Text style={styles.boldText}>Walls : </Text> {data?.walls}
        </Text>
      )}
      {data.ceiling != null && (
        <Text style={styles.text}>
          <Text style={styles.boldText}>
            {data.name == 'Kitchen'
              ? 'Appliances '
              : data.name == 'Rear Garden'
              ? 'Fence '
              : 'Ceiling '}
            :{' '}
          </Text>
          {data?.ceiling}
        </Text>
      )}
      {data.windows != null && (
        <Text style={styles.text}>
          <Text style={styles.boldText}>Windows : </Text>
          {data?.windows}
        </Text>
      )}

      {data.units != null && (
        <Text style={styles.text}>
          <Text style={styles.boldText}>Units : </Text>
          {data?.units}
        </Text>
      )}
      {data.doors != null && data.name == 'Kitchen' && (
        <Text style={styles.text}>
          <Text style={styles.boldText}>Doors : </Text>
          {data?.doors}
        </Text>
      )}
      {data.description != null && (
        <Text style={styles.text}>
          <Text style={styles.boldText}>Other Details : </Text>
          {data?.description}
        </Text>
      )}

      <Text
        style={{...styles.text, marginVertical: 10, fontFamily: fonts.Bold}}>
        Images
      </Text>
      <View style={styles.Row}>
        {data.property_images.map((item, index) => {
          return (
            <TouchableOpacity key={`${index}`} style={styles.imagebg}>
              <Image
                style={{
                  width: '100%',
                  resizeMode: 'cover',
                  borderRadius: moderateScale(5),
                  height: moderateScale(60),
                }}
                source={{uri: `${API_URL}${item.url}`}}
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
    fontSize: scale(11),
    color: colors.textColor,
    alignSelf: 'flex-start',
    fontFamily: fonts.Medium,
    textAlign: 'justify',
  },
  boldText: {
    fontSize: scale(11),
    color: colors.textColor,
    alignSelf: 'flex-start',
    fontFamily: fonts.Bold,
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
    width: '32%',
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
