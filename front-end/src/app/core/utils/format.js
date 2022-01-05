// import parsePhoneNumber from 'libphonenumber-js';
import moment from 'moment';

export const formatCurrency = (money) => {
  return money ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money) : 
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0)
}

export const formatDate = (dateString) => {
  if (!dateString) {
    return '';
  }
  return moment(dateString).format('DD/MM/YYYY HH:mm:ss');
};

export const validateEmail = (email) => {
  const re = /^.*@.*(\.\w{1,10})+$/;
  return re.test(String(email));
};