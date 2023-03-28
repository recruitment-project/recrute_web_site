
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SavedSearchOutlinedIcon from '@mui/icons-material/SavedSearchOutlined';


const UploadResume = () => {
  return (
    <section className="uploadResume">
      <div className='container'>
        <span>For Candidates</span>
        <h2>Explore Thousands of Jobs</h2>
        
        <div className="stepsContainer" wrap='nowrap'>
          <div>
            <div className="iconWrapper">
              <NoteAddOutlinedIcon />
            </div>
            <span>STEP 1</span>
            <h5>Create an account</h5>
            
          </div>
          <div>
            <div className="iconWrapper">
              <AccountBoxOutlinedIcon />
            </div>
            <span>STEP 2</span>
            <h5>Complete your profile</h5>
            
          </div>
          <div>
            <div className="iconWrapper">
              <SavedSearchOutlinedIcon />
            </div>
            <span>STEP 3</span>
            <h5>Search your job</h5>
       
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default UploadResume;