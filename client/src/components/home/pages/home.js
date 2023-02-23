import Hero from '../pages/Hero/Hero';
import UploadResume from '../pages/UploadResume/UploadResume';
import FeaturedJobs from '../pages/FeaturedJobs/FeaturedJobs';
import TopCompanies from '../pages/TopCompanies/TopCompanies';
import HotCategories from '../pages/HotCategories/HotCategories';
import GlobalConnections from '../pages/GlobalConnections/GlobalConnections';
import PostJob from '../pages/PostJob/PostJob';
import Testminonials from '../pages/Testimonials/Testimonials';
import Clients from '../pages/Clients/Clients';
import Blog from '../pages/Blog/Blog';
import DownloadApp from '../pages/DownloadApp/DownloadApp';
import Subscription from '../pages/Subscription/Subscription';

const Home = () => {
  return (
    <>
      <Hero title='Rawan' color='red' />
      <UploadResume />
      <FeaturedJobs />
      <TopCompanies />
      <HotCategories />
      <GlobalConnections />
      <PostJob />
      <Testminonials />
      {/* <Clients /> */}
      <Blog />
      <DownloadApp />
      <Subscription />
    </>
  );
};

export default Home;