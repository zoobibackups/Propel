import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/Entypo';
import {LIST_PROPERTY} from '../apis';
import LOGO from '../assets/svgs/logo.svg';
import ListItem from '../components/ListItem';
import fonts from '../constants/fonts';
import {MainRoutes} from '../constants/Routes';
import {SCREEN_WIDTH} from '../constants/scaling';
import colors from '../constants/theme';

const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [property, setProperty] = useState([]);
  const [data, setData] = useState([]);
  const [laoding, setLoading] = useState(true);
  useEffect(() => {
    updatePropertyList();
  }, []);
  const updatePropertyList = () => {
    setLoading(true);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(`${LIST_PROPERTY}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setProperty(result.rows);
        setData(result.rows);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        alert('Some Error');
      });
  };
  const searchPropertyData = text => {
    setSearch(text);
    const items = property.filter(row => {
      const result = `${row.property_address.toUpperCase()}${row.tenant_name.toUpperCase()}${row.inspector_name.toUpperCase()}`;
      const txt = text.toUpperCase();
      return result.indexOf(txt) > -1;
    });
    setData(items);
  };

  const renderItem = ({item, index}) => (
    <ListItem
      key={`${index}`}
      index={index}
      item={item}
      onDeleteAnItem={() => updatePropertyList()}
    />
  );
  const HeaderComponenet = () => {
    return (
      <View
        style={{
          width: SCREEN_WIDTH + moderateScale(10),
          alignSelf: 'center',
          height: moderateScale(50),
        }}>
        <TextInput
          placeholder={'Search'}
          placeholderTextColor={'#0006'}
          value={search}
          onChangeText={text => searchPropertyData(text)}
          style={styles.input}
        />
      </View>
    );
  };
  if (laoding) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color={colors.primaryColor} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={{marginVertical: moderateScale(20)}}>
        <LOGO width={moderateScale(400)} heigth={moderateScale(300)} />
      </View>
      <FlatList
        data={data}
        bounces={false}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text
                style={{
                  color: colors.primaryColor,
                  fontFamily: fonts.Bold,
                  paddingLeft: moderateScale(10),
                }}>
                No Data FOund
              </Text>
            </View>
          );
        }}
        ListHeaderComponent={<HeaderComponenet />}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(MainRoutes.AddNewPropertyScreen)}
        style={styles.button}>
        <AntDesign name={'plus'} color={'#fff'} size={moderateScale(20)} />
        <Text
          style={{
            color: colors.white,
            fontFamily: fonts.Bold,
            paddingLeft: moderateScale(10),
          }}>
          Add Property
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: moderateScale(10),
    backgroundColor: colors.white,
    alignItems: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    width: SCREEN_WIDTH + moderateScale(10),
    borderColor: '#0008',
    borderRadius: moderateScale(5),
    paddingVertical: 0,
    borderWidth: moderateScale(1),
    height: moderateScale(45),
    fontFamily: fonts.Medium,
    paddingHorizontal: moderateScale(10),
    color: colors.textColor,
  },
  button: {
    width: moderateScale(150),
    height: moderateScale(40),
    justifyContent: 'center',
    position: 'absolute',
    flexDirection: 'row',
    bottom: moderateScale(10),
    borderRadius: moderateScale(30),
    right: moderateScale(10),
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: moderateScale(10),
    backgroundColor: colors.primaryColor,
  },
});
