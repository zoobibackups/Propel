import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {SCREEN_WIDTH} from '../constants/scaling';
import colors from '../constants/theme';
import CustomInput from './CustomInput';
import EditUploadComponent from './EditUploadComponent';
const EditPropertyImages = ({index, item, setItem}) => {
  return (
    <View key={`${index}`} style={styles.mainView}>
      <CustomInput
        label={item.name}
        value={item.name}
        onChangeText={text => setItem({...item, name: text})}
      />
      <CustomInput
        label={'Floor Details'}
        placeholder={'Floor Details'}
        onChangeText={text => setItem({...item, floor: text})}
        value={item.floor}
      />
      <CustomInput
        label={'Walls Details'}
        placeholder={'Walls Details'}
        onChangeText={text => setItem({...item, walls: text})}
        value={item.walls}
      />
      <CustomInput
        label={'Ceiling Details'}
        placeholder={'Ceiling  Details'}
        onChangeText={text => setItem({...item, ceiling: text})}
        value={item.ceiling}
      />
      <CustomInput
        label={'Windows Details'}
        placeholder={'Windows Details'}
        onChangeText={text => setItem({...item, windows: text})}
        value={item.windows}
      />
      <CustomInput
        label={'Enter Comments'}
        placeholder={'Comments'}
        onChangeText={text => setItem({...item, description: text})}
        value={item.description}
      />
      <EditUploadComponent
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

export default EditPropertyImages;

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
