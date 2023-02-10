const phoneUtil =
  require('google-libphonenumber').PhoneNumberUtil.getInstance();
const PNF = require('google-libphonenumber').PhoneNumberFormat;
import binarySearch from './binarySearch';
const compareAndMergeArrays = (arr1, arr2, code) => {
  let finalarray2 = [];
  return new Promise((resolve, reject) => {
    for (const element of arr1) {
      if (element.mobile_number.charAt(0) == '+') {
        try {
          let rawnumber = phoneUtil.parseAndKeepRawInput(element.mobile_number);
          let num = phoneUtil
            .format(rawnumber, PNF.NATIONAL)
            .replace(' ', '')
            .replace(/-|\s/g, '')
            .replace(/\D/g, '');
          let data = binarySearch(arr2, num, 0, arr2.length - 1);
          finalarray2.push(Object.assign({}, element, data));
        } catch (err) {
          console.log(err, 'error 1');
        }
      } else {
        try {
          let number = phoneUtil.parseAndKeepRawInput(
            element.mobile_number,
            code,
          );
          if (phoneUtil.isValidNumberForRegion(number, code)) {
            let localnum = phoneUtil
              .format(number, PNF.NATIONAL)
              .replace(' ', '')
              .replace(/-|\s/g, '')
              .replace(/\D/g, '');
            let data = binarySearch(arr2, localnum, 0, arr2.length - 1);
            finalarray2.push(Object.assign({}, element, data));
          }
        } catch (err) {
          console.log(err, 'error 2');
        }
      }
    }
    resolve(
      finalarray2.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
      ),
    );
  });
};

export default compareAndMergeArrays;
