import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
const SCREEN_WIDTH = wp(100) - moderateScale(30);
export {
  SCREEN_WIDTH,
  wp,
  hp,
  scale,
  verticalScale,
  moderateVerticalScale,
  moderateScale,
};
