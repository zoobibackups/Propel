import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DELETE_PROPERTY} from '../apis';
import fonts from '../constants/fonts';
import {SCREEN_WIDTH} from '../constants/scaling';
import colors from '../constants/theme';
import DeleteModal from './DeleteModal';
const ListItem = ({item, index, onDeleteAnItem}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [is_deleting, setIsDeleting] = useState(false);
  const navigation = useNavigation();
  const onDeleteItem = () => {
    setIsVisible(false);
    setIsDeleting(true);
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(`${DELETE_PROPERTY}/${item.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        onDeleteAnItem();
        alert('Deleted Item Successfully');
        setIsDeleting(false);
      })
      .catch(error => {
        alert('Error In Deleting Item');
        setIsDeleting(false);
      });
  };
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PropertyDetailsScreen', {item})}
      key={`${index}`}
      style={styles.item}>
      <View>
        <Image
          source={{uri: null}}
          resizeMode={'cover'}
          defaultSource={require('../assets/default.jpg')}
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
