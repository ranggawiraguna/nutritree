import { id as idLocale } from 'date-fns/locale';
import { format } from 'date-fns';

const moneyFormatter = (value) => {
  const money = Array.from(value.toString().split('').reverse()).join('');

  let text = [];

  for (let i = 1; i <= Math.floor(money.length / 3) + 1; i++) {
    if (money.length > (i - 1) * 3 + 3) {
      text = [...text, money.substring((i - 1) * 3, (i - 1) * 3 + 3), '.'];
    } else if (money.length === (i - 1) * 3 + 3) {
      text.push(money.substring((i - 1) * 3, (i - 1) * 3 + 3));
    } else {
      text.push(money.substring(Math.floor(money.length / 3) * 3, money.length));
    }
  }

  return `Rp. ${[...text.join('').split('').reverse()].join('')}`;
};

const dateFormatter = (date, stringFormat) => {
  let value = '';
  try {
    value = format(date ? date : new Date(), stringFormat, { locale: idLocale });
  } catch (e) {
    value = format(date ? date.toDate() : new Date(), stringFormat, { locale: idLocale });
  }

  return value;
};

const getGenderText = (gender) => {
  switch(gender?.toLowerCase()) {
    case 'male' : return 'Laki-Laki';
    case 'female' : return 'Perempuan';
    default: return 'Tidak Diketahui';
  }
}

const getAgeText = (day) => {
  if (!day) return "";
				
  const birthDay = new Date(day);
  const now = new Date();

  let year = now.getFullYear() - birthDay.getFullYear();
  let month = now.getMonth() - birthDay.getMonth();

  if (month < 0) {
    year -= 1;
    month += 12;
  }

  return `${year !== 0 ? year + " Tahun " : ""}${month} Bulan`;
}

const getAddress = (address) => {
  return `${address.street.toLowerCase().includes("jl") || address.street.toLowerCase().includes("jalan") ? "" : "Jl. "}${address.street} RT.${address.rt}/RW.${address.rw}${address.no ? " No." + address.no : ""}${address.village ? ", Kelurahan " + address.village : ""}${address.district ? ", Kecamatan " + address.district : ""}${address.city ? ", Kota " + address.city : ""}${address.province ? ", " + address.province : ""}${address.postalCode ? ", " + address.postalCode : ""}`;
}

export { moneyFormatter, dateFormatter, getGenderText, getAgeText, getAddress };
