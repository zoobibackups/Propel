import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {API_URL} from '../apis';
import fonts from '../constants/fonts';
import {SCREEN_WIDTH} from '../constants/scaling';
import colors from '../constants/theme';
const ListItem = ({item, index}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PropertyDetailsScreen', {item})}
      key={`${index}`}
      style={styles.item}>
      <View>
        <Image
          source={{uri: `${API_URL}${item.main_img}`}}
          resizeMode={'cover'}
          style={{
            borderWidth: moderateScale(0),
            borderColor: colors.primaryColor,
            width: moderateScale(120),
            minHeight: moderateScale(70),
            borderRadius: moderateScale(5),
            flex: 1,
          }}
        />
      </View>
      <View
        style={{
          width: SCREEN_WIDTH - moderateScale(120),
          paddingTop: 0,
          padding: moderateScale(12),
        }}>
        <Text
          numberOfLines={3}
          style={{
            ...styles.title,
            color: colors.primaryColor,
            fontSize: moderateScale(12),
          }}>
          {item?.property_address}
        </Text>
        <View style={{height: moderateScale(4)}} />
        <Text style={styles.title}>
          Inspection Date: {moment(item.inspection_date).format('DD-MM-YYYY')}
        </Text>
        <Text style={styles.title}>Inspector Name: {item.inspector_name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  item: {
    width: SCREEN_WIDTH + moderateScale(10),
    borderRadius: moderateScale(5),
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: moderateScale(5),
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginVertical: moderateScale(10),
  },
  title: {
    fontFamily: fonts.Bold,
    color: colors.textColor,
    fontSize: moderateScale(10),
  },
});
