import * as React from 'react';
import { Fragment, useState } from 'react';
import { Typography } from '@mui/material';
import PageRoot from './styled';
import AlertToast from 'components/elements/AlertToast';
import { Box } from '@mui/system';
import BootstrapInput from 'components/elements/BootstrapInput';
import RadioInput from 'components/elements/RadioInput';
import PageContentHeader from 'components/elements/PageContentHeader';

export default function ToddlerForm({value, onSubmitForm}) {
  const [toddlerData, setToddlerData] = useState({
	nik: '',
	name: '',
	gender: '',
	birthDay: '',
	placeOfBirth: '',
	parentName: '',	
  });

  const [addressData, setAddressData] = useState({
	street: '',
	rt: '',
	rw: '',
	no: '',
	village: '',
	subDistrict: '',
	city: '',
	province: ''
  });

  const handleChangeToddlerData = (name, value) => setToddlerData({ ...toddlerData, [name]: value })

  const handleChangeAddressData = (name, value) => setAddressData({ ...addressData, [name]: value })

  const [alertDescription, setAlertDescription] = useState({
	isOpen: false,
	type: 'info',
	text: '',
	transitionName: 'slideUp'
  });
	
  const showAlertToast = (type, text) =>
	setAlertDescription({
	...alertDescription,
	isOpen: true,
	type: type,
	text: text
  });

  const handleSubmitForm = () => {
	console.log(toddlerData, addressData);
	console.log(toddlerData.nik && toddlerData.name && toddlerData.gender && toddlerData.birthDay && toddlerData.placeOfBirth && toddlerData.parentName && addressData.street && addressData.rt && addressData.rw && addressData.no && addressData.village && addressData.subDistrict && addressData.city && addressData.province);
	if(toddlerData.nik && toddlerData.name && toddlerData.gender && toddlerData.birthDay && toddlerData.placeOfBirth && toddlerData.parentName && addressData.street && addressData.rt && addressData.rw && addressData.no && addressData.village && addressData.subDistrict && addressData.city && addressData.province) {
		onSubmitForm({...toddlerData, address: addressData})
	} else {
	 	showAlertToast('warning', 'Silahkan lengkapi data balita terlebih dahulu');
	}
	// eslint-disable-next-line
  };

  React.useEffect(() => {
	if (value) {
	  setToddlerData({ ...toddlerData, ...value });
	  setAddressData({ ...addressData, ...value.address });
	}
	// eslint-disable-next-line
  }, []);

  return (
	<Fragment>
	  <PageRoot>
		<PageContentHeader title="Form Tambah Balita" buttonText="Simpan Data" buttonAction={handleSubmitForm} />
		<Box sx={{
			backgroundColor: 'rgba(255,255,255,0.75)', 
			padding: 2, 
			borderRadius: 1, 
			marginBottom: 2,
			paddingBottom: 3
		}}>
			<Typography variant="h4">Informasi Balita</Typography>
			<Box sx={{
				display:"grid",
				gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
				columnGap: 2,
			}}>
				<BootstrapInput title="Nomor Induk Kependudukan (NIK)" value={toddlerData["nik"]} setValueChanged={(_)=>handleChangeToddlerData("nik",_)} />
				<BootstrapInput title="Name" value={toddlerData["name"]} setValueChanged={(_)=>handleChangeToddlerData("name",_)} />		
				<RadioInput 
					title="Jenis Kelamin" 
					name="gender"
					options={[
						{ value: 'male', label: 'Laki-laki' },
						{ value: 'female', label: 'Perempuan' }
					]}
					direction="row"
					value={toddlerData["gender"]?.toLowerCase()} 
					setValueChanged={(_)=>handleChangeToddlerData("gender",_)}
				/>
				<BootstrapInput title="Tempat Lahir" value={toddlerData["placeOfBirth"]} setValueChanged={(_)=>handleChangeToddlerData("placeOfBirth",_)}/>
				<BootstrapInput title="Tanggal Lahir" type="date" value={toddlerData["birthDay"]} setValueChanged={(_)=>handleChangeToddlerData("birthDay",_)}/>
				<BootstrapInput title="Nama Orang Tua" value={toddlerData["parentName"]} setValueChanged={(_)=>handleChangeToddlerData("parentName",_)}/>
			</Box>
		</Box>
		<Box sx={{
			backgroundColor: 'rgba(255,255,255,0.75)', 
			padding: 2, 
			borderRadius: 1, 
			marginBottom: 2,
			paddingBottom: 3
		}}>
			<Typography variant="h4">Alamat Balita</Typography>
			<Box sx={{
				display:"grid",
				gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
				columnGap: 2,
			}}>
				<BootstrapInput title="Jalan" value={addressData["street"]} setValueChanged={(_)=>handleChangeAddressData("street",_)} />
				<BootstrapInput title="RT" value={addressData["rt"]} setValueChanged={(_)=>handleChangeAddressData("rt",_)} />
				<BootstrapInput title="RW" value={addressData["rw"]} setValueChanged={(_)=>handleChangeAddressData("rw",_)} />
				<BootstrapInput title="No" value={addressData["no"]} setValueChanged={(_)=>handleChangeAddressData("no",_)} />
				<BootstrapInput title="Kelurahan" value={addressData["village"]} setValueChanged={(_)=>handleChangeAddressData("village",_)} />
				<BootstrapInput title="Kecamatan" value={addressData["subDistrict"]} setValueChanged={(_)=>handleChangeAddressData("subDistrict",_)} />
				<BootstrapInput title="Kabupaten/Kota" value={addressData["city"]} setValueChanged={(_)=>handleChangeAddressData("city",_)} />
				<BootstrapInput title="Provinsi" value={addressData["province"]} setValueChanged={(_)=>handleChangeAddressData("province",_)} />
			</Box>
		</Box>
	  </PageRoot>
	  <AlertToast description={alertDescription} setDescription={setAlertDescription} />
	</Fragment>
  );
}
