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
const MainImgComponent = ({url, onChangeText}) => {
  const [uploading, setUpLoading] = useState(false);
  const [img, setImg] = useState(url);

  const Pickimage = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    })
      .then(image => {
        uploadUImage(image);
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
        setImg(`https://api.propelinspections.com/${result.path}`);
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
        <TouchableOpacity onPress={() => Pickimage()} style={styles.imagebg}>
          {uploading ? (
            <ActivityIndicator />
          ) : (
            <Image
              style={{
                width: moderateScale(90),
                resizeMode: 'cover',
                borderRadius: moderateScale(5),
                height: moderateScale(60),
              }}
              source={{uri: img}}
              color={colors.primaryColor}
            />
          )}
        </TouchableOpacity>
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
