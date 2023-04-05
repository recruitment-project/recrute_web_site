

import Footer from '../../components/home/Footer';
import Header from '../../components/home/Header';
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
      <Header />
      <HeroArea />
      <Services />
      <UploadResume />
      <About />
      
      <Footer />
 </>
  )
}
