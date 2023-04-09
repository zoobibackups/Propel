import {DrawerContentScrollView} from '@react-navigation/drawer';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import fonts from '../constants/fonts';
import {hp, moderateScale} from '../constants/scaling';
import colors from '../constants/theme';
const CustomDrawer = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0A80EA'}}>
      <View style={styles.drawercontent}></View>
      <DrawerContentScrollView
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.DrawerContentScrollView}>
        <TouchableOpacity
          style={styles.btnView}
          onPress={() => navigation.navigate(item.route)}>
          <View
            style={{
              width: wp(6),
              height: wp(6),
            }}>
            <MaterialIcons
              size={wp(6)}
              color={colors.primaryColor}
              name={'security'}
            />
          </View>
          <Text style={styles.textStyle}>Reset Password</Text>
          <Entypo
            size={wp(6)}
            style={{position: 'absolute', right: wp(3)}}
            name={'chevron-small-right'}
            color={'//#endregion0002'}
          />
        </TouchableOpacity>
      </DrawerContentScrollView>
      <TouchableOpacity style={{...styles.btnView, backgroundColor: '#ffff'}}>
        <View
          style={{
            width: wp(6),
            height: wp(6),
          }}>
          <AntDesign
            name={'logout'}
            color={'#0A80EA'}
            size={moderateScale(20)}
          />
        </View>
        <Text style={styles.textStyle}>Logout</Text>
        <Entypo
          size={wp(6)}
          style={{position: 'absolute', right: wp(3)}}
          name={'chevron-small-right'}
          color={'#0002'}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default CustomDrawer;

const styles = StyleSheet.create({
  DrawerContentScrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainerStyle: {
    alignItems: 'flex-start',
    paddingTop: 0,
    marginStart: 0,
    justifyContent: 'flex-start',
  },
  drawercontent: {
    padding: wp(1),
    width: '100%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: wp(5),
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
  },
  btnView: {
    paddingLeft: wp(5),
    height: hp(7),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#0001',
    width: '100%',
    alignItems: 'center',
  },
  textStyle: {
    marginLeft: wp(8),
    fontSize: RFValue(14),
    fontFamily: fonts.Medium,
    includeFontPadding: false,
    color: colors.textColor,
  },
});
