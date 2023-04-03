import moment from 'moment';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {moderateScale, scale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {API_URL, UPLOAD_IMAGE} from '../apis';
import fonts from '../constants/fonts';
import {SCREEN_WIDTH} from '../constants/scaling';
import colors from '../constants/theme';
const MainImgComponent = ({url, onChangeText}) => {
  const [uploading, setUpLoading] = useState(false);
  const [img, setImg] = useState(url);

  const Pickimage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(image => {
        uploadUImage(image);
      })
      .catch(err => {});
  };
  const Pickfromcamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(image => {
        uploadUImage(image);
      })
      .catch(err => {});
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
        setImg(`${API_URL}${result.path}`);
        onChangeText(result.path);
        setUpLoading(false);
      })
      .catch(error => {
        setUpLoading(false);
      });
  };
  return (
    <View style={styles.mainView}>
      <Text style={styles.text}>Property Main Picture</Text>
      <View style={styles.Row}>
        <View onPress={() => Pickimage()} style={styles.imagebg}>
          {uploading ? (
            <ActivityIndicator color={colors.white} size={'small'} />
          ) : img ? (
            <View>
              <Image
                style={{
                  width: moderateScale(200),
                  resizeMode: 'cover',
                  borderRadius: moderateScale(5),
                  height: moderateScale(100),
                }}
                source={{uri: img}}
                color={colors.primaryColor}
              />
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Delete Image',
                    'Are you sure to Delete this Image',
                    [
                      {
                        text: 'OK',
                        onPress: () => setImg(null),
                      },
                      {
                        text: 'Cancel',
                      },
                    ],
                  )
                }
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  padding: 10,
                }}>
                <MaterialCommunityIcons
                  name={'delete'}
                  color={'red'}
                  size={moderateScale(20)}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                width: moderateScale(80),
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => Pickfromcamera()}>
                <Entypo
                  name={'camera'}
                  size={moderateScale(27)}
                  color={colors.primaryColor}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Pickimage()}>
                <FontAwesome
                  name={'photo'}
                  size={moderateScale(27)}
                  color={colors.primaryColor}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default MainImgComponent;

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

    width: SCREEN_WIDTH,
    alignItems: 'center',
    marginBottom: 0,
    justifyContent: 'center',
  },
  imagebg: {
    width: moderateScale(200),
    alignItems: 'center',
    borderColor: colors.borderColor,
    backgroundColor: colors.white,
    borderWidth: moderateScale(2),
    margin: moderateScale(2),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    justifyContent: 'center',
    height: moderateScale(100),
  },
});
