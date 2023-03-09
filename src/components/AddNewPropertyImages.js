import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {} from 'react-native-gesture-handler';
import {moderateScale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SCREEN_WIDTH} from '../constants/scaling';
import colors from '../constants/theme';
import CustomInput from './CustomInput';
import UpLoadComponent from './Uploadcomponent';
const AddNewPropertyImages = ({index, item, setItem, onDelete}) => {
  return (
    <View key={`${index}`} style={styles.mainView}>
      <TouchableOpacity
        onPress={onDelete}
        style={{
          position: 'absolute',
          right: 0,
          backgroundColor: '#0001',
          width: moderateScale(20),
          height: moderateScale(20),
        }}>
        <MaterialCommunityIcons
          name={'delete'}
          size={moderateScale(20)}
          color={'red'}
        />
      </TouchableOpacity>
      <CustomInput
        label={item.name}
        value={item.name}
        onChangeText={text => setItem({...item, name: text})}
      />
      <View
        style={{
          width: SCREEN_WIDTH,
          alignSelf: 'center',
          borderWidth: moderateScale(1),
          borderColor: colors.borderColor,
          borderRadius: moderateScale(5),
        }}>
        {item.floor !== null && (
          <CustomInput
            label={'Floor :'}
            placeholder={null}
            onChangeText={text => setItem({...item, floor: text})}
            value={item.floor}
            containerStyle={styles.containerStyle}
          />
        )}
        <CustomInput
          label={'Walls :'}
          placeholder={null}
          onChangeText={text => setItem({...item, walls: text})}
          value={item.walls}
          containerStyle={styles.containerStyle}
        />
        {item.ceiling !== null && (
          <CustomInput
            label={'Ceiling  :'}
            placeholder={null}
            onChangeText={text => setItem({...item, ceiling: text})}
            value={item.ceiling}
            containerStyle={styles.containerStyle}
          />
        )}
        <CustomInput
          label={'Window :'}
          placeholder={null}
          onChangeText={text => setItem({...item, windows: text})}
          value={item.windows}
          containerStyle={{...styles.containerStyle, borderBottomWidth: 0}}
        />
      </View>
      <CustomInput
        placeholder={'Comments'}
        label={'Comments'}
        onChangeText={text => setItem({...item, description: text})}
        value={item.description}
      />
      <UpLoadComponent
        data={item.images}
        onChangeText={(path, index_local) => {
          let temp_images = item.images;
          temp_images[index_local] = path;
          setItem({
            ...item,
            images: temp_images,
          });
        }}
      />
    </View>
  );
};

export default AddNewPropertyImages;

const styles = StyleSheet.create({
  mainView: {
    marginVertical: moderateScale(20),
    borderColor: colors.primaryColor,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(7),
    width: SCREEN_WIDTH + moderateScale(10),
    padding: moderateScale(10),
    alignSelf: 'center',
    backgroundColor: colors.white,
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH - moderateScale(20),
    alignItems: 'center',
    borderWidth: 0,
    height: 40,
    borderBottomWidth: moderateScale(1),
    borderBottomColor: '#0000000F',
    //height: moderateScale(50),
  },
});
