import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {SCREEN_WIDTH} from '../constants/scaling';
import colors from '../constants/theme';
import CustomInput from './CustomInput';
import UpLoadComponent from './Uploadcomponent';
const AddNewPropertyImages = ({index, item, setItem}) => {
  return (
    <View key={`${index}`} style={styles.mainView}>
      <CustomInput
        label={item.name}
        value={item.name}
        onChangeText={text => setItem({...item, name: text})}
      />
      <CustomInput
        label={'Enter Details'}
        onChangeText={text => setItem({...item, description: text})}
        value={item.description}
      />
      <UpLoadComponent
        data={item.images}
        onChangeText={(path, index) => {
          let temp_images = item.images;
          temp_images[index] = path;
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
});
