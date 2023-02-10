const phoneUtil =
  require('google-libphonenumber').PhoneNumberUtil.getInstance();
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const parseContactToUpload = (contacts, code) => {
  let upload_contacts = [];
  return new Promise((resolve, reject) => {
    contacts.forEach(element => {
      if (element.mobile_number.charAt(0) == '+') {
        try {
          let kl = phoneUtil.parseAndKeepRawInput(element.mobile_number);
          upload_contacts.push({
            country_code: phoneUtil.getRegionCodeForNumber(kl),
            key: element.key,
            mobile_number: phoneUtil
              .format(kl, PNF.NATIONAL)
              .replace(' ', '')
              .replace(/-|\s/g, '')
              .replace(/\D/g, ''),
            name: element.name,
          });
        } catch (err) {
          console.log(err, 'Errroror', element);
        }
      } else {
        let number = phoneUtil.parseAndKeepRawInput(
          element.mobile_number,
          code,
        );
        if (phoneUtil.isValidNumberForRegion(number, code)) {
          upload_contacts.push({
            country_code: element.iso2,
            key: element.key,
            mobile_number: phoneUtil
              .format(number, PNF.NATIONAL)
              .replace(' ', '')
              .replace(/-|\s/g, '')
              .replace(/\D/g, ''),
            name: element.name,
          });
        }
      }
    });
    resolve(upload_contacts);
  });
};
export default parseContactToUpload;
