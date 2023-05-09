
import Footer from '../../components/home/Footer';
import Headerr from '../../components/home/Headerr';
import HeroArea from '../../components/home/HeroArea';
import About from  '../../components/home/about'
import SEO from '../../components/home/seo';
import Services from './service/services'
import '../../components/home/homec.scss';
import UploadResume from '../../components/home/uploadResume/UploadResume';
export default function Home() {

  return (
   <>
      <SEO pageTitle={'Home Default'} />
      <Headerr /> 
      <HeroArea />
      <Services />
      <UploadResume />
      <About />
      
      <Footer />
 </>
  )
}
