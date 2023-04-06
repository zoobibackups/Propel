import moment from 'moment';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
  PERMISSIONS,
  RESULTS,
  check,
  request,
  requestMultiple,
} from 'react-native-permissions';
import {moderateScale, scale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
      path: null,
      ext: '',
      name: '',
    },
    {
      id: 2,
      path: null,
      ext: '',
      name: '',
    },
    {
      id: 3,
      path: null,
      ext: '',
      name: '',
    },
    {
      id: 4,
      path: null,
      ext: '',
      name: '',
    },
    {
      id: 5,
      path: null,
      ext: '',
      name: '',
    },
    {
      id: 6,
      path: null,
      ext: '',
      name: '',
    },
    {
      id: 7,
      path: null,
      ext: '',
      name: '',
    },
    {
      id: 8,
      path: null,
      ext: '',
      name: '',
    },
    {
      id: 9,
      path: null,
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
        uploadUImage(image, index);
        temp_images[index].path = image.path;
        temp_images[index].name = image.path.split('/').pop();
        temp_images[index].ext = image.mime;
        setImages(temp_images);
      })
      .catch(err => {});
  };
  const Pickfromcamera = index => {
    console.log('PickfromcameraPickfromcamera');
    if (Platform.OS == 'android') {
      requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      ])
        .then(status => {
          console.log(status);
          if (status['android.permission.CAMERA'] == 'granted') {
            ImagePicker.openCamera({
              width: 400,
              height: 400,
              cropping: true,
            })
              .then(image => {
                let temp_images = [...images];
                uploadUImage(image, index);
                temp_images[index].path = image.path;
                temp_images[index].name = image.path.split('/').pop();
                temp_images[index].ext = image.mime;
                setImages(temp_images);
              })
              .catch(err => {
                console.log(err, 'ERROR');
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      request(PERMISSIONS.IOS.CAMERA).then(status => {
        console.log(status);
        if (status == 'granted') {
          ImagePicker.openCamera({
            width: 400,
            height: 400,
            cropping: true,
          })
            .then(image => {
              let temp_images = [...images];
              uploadUImage(image, index);
              temp_images[index].path = image.path;
              temp_images[index].name = image.path.split('/').pop();
              temp_images[index].ext = image.mime;
              setImages(temp_images);
            })
            .catch(err => {});
        }
      });
    }
  };

  const uploadUImage = (image, index) => {
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
        onChangeText(`${result.path}`, index);
      })
      .catch(error => {
        setUpLoading(false);
        setUploadingIndex(null);
      });
  };

  const deleteImage = index => {
    let temp = [...images];
    temp[index] = {
      id: 1,
      path: null,
      ext: '',
      name: '',
    };
    setImages(temp);
  };
  return (
    <View style={styles.mainView}>
      <Text style={styles.text}>Upload Images</Text>
      <View style={styles.Row}>
        {images.map((item, index) => {
          return (
            <View key={`${index}`} style={styles.imagebg}>
              {uploading && index == uploadingindex ? (
                <ActivityIndicator />
              ) : item.path == null ? (
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    width: moderateScale(92),
                    padding: moderateScale(10),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity onPress={() => Pickfromcamera(index)}>
                    <Entypo
                      name={'camera'}
                      size={moderateScale(25)}
                      color={colors.primaryColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Pickimage(index)}>
                    <FontAwesome
                      name={'photo'}
                      size={moderateScale(25)}
                      color={colors.primaryColor}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      'Delele Image',
                      'Are you sure to delete image?',
                      [
                        {
                          text: 'OK',
                          onPress: () => deleteImage(index),
                        },
                        {
                          text: 'Cancel',
                        },
                      ],
                    )
                  }>
                  <View style={styles.iconView}>
                    <MaterialCommunityIcons
                      name={'delete'}
                      color={'red'}
                      size={moderateScale(20)}
                    />
                  </View>
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
                </TouchableOpacity>
              )}
            </View>
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

    flexWrap: 'wrap',
  },
  imagebg: {
    width: moderateScale(92),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.borderColor,
    backgroundColor: colors.white,
    borderWidth: moderateScale(2),
    margin: moderateScale(2),
    borderRadius: moderateScale(2),
    overflow: 'hidden',
    justifyContent: 'center',
    height: moderateScale(62),
  },
  iconView: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(92),
    height: moderateScale(62),
  },
});
