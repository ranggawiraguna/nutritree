import { Box, Button, CardMedia, ClickAwayListener, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Component from './styled';
import DashboardWelcomeBanner from 'assets/images/background/DashboardWelcomeBanner.svg';
import OptionItemB from 'assets/images/icon/DashboardItemBlueOption.svg';
import OptionItemC from 'assets/images/icon/DashboardItemPurpleOption.svg';
import IconItemB from 'assets/images/icon/DashboardItemBlueIcon.svg';
import IconItemC from 'assets/images/icon/DashboardItemPurpleIcon.svg';
import IconMarkQuestion from 'assets/images/icon/MarkQuestion.svg';
import IconCardNoteInfo from 'assets/images/icon/DashboardCardNoteInfo.svg';
import IconCardNote from 'assets/images/icon/DashboardCardNote.svg';
import AutoSizeText from 'components/elements/AutoSizeText';
import ChartSingle from 'components/elements/ChartSingle';
import ChartMultiple from 'components/elements/ChartMultiple';
import LayerOverlayDetail from 'components/elements/LayerOverlayDetail';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { reverseTimelineValue, timeline, timelineValues } from 'utils/other/EnvironmentValues';
import { moneyFormatter } from 'utils/other/Services';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'config/database/firebase';

export default function DashboardGrid({ itemValues }) {
  const accountReducer = useSelector((state) => state.accountReducer);
  const navigate = useNavigate();

  const timelineValue = reverseTimelineValue(timelineValues[timeline[1].value], timeline[1].value)

  const [appVisits, setAppVisits] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [isOpenOptionItemB, setIsOpenOptionItemB] = useState(false);
  const [isOpenOptionItemC, setIsOpenOptionItemC] = useState(false);

  const [isOpenLayerItemG, setIsOpenLayerItemG] = useState(false);
  const [isOpenLayerItemJ, setIsOpenLayerItemJ] = useState(false);
  const [isOpenLayerItemK, setIsOpenLayerItemK] = useState(false);

  useEffect(() => {
    const listenerAppVisits = onSnapshot(collection(db, 'appvisits'), (snapshot) =>
      setAppVisits(
        snapshot.docs.map((document) => ({
          customerId: document.data().customerId,
          dateCreated: document.data().dateCreated
        }))
      )
    );

    const listenerCustomers = onSnapshot(collection(db, 'customers'), (snapshot) =>
      setCustomers(
        snapshot.docs.map((document) => ({
          id: document.id,
          dateCreated: document.data().dateCreated
        }))
      )
    );

    return () => {
      listenerAppVisits();
      listenerCustomers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Component>
      <Box gridArea="A">
        <Box className="dashboard-item">
          <CardMedia component="img" src={DashboardWelcomeBanner} />
          <Box>
            <Box />
            <Box />
          </Box>
          <Box>
            <Box />
            <Box>
              <Box>
                <AutoSizeText>Selamat Datang,</AutoSizeText>
                <AutoSizeText>{accountReducer.fullname}</AutoSizeText>
              </Box>
              <Box />
              <AutoSizeText>
                Dukung upaya pemantauan gizi anak dengan data akurat dan mudah dipahami. <br />
                Mari bersama meningkatkan kesehatan dengan memanfaatkan teknologi NutriTree.
              </AutoSizeText>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box gridArea="B">
        <Box className="dashboard-item">
          <Box gridArea="A">
            <Box>
              <AutoSizeText>
                {itemValues[0].title.split('-')[0]}
                <br />
                {itemValues[0].title.split('-')[1]}
              </AutoSizeText>
            </Box>
            <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={() => setIsOpenOptionItemB(false)}>
              <Box>
                <Button type="Button" onClick={() => setIsOpenOptionItemB((prev) => !prev)}>
                  <CardMedia component="img" src={OptionItemB} />
                </Button>
                {isOpenOptionItemB ? (
                  <Box>
                    <Button onClick={() => navigate(`/${accountReducer.role}/${itemValues[0].path}`)}>Lihat Detail</Button>
                  </Box>
                ) : null}
              </Box>
            </ClickAwayListener>
          </Box>
          <Box gridArea="B">
            <AutoSizeText>{itemValues[0].data}</AutoSizeText>
          </Box>
          <Box gridArea="C">
            <CardMedia component="img" src={IconItemB} />
            <Box>
              <AutoSizeText>
                {itemValues[0].note.split('-')[0]}
                <br />
                {itemValues[0].note.split('-')[1]}
              </AutoSizeText>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box gridArea="C">
        <Box className="dashboard-item">
          <Box gridArea="A">
            <Box>
              <AutoSizeText>
                {itemValues[1].title.split('-')[0]}
                <br />
                {itemValues[1].title.split('-')[1]}
              </AutoSizeText>
            </Box>
            <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={() => setIsOpenOptionItemC(false)}>
              <Box>
                <Button type="Button" onClick={() => setIsOpenOptionItemC((prev) => !prev)}>
                  <CardMedia component="img" src={OptionItemC} />
                </Button>
                {isOpenOptionItemC ? (
                  <Box>
                    <Button onClick={() => navigate(`/${accountReducer.role}/${itemValues[1].path}`)}>Lihat Detail</Button>
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
            </ClickAwayListener>
          </Box>
          <Box gridArea="B">
            <AutoSizeText>{itemValues[1].data}</AutoSizeText>
          </Box>
          <Box gridArea="C">
            <CardMedia component="img" src={IconItemC} />
            <Box>
              <AutoSizeText>
                {itemValues[1].note.split('-')[0]}
                <br />
                {itemValues[1].note.split('-')[1]}
              </AutoSizeText>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box gridArea="D">
        <Box className="dashboard-item">
          <Box gridArea="A">
            <Typography variant="h2" component="h2">
              {itemValues[2].title}
            </Typography>
          </Box>
          <Box gridArea="B"/>
          <Box gridArea="C"/>
          <Box gridArea="D">
           <ChartMultiple
            id={`Chart${itemValues[2].title.replace(' ', '')}`}
            type="line"
            label={timelineValue.slice(0,new Date().getMonth()+1).map((_)=>_.slice(0,3))}
            datas={itemValues[2].notes.map((_)=> ({
              name: _,
              data:  timelineValue.slice(0,new Date().getMonth()+1).map((__,___)=>itemValues[2].datas.filter((data) => data.status === _).filter((data)=>new Date(data.date).getMonth()===___).length)
            }))}
            notes={itemValues[2].notes.map((_)=>_.replaceAll("Gizi ", ""))}
            colors={itemValues[2].colors}
          />
          </Box>
        </Box>
      </Box>
      <Box gridArea="E">
        <Box className="dashboard-item">
          <Box gridArea="A">
            <Typography variant="h2" component="h2" sx={{ textAlign: 'start' }}>
              {itemValues[3].title.split('-')[0]}
              <br />
              {itemValues[3].title.split('-')[1]}
            </Typography>
          </Box>
          <Box gridArea="B">
            <CardMedia component="img" src={IconCardNoteInfo} />
          </Box>
          <Box gridArea="C">
            <Typography variant="p" component="p" sx={{ textAlign: 'start' }}>
              Perhitungan Bulan ini
            </Typography>
          </Box>
          <Box gridArea="D">
            <CardMedia component="img" src={itemValues[3].icon} />
          </Box>
          <Box gridArea="E">
            <CardMedia component="img" src={IconCardNote} />
          </Box>
          <Box gridArea="F">
            <Typography variant="h3" component="h3" sx={{ textAlign: 'start' }}>
              {itemValues[3].data}
            </Typography>
          </Box>
          <Box gridArea="G">
            <Typography variant="h4" component="h4" sx={{ textAlign: 'start' }}>
              {itemValues[3].unit}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box gridArea="F">
        <Box className="dashboard-item">
          <Box gridArea="A">
            <Typography variant="h2" component="h2" sx={{ textAlign: 'start' }}>
              {itemValues[4].title.split('-')[0]}
              <br />
              {itemValues[4].title.split('-')[1]}
            </Typography>
          </Box>
          <Box gridArea="B">
            <CardMedia component="img" src={IconCardNoteInfo} />
          </Box>
          <Box gridArea="C">
            <Typography variant="p" component="p" sx={{ textAlign: 'start' }}>
              Perhitungan Bulan ini
            </Typography>
          </Box>
          <Box gridArea="D">
            <CardMedia component="img" src={itemValues[4].icon} />
          </Box>
          <Box gridArea="E">
            <CardMedia component="img" src={IconCardNote} />
          </Box>
          <Box gridArea="F">
            <Typography variant="h3" component="h3" sx={{ textAlign: 'start' }}>
              {itemValues[4].unit === 'Rupiah' ? moneyFormatter(itemValues[4].data).replace('Rp. ', '') : itemValues[4].data}
            </Typography>
          </Box>
          <Box gridArea="G">
            <Typography variant="h4" component="h4" sx={{ textAlign: 'start' }}>
              {itemValues[4].unit}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box gridArea="G">
        <Box className="dashboard-item container-layer">
          <Box gridArea="A">
            <Typography variant="h2" component="h2" sx={{ textAlign: 'start' }}>
              {itemValues[5].title}
            </Typography>
          </Box>
          <Box gridArea="B"/>
          <Box gridArea="C">
            {
              itemValues[5].data?.length > 0 ? <ChartSingle
                id={`Chart${itemValues[5].title.replace(' ', '')}`}
                type="pie"
                label={["Balita Awal", "Balita Menengah", "Balita Lanjutan"]}
                data={[6,12,60].map(
                  (_)=>itemValues[5].data.filter((d)=>{
                    if (!d.birthDay) return false;

                    const birthDay = new Date(d.birthDay);
                    const now = new Date();
                    const ageInMonths = (now.getFullYear() - birthDay.getFullYear()) * 12 + (now.getMonth() - birthDay.getMonth());

                    return  ageInMonths <= _;
                  }).length
              )}
                colors={itemValues[5].colors}
              /> : <></>
            }
          </Box>
          <Box gridArea="D">
            <Button variant="contained" onClick={() => setIsOpenLayerItemG(true)}>
              Lihat Keterangan Detail
            </Button>
          </Box>
          <LayerOverlayDetail
            isOpen={isOpenLayerItemG}
            onClose={() => setIsOpenLayerItemG(false)}
            label={["Balita Awal", "Balita Menengah", "Balita Lanjutan"]}
            description={["Balita yang berumur antara 0-6 bulan", "Balita yang berumur antara 7-12 bulan", "Balita yang berumur antara 1-5 tahun"]}
            colors={['#B11900', '#e7ba3f', '#6DAFA7' ]}
          />
        </Box>
      </Box>
      <Box gridArea="H">
        <Box className="dashboard-item">
          <Box gridArea="A">
            <Typography variant="h2" component="h2">
              {itemValues[6].title}
            </Typography>
          </Box>
          <Box gridArea="B"/>
          <Box gridArea="C"/>
          <Box gridArea="D">
            <ChartMultiple
              id={`Chart${itemValues[6].title.replace(' ', '')}`}
              type="line"
              label={timelineValue.slice(0,new Date().getMonth()+1).map((_)=>_.slice(0,3))}
              datas={[{
                name : '0-6 Bulan',
                index : 6
              },{
                name : '7-12 Bulan',
                index : 7
              },{
                name : '1-5 Tahun',
                index : 60
              }].map((section)=>({
                name :section.name,
                data : timelineValue.slice(0,new Date().getMonth()+1).map((_,__)=>itemValues[6].datas.filter(
                  (_)=>{
                    if (!_.birthDay) return false;

                    const birthDay = new Date(_.birthDay);
                    const now = new Date();
                    const ageInMonths = (now.getFullYear() - birthDay.getFullYear()) * 12 + (now.getMonth() - birthDay.getMonth());

                    return new Date(_.date).getMonth() === __ && ageInMonths <= section.index;
                  }).length
              )}))}
              notes={itemValues[6].notes}
              colors={itemValues[6].colors}
            />
          </Box>
        </Box>
      </Box>
      {
        accountReducer.role === 'soon' ? <>
        <Box gridArea="I">
          <Box className="dashboard-item">
            <Box gridArea="A">
              <Typography variant="h2" component="h2">
                Kunjungan Aplikasi
              </Typography>
            </Box>
            <Box gridArea="B"/>
            <Box gridArea="C"/>
            <Box gridArea="D">
              <ChartSingle
                id={`ChartKunjunganAplikasi`}
                type="bar"
                label={timelineValue.slice(0,new Date().getMonth()+1).map((_)=>_.slice(0,3))}
                data={[]}
                color="#FFD43C"
              />
            </Box>
          </Box>
        </Box>
        <Box gridArea="J">
          <Box className="dashboard-item container-layer">
            <Box gridArea="A">
              <Typography variant="h2" component="h2">
                Petugas Terdaftar
              </Typography>
            </Box>
            <Box gridArea="B">
              {
                customers?.length > 0 ? <ChartSingle
                id={`ChartPenggunaTerdaftar`}
                type="pie"
                label={['Pengguna Baru', 'Pengguna Lama']}
                data={[
                  customers.filter((customer) => customer.dateCreated.toDate() >= new Date(new Date().setDate(new Date().getDate() - 30)))
                    ?.length,
                  customers.filter((customer) => customer.dateCreated.toDate() < new Date(new Date().setDate(new Date().getDate() - 30)))
                    ?.length
                ]}
                colors={['#B05AF3', '#7BA7FF']}
              /> : <></>
              }
            </Box>
            <Box gridArea="C" sx={{ backgroundColor: '#B05AF3' }} />
            <Box gridArea="D">
              <Typography variant="h4" component="h4">
                Petugas Baru
              </Typography>
            </Box>
            <Box gridArea="E" sx={{ backgroundColor: '#7BA7FF' }} />
            <Box gridArea="F">
              <Typography variant="h4" component="h4">
                Petugas Lama
              </Typography>
            </Box>
            <Box gridArea="G">
              <Button onClick={() => setIsOpenLayerItemJ(true)}>
                <CardMedia component="img" src={IconMarkQuestion} />
              </Button>
            </Box>
            <LayerOverlayDetail
              isOpen={isOpenLayerItemJ}
              onClose={() => setIsOpenLayerItemJ(false)}
              label={['Petugas Baru', 'Petugas Lama']}
              description={[
                'Petugas yang baru saja mendaftar dalam jangka waktu kurang dari 1 bulan',
                'Petugas yang telah mendaftar dalam jangka waktu 1 bulan atau lebih'
              ]}
              colors={['#B05AF3', '#7BA7FF']}
            />
          </Box>
        </Box>
        <Box gridArea="K">
          <Box className="dashboard-item container-layer">
            <Box gridArea="A">
              <Typography variant="h2" component="h2">
                Status Petugas
              </Typography>
            </Box>
            <Box gridArea="B">
              {
                appVisits?.length > 0 ? <ChartSingle
                  id={`ChartStatusPetugas`}
                  type="pie"
                  label={['Petugas Aktif', 'Petugas Nonaktif']}
                  data={[
                    new Set(
                      appVisits
                        .filter((appVisit) => appVisit.dateCreated.toDate() >= new Date(new Date().setDate(new Date().getDate() - 30)))
                        .map((appVisit) => appVisit.customerId)
                    ).size,
                    new Set(
                      appVisits
                        .filter((appVisit) => appVisit.dateCreated.toDate() < new Date(new Date().setDate(new Date().getDate() - 30)))
                        .map((appVisit) => appVisit.customerId)
                    ).size
                  ]}
                  colors={['#e7ba3f', '#6DAFA7']}
                /> : <></>
              }
            </Box>
            <Box gridArea="C" sx={{ backgroundColor: '#e7ba3f' }} />
            <Box gridArea="D">
              <Typography variant="h4" component="h4">
                Petugas Aktif
              </Typography>
            </Box>
            <Box gridArea="E" sx={{ backgroundColor: '#6DAFA7' }} />
            <Box gridArea="F">
              <Typography variant="h4" component="h4">
                Petugas Nonaktif
              </Typography>
            </Box>
            <Box gridArea="G">
              <Button onClick={() => setIsOpenLayerItemK(true)}>
                <CardMedia component="img" src={IconMarkQuestion} />
              </Button>
            </Box>
            <LayerOverlayDetail
              isOpen={isOpenLayerItemK}
              onClose={() => setIsOpenLayerItemK(false)}
              label={['Petugas Aktif', 'Petugas Nonaktif']}
              description={[
                'Petugas yang terdeteksi menggunakan aplikasi penjualan dalam jangka waktu sebulan terakhir',
                'Petugas yang terdeteksi tidak menggunakan aplikasi penjualan dalam jangka waktu sebulan terakhir'
              ]}
              colors={['#e7ba3f', '#6DAFA7']}
            />
          </Box>
        </Box>
        </> : <></>
      }      
    </Component>
  );
}