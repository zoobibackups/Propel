import moment from 'moment';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {RFValue} from 'react-native-responsive-fontsize';
import Share from 'react-native-share';
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
const PropertyDetailsScreen = ({navigation, route}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  let property_data = route.params.item;
  arrayBufferToBase64 = buffer => {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `${binary}`;
  };

  const [active_tab_data, setActiveTabData] = useState(
    property_data.property_details.length > 0
      ? property_data.property_details[0]
      : [],
  );

  const createPDF = async () => {
    setIsCreating(true);
    let html = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Report Title</title>
      </head>
    <style>
      body {
        width: 90%;
        display: block;
        margin: auto;
        background-color: #fff;
        border: 2px solid #0090ff;
        padding: 20px;
        border-radius: 10px;
      }
      .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        /* padding: 40px auto; */
        background-color: #0090ff00;
        padding: 20px;
        border-radius: 10px;
        /* border: 2px solid #0090ff; */
      }
      .logo img {
        max-width: 200px;
        height: auto;
        margin: 0 20px 0 0;
      }
      .user-info {
        margin: 0 0 20px 0;
        margin-top: 20px;
      }
      .top-address {
        font-weight: 600;
        text-align: left;
        padding: 10px 30px;
        background-color:#0090FF;
        font-size: 20px;
        color: #fff;
        border-radius: 0px 0px 0px 0px;
        margin-bottom: 0px;
      }
      .property-img {
        display: block;
        margin: auto;
        width: 100%;
        height: 300px;
        border-radius: 0px 0px 0px 0px;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        margin: 10px 0px;
        table-layout: fixed;
      }
      th,
      td {
        padding: 12px;
        text-align: left;
      }
      thead {
        background-color: #333;
        color: #fff;
      }
      tbody tr:nth-child(even) {
        background-color: #f1f1f1;
      }
    
      tbody tr:hover {
        background-color: #ddd;
      }
      td {
        border: 1px solid #ddd;
      }
      th {
        border: 1px solid #333;
      }
      .parent {
        display: flex;
      }
      .card {
        width: 33%;
        border: 2px solid #eee;
        margin: 10px 5px;
        border-radius: 0px;
        padding: 20px
      }
      .card1 {
        width: 50%;
        border: 2px solid #eee;
        margin: 10px 5px;
        border-radius: 0px;
        padding: 20px
      }
      .card2 {
        /* width: 50%; */
        border: 2px solid #eee;
        margin: 10px 0px;
        border-radius: 0px;
        padding: 20px
      }
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding-bottom: 10px;
        border-bottom: 1px solid #0090ff;
      }
      .gas {
        color: #0090ff;
        font-weight: 600;
      }
      .gas-img img {
        margin-top: 10px;
        border-radius: 10px;
      }
      .gas-img2 {
        display: flex;
        flex-wrap: wrap;
      }
    
      .gas-img2 img {
        margin: 12px;
        border-radius: 10px;
        
      }
    .body{
      display: flex;
      justify-content: flex-end;
    }
      .body .right {
        padding: 10px;
        margin: 10px;
      }
    
    
      .blue {
        color: #0090ff;
        font-weight: 600;
        font-size: 18px;
        padding-right: 10px;
      }
      .blue2 {
        color: #0090ff;
        font-weight: 600;
        font-size: 22px;
        margin-bottom: 0px;
      }
    
      .h1 {
        font-weight: bold;
        font-size: 1.2em;
        background-color: white;
        color: #0090ff;
      }
    
      .signatre {
        width: 100px;
        height: auto;
       
      }
      .blue3{
        color: #0090ff;
        max-width:'35%';
      }
    </style>
    
    <body>
      <header>
        <div class="header-container">
          <div class="logo">
             <img src="https://api.propelinspections.com/inventory/uploads/pdf_logo.png" alt="Logo" /> 
          </div>
        </div>
      </header>
      <section>
        <p class="top-address">${property_data?.types}</p> 
        <p class="top-address">${property_data?.property_address}</p> 
          <img class="property-img" src="${API_URL}${
      property_data?.main_img
    }" alt="property image" />
      </section>
      <section class="top-margin">
        <div>
          <table>
            <tr>
              <td class="blue3">ECIR Expiry Date:</td>
              <td>${moment(property_data?.ecir_exp_date).format(
                'DD-MMM-YYYY',
              )}</td>
              <td class="blue3">Gas Safety Certificate Expiry Date:</td>
              <td>${moment(
                property_data.gas_safety_certificate_exp_date,
              ).format('DD-MM-YYYY')}</td>
              <td class="blue3">Inspection Date:</td>
              <td>${moment(property_data?.inspection_date).format(
                'DD-MMM-YYYY',
              )}</td>
            </tr>
            <tr>
              <td class="blue3">EPC Expiry Date:</td>
              <td>${moment(property_data?.ecp_exp_date).format(
                'DD-MMM-YYYY',
              )}</td>
              <td class="blue3">Tenant Name:</td>
              <td>${property_data?.tenant_name}</td>
              <td class="blue3">Inspector Name:</td>
              <td>${property_data?.inspector_name}</td>
            </tr>
            <tr>
              <td class="blue3">Advised Tenant To:</td>
              <td>${property_data?.advised_tenant_to}</td>
              <td class="blue3">Contractor Instructed:</td>
              <td>${property_data?.contractor_instructed}</td>
              <td class="blue3">Asked Landlord To:</td>
              <td>${property_data?.asked_landlord_to}</td>
            </tr>
          </table>
        </div>
      </section>
      <section class="top-margin" id="cards">
        <div class="parent">
          <div class="card">
            <div class="card-header">
              <div class="col-1"> 
                <span class="gas">Gas Meter:</span> 
                <span class="gas">Yes</span> 
              </div>
              <div class="col-1"> 
                <span class="gas">Reading:</span> 
                <span class="gas">${property_data.gas_meter_reading}</span> 
              </div>
              </div>
            <div class="gas-img">
             <img src="${API_URL}${
      property_data?.gas_meter_img
    }" width="100%" height="auto" />
              </div>
          </div>
          <div class="card">
            <div class="card-header">
              <div class="col-1"> 
                <span class="gas">Electricity Meter:</span> 
                <span class="gas">${property_data.electricity_meter}</span>
              </div>
              <div class="col-1"> 
                <span class="gas">Reading:</span> 
                <span class="gas">${
                  property_data.electricity_meter_reading
                }</span>
              </div>
            </div>
            <div class="gas-img"> 
              <img src="${API_URL}${
      property_data?.electricity_meter_img
    }" width="100%" height="auto" /> 
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <div class="col-1"> 
                <span class="gas">Water Meter:</span>
                  <span class="gas">${property_data.water_meter}</span> 
              </div>
              <div class="col-1"> 
              <span class="gas">Reading:</span> 
              <span class="gas">${
                property_data.water_meter_reading
              }</span> </div>
            </div>
            <div class="gas-img"> <img src="${API_URL}${
      property_data?.water_meter_img
    }" width="100%" height="auto"> </div>
          </div>
          <div class="card">
            <div class="card-header">
              <div class="col-1"> <span class="gas">Heating System:</span> <span class="gas"></span> </div>
              <div class="col-1"> <span class="gas">Reading:</span> <span class="gas">Yes</span> </div>
            </div>
            <div class="gas-img">
             <img src="${API_URL}${
      property_data?.heating_system_img
    }" width="100%" height="auto" /> </div>
          </div>
        </div>
      </section>
      <section class="top-margin">
        <div class="parent">
          <div class="card1">
            <div class="card-header">
              <div class="col-1"> <span class="gas">Smoke Alarm:</span> <span class="gas">${
                property_data.smoke_alarm
              }</span> </div>
            </div>
            <div class="gas-img2"> 
                <img src="${API_URL}${
      property_data?.smoke_alarm_front_img
    }" width="45%" height="auto"> 
              <img src="${API_URL}${property_data?.smoke_alarm_back_img}"
                width="45%" height="auto"> </div>
          </div>
          <div class="card1">
            <div class="card-header">
              <div class="col-1"> <span class="gas">CO Alarm:</span> <span class="gas">${
                property_data.co_alarm
              }</span> </div>
            </div>
            <div class="gas-img2"> 
              <img src="${API_URL}${
      property_data?.co_alarm_front_img
    }" width="45%" height="auto"> 
              <img src="${API_URL}${property_data?.co_alarm_back_img}"
                width="45%" height="auto"> </div>
          </div>
        </div>
      </section>
      <section class="top-margin">
       ${property_data?.property_details.map((item, index) => {
         return `<div class="card2">
        <div class="card-header">
          <div class="col-1"> <span class="blue2">${item.name} Details </span>
            <p class="room-para">${item.floor}</p>
            <p class="room-para">${item.walls}</p>
            <p class="room-para">${item.ceiling}</p>
            <p class="room-para">${item.windows}</p>
            <p class="room-para">${item.description}</p>
          </div>
        </div>
        <div class="gas-img2"> 
        ${item.property_images.map((img, index) => {
          return `<img src="${API_URL}${img?.url}" width="30.5%" height="auto" />`;
        })}
        </div>
      </div>`;
       })} 
         
      </section>`.replace(/,/g, '');
    let html2 = ` <section>
       <div class="body">
         <div class="right" style="background-color: #fff">
           <h1 class="h1">
             Tenant Name
           </h1>
           <h4>${property_data.tenant_name}</h4> <img class="signatre"
             src="${arrayBufferToBase64(
               property_data?.signature_inspector.data,
             )}"
             alt="" />
         </div>
         <div class="right" style="background-color: #fff"></div>
         <div class="right" style="background-color: #fff">
           <h1 class="h1">
             Inspector Name
           </h1>
           <h4>${property_data.inspector_name}</h4> <img class="signatre"
             src="${arrayBufferToBase64(
               property_data?.signature_inspector.data,
             )}"
             alt="" />
         </div>
       </div>
     </section>
   </body>
   
   </html>`;
    let options = {
      html: `${html}${html2}`,
      fileName: `${property_data?.tenant_name}_${moment().unix()}.pdf`,
      directory: 'Downloads',
      height: 2700,
      width: 1200,
    };

    let file = await RNHTMLtoPDF.convert(options);
    loadAndSharePDF(file.filePath);
    setIsCreating(false);
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
  async function loadAndSharePDF(filePath) {
    if (Platform.OS == 'android') {
      const options = {
        type: 'application/pdf',
        url: `file:///${filePath}`,
      };
      try {
        const result = await Share.open(options);
      } catch (error) {
        console.log(error);
      }
      Share.open(options)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    } else {
      const options = {
        type: 'application/pdf',
        url: filePath,
      };
      try {
        const result = await Share.open(options);
      } catch (error) {
        console.log(error);
      }
      Share.open(options)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
      style={{flex: 1, backgroundColor: colors.white}}>
      <Text style={styles.addressText}>{property_data?.types}</Text>
      <Text numberOfLines={4} style={styles.addressText}>
        {property_data?.property_address}
      </Text>

      <View
        style={{
          width: wp(92),
          height: wp(50),
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          borderRadius: moderateScale(5),
          borderColor: '#eee',
          margin: moderateScale(8),
        }}>
        <Image
          source={{uri: `${API_URL}${property_data?.main_img}`}}
          style={{
            width: wp(90),
            borderRadius: moderateScale(5),
            height: wp(48),
          }}
        />
      </View>
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
            {moment(property_data?.inspection_date).format('DD-MMM-YYYY')}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bluetxt}>ECP Date : </Text>
          <Text style={styles.title}>
            {moment(property_data?.ecp_exp_date).format('DD-MMM-YYYY')}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.bluetxt}>ECIR Date : </Text>
          <Text style={styles.title}>
            {moment(property_data?.ecir_exp_date).format('DD-MMM-YYYY')}
          </Text>
        </View>

        <View style={styles.row}>
          <Text numberOfLines={2} style={styles.bluetxt}>
            Gas Safety Certificate Expiry Date :{' '}
          </Text>
          <Text style={styles.title}>
            {moment(property_data?.gas_safety_certificate_exp_date).format(
              'DD-MMM-YYYY',
            )}
          </Text>
        </View>
        <ImgDateReadingComponent
          title={'Pre-Paid Gas Meter'}
          date={moment(property_data?.gas_safety_certificate_exp_date).format(
            'DD-MMM-YYYY',
          )}
          is_meter={property_data?.gas_meter}
          readging={property_data?.gas_meter_reading}
          img={property_data.gas_meter_img}
        />
        <ImgDateReadingComponent
          title={'Pre-Paid Electricity Meter'}
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
          title={'Heating System Working'}
          is_meter={property_data?.smoke_alarm}
          img={property_data?.heating_system_img}
        />
      </View>
      <FlatList
        horizontal={true}
        data={property_data.property_details}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        style={{margin: moderateScale(15)}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => setActiveTabData(item)}
              style={styles.tabView}>
              <Text style={{fontFamily: fonts.Bold, color: colors.white}}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      {active_tab_data && <TabViewComponent data={active_tab_data} />}
      <View style={styles.row}>
        <Text style={styles.bluetxt}>Advised Tenant to : </Text>
        <Text style={styles.title}>{property_data?.advised_tenant_to}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.bluetxt}>Contractor Instructed : </Text>
        <Text style={styles.title}>{property_data?.contractor_instructed}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.bluetxt}>Asked landlord To : </Text>
        <Text style={styles.title}>{property_data?.asked_landlord_to}</Text>
      </View>
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

      {isCreating ? (
        <TouchableOpacity disabled={true} style={styles.exportpdfbutton}>
          <ActivityIndicator color={'#fff'} size={'small'} />
          <Text
            style={{
              fontFamily: fonts.Medium,
              fontSize: RFValue(14),
              color: colors.white,
              marginLeft: moderateScale(10),
            }}>
            Generating Report
          </Text>
        </TouchableOpacity>
      ) : (
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
      )}
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
    padding: moderateScale(10),
    color: '#3d3d3d',
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: RFValue(14),
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
    maxWidth: moderateScale(150),
    minWidth: moderateScale(150),
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
