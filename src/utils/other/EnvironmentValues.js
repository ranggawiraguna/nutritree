const tableDisplayType = {
  row: 'row',
  card: 'card'
};
const timeline = [
  {
    value: 'tahun',
    label: 'Tahun'
  },
  {
    value: 'bulan',
    label: 'Bulan'
  },
  {
    value: 'hari',
    label: 'Hari'
  }
];

const timelineValues = (() => {
  const weekly = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  const current = new Date();
  const year = current.getFullYear();
  const day = current.getDay() - 1;

  return {
    [timeline[0].value]: [year, year - 1, year - 2, year - 3, year - 4, year - 5, year - 6, year - 7, year - 8, year - 9],
    [timeline[1].value]: [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember'
    ],
    [timeline[2].value]: weekly.map((e, i) => {
      const result = (day - i) % 7;
      return weekly[result < 0 ? result + 7 : result];
    })
  };
})();

const reverseTimelineValue = (value, timeline) => {
  const temp = [...value];
  if (timeline === 'tahun' || timeline === 'hari') temp.reverse();
  return temp;
};

const colors = ['#B11900', '#6DAFA7', '#359AFF', "#a73cffff", "#FFD43C", "#ff9a3cff"]

export {
  tableDisplayType,
  timeline,
  timelineValues,
  reverseTimelineValue,
  colors
};
