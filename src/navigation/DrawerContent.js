import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../apis';
import fonts from '../constants/fonts';
import { hp, moderateScale } from '../constants/scaling';
import colors from '../constants/theme';
import { userLogOut } from '../store/actions/userActions';
const CustomDrawer = ({navigation}) => {
  const {user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch()
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0A80EA'}}>
      <View style={styles.drawercontent}>
        <Image
          source={{uri:`${API_URL}${user.company_logo}`}} 
          style={{width:wp(40),resizeMode:"contain", height:wp(40 )}} 
        />
         <Text style={styles.textStyle2}>{user.company_name}</Text>
         <Text style={styles.textStyle2}>{user.company_email}</Text>
      </View>
      <DrawerContentScrollView
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.DrawerContentScrollView}>
        <TouchableOpacity
          style={styles.btnView}
          onPress={() => navigation.navigate("ResetPasswordScreen")}>
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
      <TouchableOpacity onPress={() => dispatch(userLogOut(null)) } 
        style={{...styles.btnView, backgroundColor: '#ffff'}}>
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
  textStyle2: {
    marginLeft: wp(8),
    fontSize: RFValue(12),
    fontFamily: fonts.Bold,
    includeFontPadding: false,
    color: colors.white,
  },
});
