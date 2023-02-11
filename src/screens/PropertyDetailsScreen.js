import moment from 'moment';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {RFValue} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LOGO from '../assets/svgs/logo.svg';
import TabViewComponent from '../components/TabViewComponent';
import fonts from '../constants/fonts';
import {SCREEN_WIDTH} from '../constants/scaling';
import colors from '../constants/theme';
import html_data from '../Data/html';
const PropertyDetailsScreen = ({navigation, route}) => {
  let property_data = route.params.item;
  const [active_tab_data, setActiveTabData] = useState(
    property_data.property_details[0],
  );
  const createPDF = async () => {
    let options = {
      html: html_data,
      fileName: `${property_data?.tenant}_${moment().unix()}`,
      directory: 'Downloads',
    };

    let file = await RNHTMLtoPDF.convert(options);
    alert(file.filePath);
  };
  return (
    <ScrollView
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
      style={{flex: 1, backgroundColor: colors.white}}>
      <View>
        <LOGO
          width={moderateScale(300)}
          style={{marginVertical: moderateScale(20)}}
          heigth={moderateScale(300)}
        />
      </View>
      <Text
        numberOfLines={4}
        style={{
          ...styles.title,
          fontFamily: fonts.Black,
          padding: moderateScale(20),
          color: '#3d3d3d',
          textAlign: 'center',
          fontSize: RFValue(20),
        }}>
        {property_data?.property_address}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          justifyContent: 'flex-end',
          marginRight: moderateScale(20),
        }}>
        <TouchableOpacity
          style={{paddingHorizontal: moderateScale(20)}}
          onPress={() =>
            navigation.navigate('EditPropertyDetailsScreen', {
              item: property_data,
            })
          }>
          <AntDesign color={'#000'} size={moderateScale(20)} name={'edit'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            color={'#8a2016'}
            size={moderateScale(20)}
            name={'delete'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardView}>
        <View style={styles.row}>
          <Text style={styles.bluetxt}>Inspection Date: </Text>
          <Text style={styles.title}>
            {moment(property_data?.inspection_date).format('DD-MM-yyyy')}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bluetxt}>ECP Date : </Text>
          <Text style={styles.title}>
            {moment(property_data?.ecp_exp_date).format('DD-MM-yyyy')}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bluetxt}>ECIR Date : </Text>
          <Text style={styles.title}>
            {moment(property_data?.ecir_exp_date).format('DD-MM-yyyy')}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bluetxt}>Gas Exp Date : </Text>
          <Text style={styles.title}>
            {moment(property_data?.gas_safety_certificate_exp_date).format(
              'DD-MM-yyyy',
            )}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bluetxt}>Gas Meter : </Text>
          <Text style={styles.title}>{property_data?.gas_meter}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bluetxt}>Gas Meter Reading : </Text>
          <Text style={styles.title}>
            {property_data?.gas_meter_reading} Units
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bluetxt}>Electricity Meter : </Text>
          <Text style={styles.title}>{property_data?.electricity_meter}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bluetxt}>Electricity Meter Reading : </Text>
          <Text style={styles.title}>
            {property_data?.electricity_meter_reading} Units
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bluetxt}>Smoke Alarm : </Text>
          <Text style={styles.title}>{property_data?.smoke_alarm}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bluetxt}>CO Alarm : </Text>
          <Text style={styles.title}>{property_data?.co_alarm}</Text>
        </View>
      </View>
      <FlatList
        horizontal={true}
        data={property_data?.property_details}
        showsHorizontalScrollIndicator={false}
        style={{flex: 1, margin: moderateScale(15)}}
        contentContainerStyle={{flex: 1, justifyContent: 'flex-start'}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => setActiveTabData(item)}
              style={styles.tabView}>
              <Text style={{fontFamily: fonts.Bold, color: colors.white}}>
                {item.name}{' '}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <TabViewComponent data={active_tab_data} />
      <View
        style={{
          ...styles.row,
          width: SCREEN_WIDTH,
          justifyContent: 'space-between',
        }}>
        <View style={{padding: moderateScale(10)}}>
          <Text style={styles.bluetxt}>Tenant : </Text>
          <Text style={styles.title}>{property_data?.tenant_name}</Text>
          <Image
            style={{
              width: moderateScale(100),
              resizeMode: 'center',
              height: moderateScale(100),
            }}
            source={{
              uri: 'https://www.mockofun.com/wp-content/uploads/2021/05/create-transparent-signature-online-38976.jpg',
            }}
          />
        </View>
        <View style={{padding: moderateScale(10)}}>
          <Text style={styles.bluetxt}>Inspector : </Text>
          <Text style={styles.title}>{property_data?.inspector_name}</Text>
          <Image
            style={{
              width: moderateScale(100),
              resizeMode: 'center',
              height: moderateScale(100),
            }}
            source={{
              uri: 'https://www.mockofun.com/wp-content/uploads/2021/05/create-transparent-signature-online-38976.jpg',
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => createPDF()}
        style={{
          flexDirection: 'row',
          height: moderateScale(50),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.primaryColor,
          borderRadius: moderateScale(5),
          marginBottom: 20,
          width: SCREEN_WIDTH,
        }}>
        <AntDesign
          name="pdffile1"
          color={colors.white}
          size={moderateScale(14)}
        />
        <Text
          style={{
            fontFamily: fonts.Medium,
            fontSize: RFValue(14),
            color: colors.white,
            marginLeft: moderateScale(10),
          }}>
          Export Pdf
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PropertyDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: moderateScale(10),
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  cardView: {
    width: SCREEN_WIDTH + moderateScale(10),
    borderRadius: moderateScale(10),
    margin: moderateScale(10),
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: colors.borderColor,
    elevation: 0,
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: colors.borderColor,
    borderBottomWidth: moderateScale(1),
    paddingVertical: moderateScale(3),
  },
  bluetxt: {
    fontFamily: fonts.Bold,
    minWidth: moderateScale(180),
    color: colors.primaryColor,
    fontSize: moderateScale(12),
  },
  title: {
    fontFamily: fonts.Bold,
    color: colors.textColor,
    flex: 1,
    flexWrap: 'wrap',
    fontSize: moderateScale(12),
  },
  tabView: {
    width: moderateScale(100),
    fontSize: moderateScale(12),
    height: moderateScale(40),
    marginRight: moderateScale(10),
    backgroundColor: colors.primaryColor,
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
