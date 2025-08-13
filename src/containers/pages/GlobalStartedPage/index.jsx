import { Box, Button, CardMedia, Typography } from '@mui/material';
import LogoCircleShadow from 'assets/images/logo/NutriTreeCircleShadow.png';
import IconLocationMap from 'assets/images/icon/LocationMap.png';
import IllustrationServiceA from 'assets/images/illustration/ServiceA.svg';
import IllustrationServiceB from 'assets/images/illustration/ServiceB.svg';
import IllustrationServiceC from 'assets/images/illustration/ServiceC.svg';
import IllustrationEcosistem from 'assets/images/illustration/Ecosistem.svg';
import ToolbarStarted from 'components/elements/ToolbarStarted';
import PageRoot from './styled';
import { BoxTransition } from 'components/elements/MotionTransitions';

export default function GlobalStartedPage(props) {
  return (
    <PageRoot>
      <Box className="content section-one">
        <ToolbarStarted buttonLink="/admin-login" buttonText="Halaman Login" />

        <Box className="box-content">
          <BoxTransition variant="fade">
            <Typography variant="h1" component="h1">
              NutriTree
            </Typography>
            <Typography variant="p" component="p">
              Kami merancang sistem pemantauan gizi balita yang modern dan mudah digunakan, berbasis teknologi Decision Tree CHAID untuk memastikan hasil klasifikasi yang cepat dan akurat. NutriTree membantu kader Posyandu, Puskesmas, dan orang tua dalam memantau pertumbuhan anak melalui pencatatan data yang rapi, grafik perkembangan sesuai standar WHO, dan laporan yang siap digunakan kapan saja. Dengan NutriTree, setiap data gizi menjadi dasar keputusan yang tepat untuk mendukung tumbuh kembang anak yang sehat.
            </Typography>
            <Box className="map-desc">
              <CardMedia component="img" src={IconLocationMap} />
              <Typography variant="p" component="p">
                Jl. Kamboja No.10, RT.10/RW.1, Kb. Pala, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13650
              </Typography>
            </Box>
          </BoxTransition>
          <BoxTransition variant="fadeZoomRotate">
            <CardMedia component="img" src={LogoCircleShadow} />
          </BoxTransition>
        </Box>
        <BoxTransition variant="fade">
          <Button
            onClick={() => {
              window.open(
                "https://www.google.com/maps/place/RPTRA+Kebon+Pala/@-6.2632746,106.8783597,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f2e4423229dd:0xa61abb482bcce73d!8m2!3d-6.2632799!4d106.8809346!16s%2Fg%2F11cjqtks31?entry=ttu&g_ep=EgoyMDI1MDgxMC4wIKXMDSoASAFQAw%3D%3D",
                '_blank'
              );
            }}
            variant="contained"
          >
            Lihat Google Maps
          </Button>
        </BoxTransition>
      </Box>
      <Box className="content section-two">
        <BoxTransition>
          <Typography variant="h2" component="h2">
            Layanan Kami
          </Typography>
          <Box className="list-card-service">
            <Box className="card-service">
              <Typography variant="h3" component="h3">
                Klasifikasi<br/>Gizi Otomatis
              </Typography>
              <CardMedia component="img" src={IllustrationServiceA} />
              <Typography variant="p" component="p">
                Memanfaatkan metode Decision Tree CHAID untuk menentukan status gizi secara cepat dan akurat, hanya dengan memasukkan data tinggi badan, berat badan, dan usia.
              </Typography>
            </Box>
            <Box className="card-service">
              <Typography variant="h3" component="h3">
                Grafik<br/>Pertumbuhan Interaktif
              </Typography>
              <CardMedia component="img" src={IllustrationServiceB} />
              <Typography variant="p" component="p">
                Menyajikan perkembangan balita dalam bentuk grafik BB/U, TB/U, dan BB/TB sesuai standar WHO, sehingga memudahkan pemantauan jangka panjang.
              </Typography>
            </Box>
            <Box className="card-service">
              <Typography variant="h3" component="h3">
                Laporan & Rekap<br/>Data Instan
              </Typography>
              <CardMedia component="img" src={IllustrationServiceC} />
              <Typography variant="p" component="p">
                Menghasilkan laporan bulanan atau tahunan dalam format PDF atau Excel, siap dikirim ke Puskesmas atau Dinas Kesehatan tanpa proses manual yang rumit.
              </Typography>
            </Box>
          </Box>
          <Typography variant="p" component="p">
            Untuk menikmati layanan diatas, kamu dapat masuk menggunakan akun yang telah terdaftar
          </Typography>
        </BoxTransition>
      </Box>
      <Box className="content section-three">
        <BoxTransition>
          <CardMedia component="img" src={IllustrationEcosistem} />
          <Box className="app-description">
            <Typography variant="h2" component="h2">
              Deskripsi Platform
            </Typography>
            <Typography variant="p" component="p">
              NutriTree adalah platform pemantauan gizi balita berbasis teknologi Decision Tree CHAID yang dirancang untuk membantu Posyandu, Puskesmas, dan orang tua memantau pertumbuhan anak secara lebih mudah, cepat, dan akurat. Melalui pencatatan data yang terstruktur, grafik perkembangan sesuai standar WHO, serta laporan yang dapat diunduh kapan saja, NutriTree memudahkan pengambilan keputusan untuk tindakan preventif maupun intervensi gizi. Dengan dukungan teknologi ini, kami berkomitmen membantu mewujudkan generasi yang sehat, kuat, dan siap menghadapi masa depan.
            </Typography>
          </Box>
        </BoxTransition>
      </Box>
    </PageRoot>
  );
}
