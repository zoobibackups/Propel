import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import SignatureCapture from 'react-native-signature-capture';
import {moderateScale, scale} from 'react-native-size-matters';
import fonts from '../constants/fonts';
import {SCREEN_WIDTH, wp} from '../constants/scaling';
import colors from '../constants/theme';
const SignatureComponent = ({title, onChangeText}) => {
  let signRef = SignatureCapture;
  const [isModal, setIsModal] = useState(false);
  const [image, setImage] = useState(null);
  const onDragEvent = () => {};

  const onSaveEvent = base64DataUrl => {
    onChangeText(`data:image/png;base64,${base64DataUrl.encoded}`);
    setImage(`data:image/png;base64,${base64DataUrl.encoded}`);
    setIsModal(false);
  };

  const saveSign = () => {
    signRef?.saveImage();
  };
  const resetSign = () => {
    signRef?.resetImage();
  };
  return (
    <View style={styles.mainView}>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity onPress={() => setIsModal(true)} style={styles.button}>
        {image !== null && (
          <Image
            style={{
              width: moderateScale(50),
              alignSelf: 'center',
              height: moderateScale(50),
            }}
            source={{uri: image}}
          />
        )}
      </TouchableOpacity>
      <Modal
        isVisible={isModal}
        backdropOpacity={0}
        style={styles.modal}
        onBackdropPress={() => setIsModal(false)}
        onBackButtonPress={() => setIsModal(false)}>
        <View style={styles.padBg}>
          <SignatureCapture
            style={{
              flex: 1,
              width: SCREEN_WIDTH - moderateScale(10),
              alignSelf: 'center',
            }}
            // ref={signRef}
            ref={sign => (signRef = sign)}
            onSaveEvent={onSaveEvent}
            onDragEvent={onDragEvent}
            saveImageFileInExtStorage={false}
            showNativeButtons={false}
            showTitleLabel={false}
            backgroundColor="#ffffff"
            strokeColor="#000000"
            minStrokeWidth={4}
            maxStrokeWidth={4}
            viewMode={'portrait'}
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                saveSign();
              }}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                resetSign();
              }}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default SignatureComponent;

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
  button: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    backgroundColor: '#0000',
    marginTop: moderateScale(5),
    alignSelf: 'center',
    borderColor: colors.borderColor,
    borderRadius: moderateScale(5),
    paddingVertical: 0,
    borderWidth: moderateScale(1),
    height: moderateScale(70),
  },
  modal: {
    margin: 0,
    padding: 0,
    width: wp(100),
    backgroundColor: '#0000',
    justifyContent: 'flex-end',
  },
  padBg: {
    height: moderateScale(300),
    width: wp(100),
    overflow: 'hidden',
    borderTopLeftRadius: moderateScale(15),
    borderTopRightRadius: moderateScale(15),
    backgroundColor: '#0090FF',
    elevation: 10,
    padding: 10,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(40),
    backgroundColor: '#eeeeee',
    margin: 10,
  },
  buttonText: {
    fontSize: scale(12),
    color: colors.textColor,
    fontFamily: fonts.Medium,
  },
});
