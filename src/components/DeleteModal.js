import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import fonts from '../constants/fonts';
import {SCREEN_WIDTH} from '../constants/scaling';
import colors from '../constants/theme';
const DeleteModal = ({isVisible, onCancel, onDelete}) => {
  return (
    <Modal
      style={styles.ModalView}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      animationInTiming={500}
      backdropOpacity={0.1}
      animationOutTiming={500}
      isVisible={isVisible}
      onBackdropPress={() => onCancel()}>
      <View style={styles.mainView}>
        <Feather name="alert-circle" size={scale(42)} color={'red'} />

        <Text
          style={{fontFamily: fonts.Medium, marginVertical: moderateScale(20)}}>
          Are you sure to delete this property?
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: SCREEN_WIDTH,
          }}>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              onCancel('Cancel');
            }}>
            <Text style={styles.whitetext}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.Button, backgroundColor: 'red'}}
            onPress={() => {
              onDelete();
            }}>
            <Text style={styles.whitetext}>DELETE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  ModalView: {
    justifyContent: 'center',
    margin: 0,
    marginHorizontal: scale(10),
  },
  mainView: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 10,
    padding: verticalScale(16),
    borderRadius: scale(5),
  },
  Button: {
    marginTop: verticalScale(8),
    marginBottom: verticalScale(16),
    borderRadius: scale(5),
    height: verticalScale(40),
    width: SCREEN_WIDTH / 2.5,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primaryColor,
  },
  whitetext: {
    paddingHorizontal: scale(20),
    color: colors.white,
    fontSize: scale(12),
    fontFamily: fonts.Medium,
  },
});
