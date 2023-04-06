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
import {useSelector} from 'react-redux';
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
  const {user} = useSelector(state => state.userReducer);
  console.log(user);
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
    let html = `<!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Inventory & Inspection</title>
    </head>
    <style>
        body {
            padding: 40px 0px;
            width: 90%;
            display: block;
            margin: auto;
            font-family: Arial, sans-serif;
        }
        .container {
            display: block;
            margin: auto;
        }
    
        .perei {
            display: block;
            margin: auto;
        }
        h3 {
            font-size: 22px;
            color: #000;
            margin: 10px 0px;
        }
        .questions {
            margin: 15px 0px;
            border: 2px solid #eee;
            padding: 10px 20px;
        }
        .questions h4 {
            font-size: 18px;
            color: #000;
            margin: 10px 0px;
        }
        p {
            margin: 0;
            font-size: 16px;
        }
        .header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            border-radius: 10px;
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
        @media (max-width: 600px) {
            .header-container {
                flex-direction: column;
                align-items: center;
            }
            .logo {
                margin: 20px 0;
            }
            .user-info {
                margin: 0;
                text-align: center;
            }
        }
        .top-address {
            font-weight: 600;
            text-align: center;
            padding: 10px 0px;
            background-color: #0090ff;
            font-size: 20px;
            color: #fff;
            border-radius: 10px 10px 0px 0px;
            margin-bottom: 0px;
        }
        .bg-blue {
            background-color: #0a80ea;
            padding: 10px;
            margin: auto;
            color: #fff;
            font-weight: 600;
            text-align: center;
            width: 70%;
            display: block;
            margin: auto;
            border: 2px solid #013664;
            text-transform: uppercase;
            /* display: flex; */
            border-radius: 10px;
        }
        .propertyAddress {
            font-weight: 600;
            margin: 15px 0px;
            color: #000;
            text-align: center;
        }
        .propertyimg img {
            display: block;
            margin: auto;
            height: 400px;
            box-shadow: 1px 1px 19px 0px #b7b3b3;
            border-radius: 10px;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            max-width: "100%";
            margin: 0 auto;
            table-layout: fixed;
            margin-top: 20px;
        }
        th,
        td {
            text-align: left;
            padding: 8px;
            border: 1px solid #ddd;
        }
        th {
            background-color: #0a80ea;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .summary {
            /* width: 80%; */
            display: block;
            margin: auto
        }
        .summaryHeading {
            font-weight: 600;
            color: #000;
            text-align: left;
            /* margin-left: 20px; */
            font-size: 22px;
        }
        .summary p {
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 10px;
            margin: 10px 0px;
            font-size: 16px;
        }
        .questions {
            margin: 15px 0px;
        }
        .parent {
            display: flex;
            /* margin: 20px 0; */
        }
        .card {
            width: 33.33%;
            border: 2px solid #eee;
            margin: 10px;
            border-radius: 10px;
            padding: 20px
        }
        .card3 {
            width: 48%;
            border: 2px solid #eee;
            margin: 10px;
            border-radius: 10px;
            padding: 20px
        }
        .card1 {
            width: 50%;
            border: 2px solid #eee;
            margin: 10px;
            border-radius: 10px;
            padding: 20px
        }
        .card2 {
            /* width: 50%; */
            border: 2px solid #eee;
            margin: 10px;
            border-radius: 10px;
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
        }
        .gas-img2 img {
            margin: 10px;
            border-radius: 10px;
        }
        .meterInfo {
            font-size: 18px;
        }
        .rooms {
            font-size: 18px;
            font-weight: 500;
        }
        .follwg ol li {
            font-size: 16px;
            margin-bottom: 10px;
        }
        .imgRoom {
         margin-bottom: 10px;
         margin-right: 6px;
        }
        .table22 {
            max-width: "100%" !important;
        }
        .image-grid {
          flex-wrap: wrap;
          flex-direction:"row";
          justify-content: space-between;
        }
        .room {
            margin-bottom: 20px;
        }
        .tennat {
            padding-top: 20px
        }
        .tennat h3 {
            font-size: 20px
        }
        .tennat p {
            border-bottom: 2px solid #333;
            font-size: 18px;
            padding-bottom: 10px;
            width: 50%;
            border-radius: 0px 0px 10px 0px;
        }
        .text-center {
            padding: 20px 0px;
            text-align: center;
        }
        .text-center .blue {
            text-align: center;
            /* font-size: 24px; */
            padding-bottom: 0px;
            margin-bottom: 15px;
        }
        .text-center p {
            font-size: 17px;
        }
        .d-flex {
            display: flex;
            justify-content: space-around;
        }
        .divone {
            border: 3px solid #0090ff;
            padding: 15px;
            width: 50%;
            height: 300px;
            margin: 0px 20px;
            border-radius: 10px;
        }
        .blue {
            text-align: center;
            color: #0090ff;
            font-size: 28px;
            padding: 10px 0px
        }
        .textc {
            text-align: center;
        }
        .blue1 {
            color: #0090ff;
            font-weight: 600;
            font-size: 17px;
            padding-right: 10px;
        }
    </style>
    
    <body>
    
        <section class="ptb" style="display: block; margin: auto">
            <div class="header-container">
                <div class="logo">
                    <img src="https://api.propelinspections.com/inventory/uploads/pdf_logo.png" alt="Logo">
                </div>
                <div class="user-info">
                    <span class="blue1"><b>Address:</b></span><span>${
                      user.company_name
                    }</span><br>
                    <span class="blue1"><b>Address:</b></span><span>${
                      user.company_address
                    }</span><br>
                    <span class="blue1"><b>Phone:</b></span><span>${
                      user.company_email
                    }<br>
                    <span class="blue1"><b>Email:</b></span><span> ${
                      user.mobile_number
                    }</span>
                </div>
            </div>
            <h1 class="bg-blue">
            ${property_data?.types}
            </h1>
            <h2 class="propertyAddress">
            ${property_data?.property_address}
            </h2>
    
            <div class="propertyimg">
            <img src="${API_URL}${
      property_data?.main_img
    }" alt="property Image">
        </div>
        <div class="firsttable">
        <table>
            <tbody>
               
                <tr>
                    <td style="font-weight: bold;">Inspected By</td>
                    <td>${property_data?.inspector_name}</td>
                    <td style="font-weight: bold;">Tenant’s Name</td>
                    <td>${property_data?.tenant_name}</td>
                </tr>
                <tr>
                <tr>
                <td style="font-weight: bold;">Date of Inspection</td>
                <td>${moment(property_data?.inspection_date).format(
                  'DD-MMM-YYYY',
                )}</td>
                <td style="font-weight: bold;">EPC Expiry Date</td>
                <td>${moment(property_data?.ecp_exp_date).format(
                  'DD-MMM-YYYY',
                )}</td>
            </tr>
                <tr>
                    <td style="font-weight: bold;">Gas Safety Certificate Expiry Date</td>
                    <td>${moment(
                      property_data.gas_safety_certificate_exp_date,
                    ).format('DD-MMM-YYYY')}</td>
                    <td style="font-weight: bold;">EICR Expiry Date</td>
                    <td>${moment(property_data?.ecir_exp_date).format(
                      'DD-MMM-YYYY',
                    )}</td>
                </tr>
              
            </tbody>
        </table>
    </div> 
      <div class="summary">
            <h3 class="summaryHeading">
                Summary
            </h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque velit hic unde nisi magni qui quibusdam
                ratione animi maxime voluptates ipsa veniam doloremque esse corporis modi beatae, ab impedit
                praesentium.
            </p>
        </div>
    </section>
    <section id="ptb">
    <div class="container">
        <div class="perei">
            <h3 class="blue"> <div class="questions">
            <h4>What is an Inventory Check-In Report? </h4>
            <p>This Inventory Check-In Report provides a fair, objective and impartial record of the general
                condition of
                the contents of the Property as well as its internal condition at the outset of the lease of the
                Property
            </p>
            <h4>What are the benefits of using this Report?</h4>
            <p>The importance of a professional inventory and statement of condition cannot be underestimated.
                Government advice indicates that Inventories and statements of condition are 'strongly
                recommended'
                as a means to reduce dispute about the deposit at the end of a tenancy. It is in the Tenant's
                interests to
                carefully check this Inventory Check-In Report and to highlight any discrepancies as soon as
                possible and
                in any event no later than five working days after this Inventory Check-In Report is completed.
                Any
                outstanding discrepancies found at the end of the tenancy will be highlighted in an Inventory
                Outgoing
                Report and may affect the retention or release of a tenancy deposit.
            </p>
            <h4>Is the report aimed at the landlord or the tenant? </h4>
            <p>This Inventory Check-In Report is objective and contains photographic evidence, it may be relied
                upon
                and used by the Landlord, the Tenant and Letting Agent. 
            </p>
            <h4>What does this Report tell you? </h4>
            <p>This Inventory Check-In Report provides a clear and easy to follow statement of condition for
                each of the
                main elements of the property on a room by room basis, together with its contents if
                appropriate. This
                report comments on and highlights defects or aspects of poor condition that have been identified
                by the
                Inventory Clerk. Defects in condition will either be described in the narrative of the report or
                evidenced in
                the photographs included in the report. Please Note: where no comment on the condition of an
                element
                or item of contents is made by the Inventory Clerk, the element or item is taken to be in good
                condition
                and without defect.
            </p>
            <h4>What does this report not tell you?</h4>
            <p>Whilst every effort is made to ensure objectivity and accuracy, this Inventory Check-In Report
                provides no
                guarantee of the adequacy, compliance with standards or safety of any contents or equipment.
                This
                report will provide a record that such items exist in the property as at the date of the
                Inventory Check-In
                Report and the superficial condition of same. This report is not a building survey, a structural
                survey or a
                valuation, will not necessarily mention structural defects and does not give any advice on the
                cost of any
                repair work, or the types of repair which should be used.
            </p>
            <h4>What is inspected and not inspected? </h4>
            <p>The Inventory Clerk carries out a visual inspection of the inside of the main building together
                with any
                contents and will carry out a general inspection of the remainder of the building including the
                exterior
                cosmetic elements and any permanent outbuildings. For properties let on an unfurnished basis,
                the
                inspection will include floor coverings, curtains, curtain tracks, blinds and kitchen appliances
                if
                appropriate, but will exclude other contents. Gardens and their contents will be inspected and
                reported
                upon. The inspection is non-invasive. This means that the Inventory Clerk does not take up
                carpets, floor
                coverings or floor boards, move large items of furniture, test services, remove secured panels
                or undo
                electrical fittings. Especially valuable contents such as antiques, personal items or items of
                jewellery are
                excluded from this report. Kitchenware will be inspected but individual items will not be
                condition rated.
                Common parts in relation to flats, exterior structural elements of the main building and the
                structure of
                any outbuildings will not be inspected. Roof spaces and cellars are not inspected. Areas which
                are locked
                or where full access is not possible, for example, attics or excessively full cupboards or
                outbuildings are
                not inspected.
            </p>
        </div>
                Important Information
            </h3>

            
        </div>
    </div>
</section>
<section id="ptb">
        <div class="container">
            <h3 class="blue">Metres and Alarms</h3>
            <div class="parent">

                <div class="card">
                    <div class="card-header">
                        <div class="col-1"> <span class="gas">Pre-Paid Gas Meter:</span> <span class="gas">Yes</span> </div>
                        <div class="col-1"> <span class="gas">Reading:</span> <span class="gas">${
                          property_data.gas_meter_reading
                        }</span> </div>
                    </div>
                    <div class="gas-img"> <img src="${API_URL}${
      property_data?.gas_meter_img
    }" width="100%" height="auto"> </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <div class="col-1"> <span class="gas">Pre-Paid Electricity Meter:</span> <span class="gas">${
                          property_data.electricity_meter
                        }</span>
                        </div>
                        <div class="col-1"> <span class="gas">Reading:</span> <span class="gas">${
                          property_data.electricity_meter_reading
                        }</span> </div>
                    </div>
                    <div class="gas-img"> <img src="${API_URL}${
      property_data?.electricity_meter_img
    }" width="100%" height="auto"> </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="col-1"> <span class="gas">Heating System:</span> <span class="gas">Yes</span> </div>
                        <div class="col-1"> <span class="gas">Reading:</span> <span class="gas"></span> </div>
                    </div>
                    <div class="gas-img"> <img src="${API_URL}${
      property_data?.heating_system_img
    }" width="100%" height="auto"> </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div class="col-1"> <span class="gas">Water Meter:</span> <span class="gas">${
                          property_data.water_meter
                        }</span> </div>
                        <div class="col-1"> <span class="gas">Reading:</span> <span class="gas"></span>${
                          property_data.water_meter_reading
                        } </div>
                    </div>
                    <div class="gas-img"> <img src="${API_URL}${
      property_data?.water_meter_img
    }" width="100%" height="auto"> </div>
                </div>

            </div>
            <div class="parent">

                <div class="card3">
                    <div class="card-header">
                        <div class="col-1"> <span class="gas">Smoke Alarm:</span> <span class="gas">Yes</span>
                        </div>
                        <div class="col-1"> <span class="gas">Reading:</span> <span class="gas"></span> </div>
                    </div>
                    <div class="image-grid"> 
                      <img src="${API_URL}${
      property_data?.smoke_alarm_front_img
    }"  style="margin-top: 10px;" width="48%" height="auto">  
                      <img src="${API_URL}${
      property_data?.smoke_alarm_back_img
    }"   style="margin-top: 10px;" width="48%" height="auto"> 
                    </div>
                </div>

                <div class="card3">
                    <div class="card-header">
                        <div class="col-1"> <span class="gas">CO Alarm:</span> <span class="gas">${
                          property_data.co_alarm
                        }</span> </div>
                        <div class="col-1"> <span class="gas">Reading:</span> <span class="gas"></span> </div>
                    </div>
                    <div class="image-grid"> 
                      <img src="${API_URL}${
      property_data?.co_alarm_front_img
    }"  style="margin-top: 10px;" width="48%" height="auto">  
                      <img src="${API_URL}${
      property_data?.co_alarm_back_img
    }"   style="margin-top: 10px;" width="48%" height="auto"> 
                    </div>
            
                </div>
            </div>
        </div>
    </section>
      <section class="top-margin">
       ${property_data?.property_details.map((item, index) => {
         return `<div class="">   
         <div class="room">
             <h3 class="blue">${item.name} Details</h3>
             <table class="table22">
                 <thead>
                     <tr>
                         <th>Description</th>
                         <th>Condition</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr>
                         <td style="font-weight: bold;">Floor</td>
                         <td>${item.floor}</td>
                     </tr>
                     <tr>
                         <td style="font-weight: bold;">Walls</td>
                         <td>${item.walls}</td>
                     </tr>
                     <tr>
                         <td style="font-weight: bold;">Ceiling</td>
                         <td>${item.ceiling}</td>
                     </tr>
                     <tr>
                         <td style="font-weight: bold;">Windows</td>
                         <td>${item.windows}</td>
                     </tr>
                    
                     <tr>
                     <td style="font-weight: bold;">Doors</td>
                     <td>${item.doors}</td>
                     <tr>
                     <td style="font-weight: bold;">Description</td>
                     <td>${item.description}</td>
                 </tr>
                 </tr>
                 </tbody>
             </table>
         </div>
         <div class="image-grid">
         ${item.property_images.map((img, index) => {
           return `<img src="${API_URL}${img?.url}" class="imgRoom" width="32%" height="auto" />`;
         })}
         </div>
     </div>`;
       })} 
      </section>  
      <section>
      <div class="tennat">
          <h3 style="color: #0090ff">Advised Tenant To:</h3>
          <p>${property_data.advised_tenant_to}</p>
      </div>
      <div class="tennat">
          <h3 style="color: #0090ff">Asked Landlord To: </h3>
          <p>${property_data?.asked_landlord_to}</p>
      </div>
  </section>`.replace(/,/g, '');

    let html2 = `
    <section>
        <div class="text-center">
            <h4 class="blue">Declaration</h4>
            <p>This inventory provides a record of the contents of the property and the property’s internal condition. The person preparing the inventory is not an expert in fabrics, wood, materials, antiques etc nor a qualified surveyor. The inventory should not be used as an accurate description of each piece of furniture and equipment. Any areas of dilapidation or defect at the commencement of the tenancy need to be reported to the landlord/agency within 7 days of the commencement of tenancy. All items and areas listed in the property are in good, clean, serviceable condition unless otherwise stated. I confirm that I have checked the above inventory/inspection content and agree with it.</p>
        </div>
    </section>
    
    <section>
        <div class="d-flex">
            <div class="divone">
                <h3 class="textc">TENANT’S SIGNATURE</h3>
                <img class="signatre"
                src="${arrayBufferToBase64(
                  property_data?.signature_inspector.data,
                )}"
                alt="" />
            </div>
            <div class="divone">
                <h3 class="textc">TENANT’S SIGNATURE</h3>
                <img class="signatre"
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
      } catch (error) {}
      Share.open(options)
        .then(res => {})
        .catch(err => {});
    } else {
      const options = {
        type: 'application/pdf',
        url: filePath,
      };
      try {
        const result = await Share.open(options);
      } catch (error) {}
      Share.open(options)
        .then(res => {})
        .catch(err => {});
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

      {/* <View style={styles.row}>
        <Text style={styles.bluetxt}>Contractor Instructed : </Text>
        <Text style={styles.title}>{property_data?.contractor_instructed}</Text>
      </View> */}

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
