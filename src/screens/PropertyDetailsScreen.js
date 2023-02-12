import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
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
import {API_URL, DELETE_PROPERTY} from '../apis';
import LOGO from '../assets/svgs/logo.svg';
import DeleteModal from '../components/DeleteModal';
import ImgDateReadingComponent from '../components/ImgDateReadingComponent';
import TabViewComponent from '../components/TabViewComponent';
import fonts from '../constants/fonts';
import {SCREEN_WIDTH, wp} from '../constants/scaling';
import colors from '../constants/theme';
import html_data from '../Data/html';
const PropertyDetailsScreen = ({navigation, route}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  let property_data = route.params.item;
  arrayBufferToBase64 = buffer => {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/png;base64,${binary}`;
  };
  const [active_tab_data, setActiveTabData] = useState(
    property_data.property_details.length > 0
      ? property_data.property_details[0]
      : [],
  );

  const createPDF = async () => {
    let options = {
      html: html_data,
      fileName: `${property_data?.tenant_name}_${moment().unix()}`,
      directory: 'Downloads',
    };

    let file = await RNHTMLtoPDF.convert(options);
    alert(file.filePath);
  };

  const deleteFunction = () => {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };
    fetch(`${DELETE_PROPERTY}/${property_data.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setIsDeleting(false);
        setIsVisible(false);
        Alert.alert('Property Deleted', 'Property Item Successfully', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      })
      .catch(error => {
        console.log(error);
        alert('Error In Deleting Item');
        setIsDeleting(false);
        setIsVisible(false);
      });
  };
  // console.log(`data:image/png;base64,${property_data?.signature_inspector}`);
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
      <Text numberOfLines={4} style={styles.addressText}>
        {property_data?.property_address}
      </Text>
      <Image
        source={{uri: `${API_URL}${property_data?.main_img}`}}
        style={{width: wp(86), height: wp(40), margin: moderateScale(10)}}
      />
      <View style={styles.iconRow}>
        <TouchableOpacity
          style={{paddingHorizontal: moderateScale(20)}}
          onPress={() =>
            navigation.navigate('EditPropertyDetailsScreen', {
              item: property_data,
            })
          }>
          <AntDesign color={'#000'} size={moderateScale(20)} name={'edit'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
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
          <Text style={styles.bluetxt}>Advised Tenant to : </Text>
          <Text style={styles.title}>{property_data?.advised_tenant_to}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bluetxt}>Contractor Instructed : </Text>
          <Text style={styles.title}>
            {property_data?.contractor_instructed}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bluetxt}>Asked landlord To : </Text>
          <Text style={styles.title}>{property_data?.asked_landlord_to}</Text>
        </View>
        <ImgDateReadingComponent
          title={'Gas Meter'}
          date={moment(property_data?.gas_safety_certificate_exp_date).format(
            'DD-MM-yyyy',
          )}
          is_meter={property_data?.gas_meter}
          readging={property_data?.gas_meter_reading}
          img={property_data.gas_meter_img}
        />
        <ImgDateReadingComponent
          title={'Electricity Meter'}
          is_meter={property_data?.electricity_meter}
          readging={property_data?.electricity_meter_reading}
          img={property_data?.electricity_meter_img}
        />

        <ImgDateReadingComponent
          title={'Water Meter'}
          is_meter={property_data?.water_meter}
          readging={property_data?.water_meter_reading}
          img={property_data.water_meter_img}
        />
        <ImgDateReadingComponent
          title={'Smoke Alarm'}
          is_meter={property_data?.smoke_alarm}
          img={property_data?.smoke_alarm_front_img}
          img2={property_data?.smoke_alarm_back_img}
        />
        <ImgDateReadingComponent
          title={'CO Alarm'}
          is_meter={property_data?.co_alarm}
          img={property_data?.co_alarm_front_img}
          img2={property_data?.co_alarm_back_img}
        />
        <ImgDateReadingComponent
          title={'Heating System'}
          is_meter={property_data?.smoke_alarm}
          img={property_data?.heating_system_img}
        />
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
      {active_tab_data && <TabViewComponent data={active_tab_data} />}
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
              uri: `${arrayBufferToBase64(
                property_data?.signature_tenant.data,
              )}`,
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
              uri: `${arrayBufferToBase64(
                property_data?.signature_inspector.data,
              )}`,
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => createPDF()}
        style={styles.exportpdfbutton}>
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
      <DeleteModal
        isVisible={isVisible}
        onCancel={() => setIsVisible(false)}
        onDelete={() => deleteFunction()}
        isDeleting={isDeleting}
      />
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
  addressText: {
    fontFamily: fonts.Bold,
    padding: moderateScale(20),
    color: '#3d3d3d',
    textAlign: 'center',
    fontSize: RFValue(20),
  },
  iconRow: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: moderateScale(20),
  },
  ImageCardView: {
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
  cardView: {
    width: SCREEN_WIDTH + moderateScale(10),
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingVertical: moderateScale(10),
    borderWidth: moderateScale(0),
    borderColor: colors.borderColor,
    elevation: 0,
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: colors.borderColor,
    width: SCREEN_WIDTH + moderateScale(10),
    borderBottomWidth: moderateScale(1),
    paddingVertical: moderateScale(10),
  },
  row2: {
    flexDirection: 'row',
    borderBottomColor: colors.white,
    borderBottomWidth: moderateScale(1),
    paddingVertical: moderateScale(5),
    justifyContent: 'space-between',
    alignItems: 'center',
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
    minWidth: moderateScale(100),
    fontSize: moderateScale(12),
    paddingHorizontal: moderateScale(20),
    height: moderateScale(40),
    marginRight: moderateScale(10),
    backgroundColor: colors.primaryColor,
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  exportpdfbutton: {
    flexDirection: 'row',
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
    borderRadius: moderateScale(5),
    marginBottom: 20,
    width: SCREEN_WIDTH,
  },
});
