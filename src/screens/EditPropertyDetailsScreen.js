import moment from 'moment';
import React, {useReducer, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddNewPropertyImages from '../components/AddNewPropertyImages';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomRadioInput from '../components/CustomRadioInput';
import DataInput from '../components/DateInput';
import SignatureComponent from '../components/SignaturePad';
import fonts from '../constants/fonts';
import colors from '../constants/theme';
import imgs from '../Data/img';
import {
  CO_ALARAM,
  ECIR_EXPIRY_DATE,
  ECP_EXPIRY_DATE,
  ELECTRICY_METER_READING,
  FINAL_REMAKRS,
  GAS_METER_READING,
  GAS_SAFETY_METER_DATE,
  HEATING_SYSTEM,
  INSPECTOR_SIGNATURE,
  IS_ELECTRY_METER,
  IS_GAS_METER,
  SET_INSPECTION_DATE,
  SMOKE_ALARAM,
  TENANT_SIGNATURE,
  WATER_METER,
} from './types';
const initialState = {
  propertyaddress: '',
  tenant_name: '',
  inspector_name: '',
  asked_landord_to: '',
  advised_tenant_to: '',
  contractor_instructed_to: '',
  inspectiondate: moment().format('DD-MMM-YYYY'),
  epc_expiry_date: moment().format('DD-MMM-YYYY'),
  ecir_expirydate: moment().format('DD-MMM-YYYY'),
  gas_safety_certificate_expiry_date: moment().format('DD-MMM-YYYY'),
  electricity_meter: 'Yes',
  electricity_meter_reading: '',
  gas_meter: 'Yes',
  gas_meter_reading: '',
  water_meter: 'Yes',
  smoke_alarm: 'Yes',
  co_alarm: 'Yes',
  heating_system: 'Yes',
  signature_inspector: '',
  signature_tenant: '',
  types: '',
  final_remarks: '',
  user_id: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADDRESS_ADD':
      return {
        ...state,
        propertyaddress: action.payload,
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
        asked_landord_to: action.payload,
      };
    case 'CONSTRACTED_INSTRUCTED_TO':
      return {
        ...state,
        contractor_instructed_to: action.payload,
      };
    case SET_INSPECTION_DATE:
      return {
        ...state,
        inspectiondate: action.payload,
      };
    case ECP_EXPIRY_DATE:
      return {
        ...state,
        epc_expiry_date: action.payload,
      };
    case ECIR_EXPIRY_DATE:
      return {
        ...state,
        ecir_expirydate: action.payload,
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
    case TENANT_SIGNATURE:
      return {
        ...state,
        signature_tenant: action.payload,
      };
    case INSPECTOR_SIGNATURE:
      return {
        ...state,
        signature_inspector: action.payload,
      };
    default:
      return state;
  }
};
const EditPropertyDetailsScreen = () => {
  const [property_data, setPropertydata] = useReducer(reducer, initialState);
  const [images_data, setImagesdata] = useState([]);
  const addNewItem = () => {
    let item = {
      name: `Room ${images_data.length + 1}`,
      description: 'This is the room Desctiption',
      images: ['', '', ''],
    };
    let temp_array = [...images_data];
    temp_array.push(item);
    setImagesdata(temp_array);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1, paddingBottom: moderateScale(20)}}>
      <View style={{height: moderateScale(10)}} />

      <CustomInput
        label={'Property Address'}
        value={property_data.propertyaddress}
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
        label={'Asked Landord To'}
        value={property_data.asked_landord_to}
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
        value={property_data.contractor_instructed_to}
        onChangeText={text =>
          setPropertydata({type: 'CONSTRACTED_INSTRUCTED_TO', payload: text})
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
        value={property_data.InspectionDate}
        onChangeText={date =>
          setPropertydata({
            type: SET_INSPECTION_DATE,
            payload: moment(date).format('DD-MM-YYYY'),
          })
        }
      />
      <DataInput
        label={'ECP Expiry Date'}
        value={property_data.EICRExpiryDate}
        onChangeText={date =>
          setPropertydata({
            type: ECP_EXPIRY_DATE,
            payload: moment(date).format('DD-MM-YYYY'),
          })
        }
      />
      <DataInput
        label={'ECIR Expiry Date'}
        value={property_data.EICRExpiryDate}
        onChangeText={date =>
          setPropertydata({
            type: ECIR_EXPIRY_DATE,
            payload: moment(date).format('DD-MM-YYYY'),
          })
        }
      />
      <DataInput
        label={'Gas Safety Certificate Expiry Date'}
        value={property_data.EICRExpiryDate}
        onChangeText={date =>
          setPropertydata({
            type: GAS_SAFETY_METER_DATE,
            payload: moment(date).format('DD-MM-YYYY'),
          })
        }
      />
      <CustomRadioInput
        label={'Electricity Meter'}
        options={['Yes', 'No']}
        value={property_data.electricity_meter}
        onChangeText={type =>
          setPropertydata({
            type: IS_ELECTRY_METER,
            payload: type,
          })
        }
      />
      <CustomRadioInput
        label={'Gas Meter'}
        options={['Yes', 'No']}
        value={property_data.gas_meter}
        onChangeText={type =>
          setPropertydata({
            type: IS_GAS_METER,
            payload: type,
          })
        }
      />
      <CustomRadioInput
        label={'Water Meter'}
        options={['Yes', 'No']}
        value={property_data.water_meter}
        onChangeText={type =>
          setPropertydata({
            type: WATER_METER,
            payload: type,
          })
        }
      />
      <CustomRadioInput
        label={'Smoke Alarm'}
        options={['Yes', 'No']}
        value={property_data.smoke_alarm}
        onChangeText={type =>
          setPropertydata({
            type: SMOKE_ALARAM,
            payload: type,
          })
        }
      />
      <CustomRadioInput
        label={'CO Alarm'}
        options={['Yes', 'No']}
        value={property_data.co_alarm}
        onChangeText={type =>
          setPropertydata({
            type: CO_ALARAM,
            payload: type,
          })
        }
      />
      <CustomRadioInput
        label={'Heating System'}
        options={['Yes', 'No']}
        value={property_data.heating_system}
        onChangeText={type =>
          setPropertydata({
            type: HEATING_SYSTEM,
            payload: type,
          })
        }
      />
      {images_data.map((item, index) => {
        return (
          <AddNewPropertyImages
            item={item}
            key={`${index}`}
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
        label={'Final Remarks'}
        value={property_data.final_remarks}
        onChangeText={text =>
          setPropertydata({type: FINAL_REMAKRS, payload: text})
        }
      />
      <SignatureComponent
        title={"Inspector's Signature"}
        onChangeText={text =>
          setPropertydata({type: INSPECTOR_SIGNATURE, payload: text})
        }
      />
      <SignatureComponent
        title={"Tenant's Signature"}
        onChangeText={text =>
          setPropertydata({type: TENANT_SIGNATURE, payload: text})
        }
      />
      <CustomButton title="Upload this Property" />
      <View style={{height: moderateScale(20)}} />
    </ScrollView>
  );
};

export default EditPropertyDetailsScreen;

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
