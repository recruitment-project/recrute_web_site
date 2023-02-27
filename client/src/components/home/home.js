
import CategoryArea from '../../components/home/CategoryArea';

import Footer from '../../components/home/Footer';
import Header from '../../components/home/Header';
import HeroArea from '../../components/home/HeroArea';
import Subscribe from '../../components/home/Subscribe';
import FeaturedJobs from  '../../components/home/FeaturedJob/FeaturedJob'
import SEO from '../../components/home/seo';

import '../../components/home/homec.scss';
import UploadResume from '../../components/home/uploadResume/UploadResume';
export default function Home() {

  return (
   <>
      <SEO pageTitle={'Home Default'} />
      <Header />
      <HeroArea />
      <CategoryArea />
      <UploadResume />
      <FeaturedJobs />
      <Subscribe />
      <Footer />
 </>
  )
}
