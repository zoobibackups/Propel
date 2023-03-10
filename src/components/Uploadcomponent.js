import moment from 'moment';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {moderateScale, scale} from 'react-native-size-matters';
import {UPLOAD_IMAGE} from '../apis';
import fonts from '../constants/fonts';
import {SCREEN_WIDTH} from '../constants/scaling';
import colors from '../constants/theme';
const UpLoadComponent = ({data, onChangeText}) => {
  const [uploadingindex, setUploadingIndex] = useState(null);
  const [uploading, setUpLoading] = useState(false);
  const [images, setImages] = useState([
    {
      id: 1,
      path: 'https://via.placeholder.com/640x360',
      ext: '',
      name: '',
    },
    {
      id: 2,
      path: 'https://via.placeholder.com/640x360',
      ext: '',
      name: '',
    },
    {
      id: 3,
      path: 'https://via.placeholder.com/640x360',
      ext: '',
      name: '',
    },
  ]);
  const Pickimage = index => {
    setUploadingIndex(index);

    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    })
      .then(image => {
        let temp_images = [...images];
        uploadUImage(image);
        temp_images[index].path = image.path;
        temp_images[index].name = image.path.split('/').pop();
        temp_images[index].ext = image.mime;
        setImages(temp_images);
        onChangeText(image.path, index);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const uploadUImage = image => {
    setUpLoading(true);
    let name = image.path.split('/').pop();
    var formdata = new FormData();
    formdata.append('file', {
      uri: `${image.path}`,
      name: `${moment().unix()}_.${name}`,
      type: `${image.mime}`,
    });

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(UPLOAD_IMAGE, requestOptions)
      .then(response => response.json())
      .then(result => {
        setUpLoading(false);
        setUploadingIndex(null);
      })
      .catch(error => {
        console.log('error', error);
        setUpLoading(false);
        setUploadingIndex(null);
      });
  };
  return (
    <View style={styles.mainView}>
      <Text style={styles.text}>Upload Images</Text>
      <View style={styles.Row}>
        {images.map((item, index) => {
          return (
            <TouchableOpacity
              key={`${index}`}
              onPress={() => Pickimage(index)}
              style={styles.imagebg}>
              {uploading && index == uploadingindex ? (
                <ActivityIndicator />
              ) : (
                <Image
                  style={{
                    width: moderateScale(90),
                    resizeMode: 'cover',
                    borderRadius: moderateScale(5),
                    height: moderateScale(60),
                  }}
                  source={{uri: item.path}}
                  color={colors.primaryColor}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default UpLoadComponent;

const styles = StyleSheet.create({
  mainView: {
    alignSelf: 'center',
    marginVertical: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scale(10),
    width: SCREEN_WIDTH,
  },
  text: {
    fontSize: scale(12),
    color: colors.textColor,
    alignSelf: 'flex-start',
    fontFamily: fonts.Medium,
    textAlign: 'left',
  },
  Row: {
    borderWidth: moderateScale(1),
    borderRadius: scale(5),
    borderColor: colors.white,
    paddingHorizontal: moderateScale(10),
    width: SCREEN_WIDTH,
    alignItems: 'center',
    margin: moderateScale(10),
    marginBottom: 0,
    flexDirection: 'row',
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
