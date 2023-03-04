
import JOBS from './featuredData.data';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

import Job from '../job';
const FeaturedJobs = () => {
  return (
    <section className="featuredJobs">
      <div className='container'>
        <div className="text">
          <div>
            <span>Featured Jobs</span>
          </div>
          <div>
            <h3>
              Jobs available! Apply to Editorial Specialist, Account Manager,
              Human Resources Specialist and more!
            </h3>
          </div>
        </div>
        <div className="grid" wrap='nowrap'>
          {JOBS.map((job, index) => {
            return <Job key={index} job={job} />;
          })}
        </div>
        <div className="btnWrapper">
          <button>
            View All Jobs
            <span className="btnIconWrapper">
              <ArrowRightAltRoundedIcon />
            </span>
            <span className="styling" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;