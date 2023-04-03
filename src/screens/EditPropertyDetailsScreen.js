import moment from 'moment';
import React, {useEffect, useReducer, useState} from 'react';
import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {ADD_PROPERTY, API_URL} from '../apis';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomRadioInput from '../components/CustomRadioInput';
import DataInput from '../components/DateInput';
import EditPropertyImages from '../components/EditPropertyImages';
import MainImgComponent from '../components/MainImgeComponent';
import SignatureComponent from '../components/SignaturePad';
import fonts from '../constants/fonts';
import colors from '../constants/theme';

import {
  CO_ALARAM,
  CO_ALARAM_IMG_URL1,
  CO_ALARAM_IMG_URL2,
  ECIR_EXPIRY_DATE,
  ECP_EXPIRY_DATE,
  ELECTRICY_METER_IMG_URL,
  ELECTRICY_METER_READING,
  FINAL_REMAKRS,
  GAS_METER_IMG_URL,
  GAS_METER_READING,
  GAS_SAFETY_METER_DATE,
  HEATING_IMG_URL,
  HEATING_SYSTEM,
  INSPECTOR_SIGNATURE,
  IS_ELECTRY_METER,
  IS_GAS_METER,
  SET_INSPECTION_DATE,
  SMOKE_ALARAM,
  SMOKE_IMG_URL1,
  SMOKE_IMG_URL2,
  TENANT_SIGNATURE,
  WATER_METER,
  WATER_METER_IMG_URL,
  WATER_METER_READING,
} from './types';

const reducer = (state, action) => {
  switch (action.type) {
    case 'TYPES':
      return {
        ...state,
        types: action.payload,
      };
    case 'ADDRESS_ADD':
      return {
        ...state,
        property_address: action.payload,
      };
    case 'TENANT_NAME':
      return {
        ...state,
        tenant_name: action.payload,
      };
    case 'INSPECTOR_NAME':
      return {
        ...state,
        inspector_name: action.payload,
      };
    case 'ADVISED_TENANT_TO':
      return {
        ...state,
        advised_tenant_to: action.payload,
      };
    case 'ASKED_LANDLORD_TO':
      return {
        ...state,
        asked_landlord_to: action.payload,
      };
    case 'CONSTRACTED_INSTRUCTED_TO':
      return {
        ...state,
        contractor_instructed: action.payload,
      };
    case SET_INSPECTION_DATE:
      return {
        ...state,
        inspection_date: action.payload,
      };
    case ECP_EXPIRY_DATE:
      return {
        ...state,
        ecp_exp_date: action.payload,
      };
    case ECIR_EXPIRY_DATE:
      return {
        ...state,
        ecir_exp_date: action.payload,
      };
    case GAS_SAFETY_METER_DATE:
      return {
        ...state,
        gas_safety_certificate_expiry_date: action.payload,
      };
    case IS_ELECTRY_METER:
      return {
        ...state,
        electricity_meter: action.payload,
      };
    case IS_GAS_METER:
      return {
        ...state,
        gas_meter: action.payload,
      };
    case ELECTRICY_METER_READING:
      return {
        ...state,
        electricity_meter_reading: action.payload,
      };
    case GAS_METER_READING:
      return {
        ...state,
        gas_meter_reading: action.payload,
      };
    case WATER_METER:
      return {
        ...state,
        water_meter: action.payload,
      };
    case SMOKE_ALARAM:
      return {
        ...state,
        smoke_alarm: action.payload,
      };
    case CO_ALARAM:
      return {
        ...state,
        co_alarm: action.payload,
      };
    case HEATING_SYSTEM:
      return {
        ...state,
        heating_system: action.payload,
      };
    case FINAL_REMAKRS:
      return {
        ...state,
        final_remarks: action.payload,
      };

    case WATER_METER_READING:
      return {
        ...state,
        water_meter_reading: action.payload,
      };
    case ELECTRICY_METER_IMG_URL:
      return {
        ...state,
        electricity_meter_img: action.payload,
      };
    case GAS_METER_IMG_URL:
      return {
        ...state,
        gas_meter_img: action.payload,
      };
    case WATER_METER_IMG_URL:
      return {
        ...state,
        water_meter_img: action.payload,
      };
    case SMOKE_IMG_URL1:
      return {
        ...state,
        smoke_alarm_front_img: action.payload,
      };
    case SMOKE_IMG_URL2:
      return {
        ...state,
        smoke_alarm_back_img: action.payload,
      };
    case CO_ALARAM_IMG_URL1:
      return {
        ...state,
        co_alarm_front_img: action.payload,
      };
    case CO_ALARAM_IMG_URL2:
      return {
        ...state,
        co_alarm_back_img: action.payload,
      };
    case HEATING_IMG_URL:
      return {
        ...state,
        heating_system_img: action.payload,
      };

    default:
      return state;
  }
};
const EditPropertyScreen = ({navigation, route}) => {
  let item = route.params.item;
  const {user} = useSelector(state => state.userReducer);
  const [property_data, setPropertydata] = useReducer(reducer, item);
  const types = ['Inventory Report', 'Mid-Term Inspection', 'Checkout Report'];
  const [isloading, setIsLoading] = useState(false);
  const [signature_inspector, setSignatureInspector] = useState(
    arrayBufferToBase64(item.signature_inspector.data),
  );
  const [signature_tenant, setSignatureTenant] = useState(
    arrayBufferToBase64(item.signature_tenant.data),
  );
  const [images_data, setImagesdata] = useState(
    item.property_details.map((item, index) => {
      return {
        ...item,
        images: item.property_images.map(itm => itm.url),
      };
    }),
  );

  const addNewItem = () => {
    let item = {
      name: `Room ${images_data.length + 1}`,
      description: '',
      floor: '',
      walls: '',
      ceiling: '',
      windows: '',
      images: [
        'uploads/default.jpg',
        'uploads/default.jpg',
        'uploads/default.jpg',
        'uploads/default.jpg',
        'uploads/default.jpg',
        'uploads/default.jpg',
        'uploads/default.jpg',
        'uploads/default.jpg',
        'uploads/default.jpg',
      ],
    };
    let temp_array = [...images_data];
    temp_array.push(item);
    setImagesdata(temp_array);
  };

  arrayBufferToBase64 = buffer => {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `${binary}`;
  };

  const validate_data = () => {
    let empty_filed = false;
    if (property_data.property_address == '') {
      alert("Property Address can't be empty");
      return;
    }
    if (property_data.tenant_name == '') {
      alert("Tenant Name can't be empty");
      return;
    }
    if (property_data.inspector_name == '') {
      alert("Inspector name can't be empty");
      return;
    }

    if (empty_filed == true) {
      alert('Please check all input fileds');
      return;
    }

    UploadProperty();
  };

  const UploadProperty = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var data = {
      ...property_data,
      inspectiondate: moment(property_data.inspectiondate).format(
        'DD-MMM-YYYY',
      ),
      epc_expiry_date: moment(property_data.ecp_exp_date).format('DD-MMM-YYYY'),
      ecir_expirydate: moment(property_data.ecir_expirydate).format(
        'DD-MMM-YYYY',
      ),
      gas_safety_certificate_expiry_date: moment(
        property_data.gas_safety_certificate_expiry_date,
      ).format('DD-MMM-YYYY'),
      signature_inspector: signature_inspector,
      signature_tenant: signature_tenant,
      user_id: user.id,
      account_id: user.id,
      property_details: images_data,
    };
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow',
    };

    fetch(`${ADD_PROPERTY}/${item.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);

        Alert.alert(
          'Property Updated Success',
          'Your property has been updated ',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('HomeScreen'),
            },
          ],
        );
      })
      .catch(error => {
        Alert.alert(
          'Property Updating Error',
          'There is some thing went wrong, Please try again',
        );
        setIsLoading(false);
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1, paddingBottom: moderateScale(20)}}>
        <View style={{height: moderateScale(10)}} />

        <FlatList
          data={types}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                setPropertydata({
                  type: 'TYPES',
                  payload: item,
                });
              }}
              style={{
                paddingHorizontal: moderateScale(20),
                paddingVertical: moderateScale(10),
                borderWidth: 1,
                borderColor:
                  property_data.types != item ? '#0090FF' : '#0090FF11',
                backgroundColor:
                  property_data.types == item ? '#0090FF' : '#0090FF11',
                margin: moderateScale(10),
                borderRadius: moderateScale(5),
              }}>
              <Text
                style={{
                  color: property_data.types == item ? '#fff' : '#000',
                  fontFamily: fonts.Bold,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
        <MainImgComponent
          url={`${API_URL}${property_data?.main_img}`}
          onChangeText={url => {
            setPropertydata({
              type: 'MAIN_IMG',
              payload: url,
            });
          }}
        />
        <CustomInput
          label={'Property Address'}
          value={property_data.property_address}
          onChangeText={text =>
            setPropertydata({type: 'ADDRESS_ADD', payload: text})
          }
        />
        <CustomInput
          label={'Tenant Name'}
          value={property_data.tenant_name}
          onChangeText={text =>
            setPropertydata({type: 'TENANT_NAME', payload: text})
          }
        />

        <CustomInput
          label={'Inspector Name'}
          value={property_data.inspector_name}
          onChangeText={text =>
            setPropertydata({type: 'INSPECTOR_NAME', payload: text})
          }
        />

        <DataInput
          label={'Inspection Date'}
          value={moment(property_data.inspection_date).format('DD-MM-YYYY')}
          onChangeText={date =>
            setPropertydata({
              type: SET_INSPECTION_DATE,
              payload: moment(date).format('DD-MM-YYYY'),
            })
          }
        />
        <DataInput
          label={'ECP Expiry Date'}
          value={moment(property_data.ecp_exp_date).format('DD-MM-YYYY')}
          onChangeText={date =>
            setPropertydata({
              type: ECP_EXPIRY_DATE,
              payload: moment(date).format('DD-MM-YYYY'),
            })
          }
        />
        <DataInput
          label={'ECIR Expiry Date'}
          value={moment(property_data.ecir_exp_date).format('dd-mm-yyyy')}
          onChangeText={date =>
            setPropertydata({
              type: ECIR_EXPIRY_DATE,
              payload: moment(date).format('DD-MM-YYYY'),
            })
          }
        />
        <DataInput
          label={'Gas Safety Certificate Expiry Date'}
          value={moment(property_data.gas_safety_certificate_exp_date).format(
            'dd-mm-yyyy',
          )}
          onChangeText={date =>
            setPropertydata({
              type: GAS_SAFETY_METER_DATE,
              payload: moment(date).format('DD-MM-YYYY'),
            })
          }
        />
        <CustomRadioInput
          label={'Pre-Paid Electricity Meter\t  Reading'}
          options={['Yes', 'No']}
          cameraimage={['1']}
          value={property_data.electricity_meter}
          meter_reading_value={property_data.electricity_meter_reading}
          onChangeReading={text => {
            setPropertydata({
              type: ELECTRICY_METER_READING,
              payload: text,
            });
          }}
          onChangeText={type =>
            setPropertydata({
              type: IS_ELECTRY_METER,
              payload: type,
            })
          }
          img1={property_data.electricity_meter_img}
          onChangeImg1={url => {
            setPropertydata({
              type: ELECTRICY_METER_IMG_URL,
              payload: url,
            });
          }}
          img2={null}
          onChangeImg2={url => {}}
        />

        <CustomRadioInput
          label={'Pre-Paid Gas Meter       \t\t   Reading'}
          options={['Yes', 'No']}
          cameraimage={['1']}
          value={property_data.gas_meter}
          meter_reading_value={property_data.gas_meter_reading}
          onChangeReading={text => {
            setPropertydata({
              type: GAS_METER_READING,
              payload: text,
            });
          }}
          onChangeText={type =>
            setPropertydata({
              type: IS_GAS_METER,
              payload: type,
            })
          }
          img1={property_data.gas_meter_img}
          onChangeImg1={url => {
            setPropertydata({
              type: GAS_METER_IMG_URL,
              payload: url,
            });
          }}
          img2={null}
          onChangeImg2={() => {}}
        />

        <CustomRadioInput
          label={'Water Meter        \t\t\t   Reading'}
          options={['Yes', 'No']}
          cameraimage={['1']}
          value={property_data.water_meter}
          is_reading={true}
          meter_reading_value={property_data.water_meter_reading}
          onChangeReading={text => {
            setPropertydata({
              type: WATER_METER_READING,
              payload: text,
            });
          }}
          onChangeText={type =>
            setPropertydata({
              type: WATER_METER,
              payload: type,
            })
          }
          img1={property_data.water_meter_img}
          onChangeImg1={url => {
            setPropertydata({
              type: WATER_METER_IMG_URL,
              payload: url,
            });
          }}
          img2={null}
          onChangeImg2={() => {}}
        />
        <CustomRadioInput
          label={'Smoke Alarm'}
          options={['Yes', 'No']}
          cameraimage={['1', '2']}
          is_reading={false}
          value={property_data.smoke_alarm}
          onChangeText={type =>
            setPropertydata({
              type: SMOKE_ALARAM,
              payload: type,
            })
          }
          img1={property_data.smoke_alarm_front_img}
          onChangeImg1={url => {
            setPropertydata({
              type: SMOKE_IMG_URL1,
              payload: url,
            });
          }}
          img2={property_data.smoke_alarm_back_img}
          onChangeImg2={url => {
            setPropertydata({
              type: SMOKE_IMG_URL2,
              payload: url,
            });
          }}
        />
        <CustomRadioInput
          label={'CO Alarm'}
          options={['Yes', 'No']}
          is_reading={false}
          cameraimage={['1', '2']}
          value={property_data.co_alarm}
          onChangeText={type =>
            setPropertydata({
              type: CO_ALARAM,
              payload: type,
            })
          }
          img1={property_data.co_alarm_front_img}
          onChangeImg1={url => {
            setPropertydata({
              type: CO_ALARAM_IMG_URL1,
              payload: url,
            });
          }}
          img2={property_data.co_alarm_back_img}
          onChangeImg2={url => {
            setPropertydata({
              type: CO_ALARAM_IMG_URL2,
              payload: url,
            });
          }}
        />
        <CustomRadioInput
          label={'Heating System'}
          options={['Yes', 'No']}
          cameraimage={['0', '1']}
          value={property_data.heating_system}
          is_reading={false}
          onChangeText={type =>
            setPropertydata({
              type: HEATING_SYSTEM,
              payload: type,
            })
          }
          img2={property_data.heating_system_img}
          onChangeImg2={url => {
            setPropertydata({
              type: HEATING_IMG_URL,
              payload: url,
            });
          }}
        />
        {images_data.map((item, index) => {
          return (
            <EditPropertyImages
              item={item}
              key={`${index}`}
              onDelete={() => {
                if (images_data.length > 1) {
                  setImagesdata(
                    images_data.filter(
                      (item, item_index) => item_index !== index,
                    ),
                  );
                } else {
                  alert('There must be atleast one room');
                }
              }}
              setItem={data => {
                let temp = [...images_data];
                temp[index] = data;
                setImagesdata([...temp]);
              }}
              index={`${index}`}
            />
          );
        })}

        <TouchableOpacity onPress={() => addNewItem()} style={styles.button}>
          <AntDesign name={'plus'} color={'#fff'} size={moderateScale(20)} />
          <Text
            style={{
              color: colors.white,
              fontFamily: fonts.Bold,
              paddingLeft: moderateScale(10),
            }}>
            Add New
          </Text>
        </TouchableOpacity>
        <CustomInput
          label={'Asked Landord To'}
          value={property_data.asked_landlord_to}
          onChangeText={text =>
            setPropertydata({type: 'ASKED_LANDLORD_TO', payload: text})
          }
        />

        <CustomInput
          label={'Advised Tenant To'}
          value={property_data.advised_tenant_to}
          onChangeText={text =>
            setPropertydata({type: 'ADVISED_TENANT_TO', payload: text})
          }
        />
        <CustomInput
          label={'Contractor Instructed to'}
          value={property_data.contractor_instructed}
          onChangeText={text =>
            setPropertydata({type: 'CONSTRACTED_INSTRUCTED_TO', payload: text})
          }
        />
        <CustomInput
          label={'Final Remarks'}
          value={property_data.final_remarks}
          onChangeText={text =>
            setPropertydata({type: FINAL_REMAKRS, payload: text})
          }
        />
        <SignatureComponent
          title={"Inspector's Signature"}
          img={signature_inspector}
          onChangeText={text => setSignatureInspector(text)}
        />
        <SignatureComponent
          title={"Tenant's Signature"}
          img={signature_tenant}
          onChangeText={text => setSignatureTenant(text)}
        />
        <CustomButton
          isloading={isloading}
          title="Update Property"
          onPress={() => validate_data()}
        />
        <View style={{height: moderateScale(20)}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditPropertyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.white,
  },
  button: {
    width: moderateScale(120),
    height: moderateScale(40),
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(5),
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: moderateScale(15),
    backgroundColor: '#000',
  },
});
