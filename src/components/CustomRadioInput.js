import moment from 'moment';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {API_URL, UPLOAD_IMAGE} from '../apis';
import fonts from '../constants/fonts';
import {SCREEN_WIDTH} from '../constants/scaling';
import colors from '../constants/theme';
const CustomRadioInput = ({
  options,
  is_reading = true,
  meter_reading_value,
  onChangeReading,
  label,
  cameraimage = [],
  value,
  onChangeText,
  img1,
  onChangeImg1,
  img2,
  onChangeImg2,
}) => {
  const [uploadingindex, setUploadingIndex] = useState(null);
  const [uploading, setUpLoading] = useState(false);

  const Pickimage = index => {
    setUploadingIndex(index);
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
    })
      .then(image => {
        uploadUImage(image, index);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const Pickfromcamera = index => {
    console.log('Pickfromcamera', index);
    ImagePicker.openCamera({
      width: 800,
      height: 800,
      cropping: true,
    })
      .then(image => {
        uploadUImage(image, index);
      })
      .catch(err => {});
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
        if (index == 0) {
          onChangeImg1(result.path);
        } else {
          onChangeImg2(result.path);
        }
        setUpLoading(false);
        setUploadingIndex(null);
      })
      .catch(error => {
        setUpLoading(false);
        setUploadingIndex(null);
      });
  };
  return (
    <View style={styles.textinputContainer}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.input}>
        {options.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onChangeText(item)}
              key={`${index}`}
              style={{
                ...styles.RadioButton,
                backgroundColor:
                  item == value ? colors.primaryColor : colors.white,
              }}>
              <Text
                style={{
                  color: item == value ? colors.white : colors.textColor,
                  fontSize: moderateScale(12),
                  fontFamily: fonts.Medium,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
        {is_reading && (
          <TextInput
            value={meter_reading_value}
            onChangeText={text => onChangeReading(text)}
            keyboardType={'numeric'}
            style={{
              backgroundColor: colors.primaryColor,
              width: moderateScale(80),
              height: moderateScale(35),
              borderRadius: moderateScale(2),
              paddingHorizontal: moderateScale(5),
              color: colors.white,
            }}
          />
        )}
        {cameraimage.map((item, index) => {
          return (
            <View
              key={`${index}`}
              style={{
                ...styles.RadioButton,
                backgroundColor: colors.white,
                opacity: item == 0 ? 0 : 1,
                paddingHorizontal: moderateScale(10),
              }}>
              {uploading && index == uploadingindex ? (
                <ActivityIndicator />
              ) : index == 0 && img1 !== undefined && img1 !== '' ? (
                <Image
                  style={{
                    borderRadius: moderateScale(5),
                    width: moderateScale(60),
                    height: moderateScale(30),
                  }}
                  source={{uri: `${API_URL}${img1}`}}
                />
              ) : index == 1 && img2 !== undefined && img2 !== '' ? (
                <Image
                  style={{
                    borderRadius: moderateScale(5),
                    width: moderateScale(60),
                    height: moderateScale(30),
                  }}
                  source={{uri: `${API_URL}${img2}`}}
                />
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity onPress={() => Pickfromcamera(index)}>
                    <Entypo
                      name={'camera'}
                      size={moderateScale(17)}
                      color={colors.primaryColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Pickimage(index)}>
                    <FontAwesome
                      name={'photo'}
                      size={moderateScale(17)}
                      color={colors.primaryColor}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default CustomRadioInput;

const styles = StyleSheet.create({
  textinputContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    backgroundColor: '#0000',
    marginTop: moderateScale(5),
    alignSelf: 'center',
    height: verticalScale(70),
  },
  label: {
    marginBottom: moderateScale(5),
    color: colors.textSecondaryColor,
    fontSize: moderateScale(12),
    fontFamily: fonts.Medium,
  },
  input: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    overflow: 'hidden',
    borderColor: colors.borderColor,
    borderRadius: moderateScale(5),
    alignItems: 'center',
    borderWidth: moderateScale(1),
    height: verticalScale(45),
    paddingHorizontal: moderateScale(2),
    fontFamily: fonts.Medium,
    justifyContent: 'space-between',
    color: colors.textColor,
  },
  errorText: {
    color: 'red',
    fontFamily: fonts.Light,
    fontSize: moderateScale(10),
  },
  RadioButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(70),
    height: moderateScale(40),
    borderRadius: moderateScale(5),
    borderColor: colors.borderColor,
    borderWidth: 1,
    backgroundColor: colors.borderColor,
  },
  checkBg: {
    width: scale(18),
    height: scale(18),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
});
