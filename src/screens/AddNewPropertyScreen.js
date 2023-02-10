import moment from 'moment';
import React, {useReducer, useState} from 'react';
import {
  SafeAreaView,
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
  propertyaddress: 'MY PROPERTY ADDREESS',
  tenant_name: 'MY ENEAT NAE',
  inspector_name: 'AQEEL SQLAIN',
  asked_landord_to: 'ALL THINGS DONE',
  advised_tenant_to: 'WE ALL HAVE THIS',
  contractor_instructed_to: 'THIS IS THE PROPERY DAT',
  inspectiondate: moment().format('DD-MMM-YYYY'),
  epc_expiry_date: moment().format('DD-MMM-YYYY'),
  ecir_expirydate: moment().format('DD-MMM-YYYY'),
  gas_safety_certificate_expiry_date: moment().format('DD-MMM-YYYY'),
  electricity_meter: 'Yes',
  electricity_meter_reading: '150',
  gas_meter: 'Yes',
  gas_meter_reading: '120',
  water_meter: 'Yes',
  smoke_alarm: 'Yes',
  co_alarm: 'Yes',
  heating_system: 'Yes',
  signature_inspector: '',
  signature_tenant: '',
  types: 'inspection',
  final_remarks: 'THIS IS FINAL REMARKS',
  user_id: '5',

  main_img: '',
  water_meter_reading: '',
  electricty_meter_img: '',
  gas_meter_img: '',
  water_meter_img: '',
  smoke_alarm_front_img: '',
  smoke_alarm_back_img: '',
  co_alarm_font_img: '',
  co_alram_back_img: '',
  heating_system_img: '',
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
const AddNewPropertyScreen = () => {
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

  const validate_data = () => {
    let empty_filed = false;
    if (property_data.propertyaddress == '') {
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
    if (property_data.asked_landord_to == '') {
      alert("Ask to Landlord can't be empty");
      return;
    }
    if (property_data.advised_tenant_to == '') {
      alert("Tenant advice can't be empty");
      return;
    }
    if (property_data.contractor_instructed_to == '') {
      alert("Contractor Instruction can't be empty");
      return;
    }

    if (property_data.electricity_meter_reading == '') {
      alert("Electricity Meter Reading can't be empty");
      return;
    }
    if (property_data.gas_meter_reading == '') {
      alert("Gas Meter Reading can't be empty");
      return;
    }
    if (property_data.signature_inspector == '') {
      alert("Inspector Signature can't be empty");
      return;
    }
    if (property_data.signature_tenant == '') {
      alert("Gas Meter Reading can't be empty");
      return;
    }
    images_data.map(item => {
      if (item.name == '') {
        empty_filed = true;
      }
      if (item.description == '') {
        empty_filed = true;
      }
    });
    if (empty_filed == true) {
      alert('Please check all input fileds');
    }
  };

  //
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
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
          value={property_data.inspectiondate}
          onChangeText={date =>
            setPropertydata({
              type: SET_INSPECTION_DATE,
              payload: moment(date).format('DD-MM-YYYY'),
            })
          }
        />
        <DataInput
          label={'ECP Expiry Date'}
          value={property_data.epc_expiry_date}
          onChangeText={date =>
            setPropertydata({
              type: ECP_EXPIRY_DATE,
              payload: moment(date).format('DD-MM-YYYY'),
            })
          }
        />
        <DataInput
          label={'ECIR Expiry Date'}
          value={property_data.ecir_expirydate}
          onChangeText={date =>
            setPropertydata({
              type: ECIR_EXPIRY_DATE,
              payload: moment(date).format('DD-MM-YYYY'),
            })
          }
        />
        <DataInput
          label={'Gas Safety Certificate Expiry Date'}
          value={property_data.gas_safety_certificate_expiry_date}
          onChangeText={date =>
            setPropertydata({
              type: GAS_SAFETY_METER_DATE,
              payload: moment(date).format('DD-MM-YYYY'),
            })
          }
        />
        <CustomRadioInput
          label={'Electricity Meter      \t\t\t Reading'}
          options={['Yes', 'No']}
          cameraimage={['1']}
          value={property_data.electricity_meter}
          onChangeText={type =>
            setPropertydata({
              type: IS_ELECTRY_METER,
              payload: type,
            })
          }
        />

        <CustomRadioInput
          label={'Gas Meter       \t\t\t\tReading'}
          options={['Yes', 'No']}
          cameraimage={['1']}
          value={property_data.gas_meter}
          onChangeText={type =>
            setPropertydata({
              type: IS_GAS_METER,
              payload: type,
            })
          }
        />

        <CustomRadioInput
          label={'Water Meter        \t\t\t\tReading'}
          options={['Yes', 'No']}
          cameraimage={['1']}
          value={property_data.water_meter}
          is_reading={true}
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
          cameraimage={['1', '2']}
          is_reading={false}
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
          is_reading={false}
          cameraimage={['1', '2']}
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
          cameraimage={['0', '1']}
          value={property_data.heating_system}
          is_reading={false}
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
        <CustomButton
          title="Upload this Property"
          onPress={() => validate_data()}
        />
        <View style={{height: moderateScale(20)}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNewPropertyScreen;

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
