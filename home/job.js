
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useState } from 'react';
import cls from 'classnames';

const Job = ({ job }) => {
  const [isHeartActive, setHeartActive] = useState(false);

  const heartToggle = () => {
    setHeartActive(!isHeartActive);
  };

  return (
    <div className="box">
      <span
        className={cls(
          "heartWrapper",
          isHeartActive ? `active` : ''
        )}
        onClick={heartToggle}
      >
        {isHeartActive ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        <span className="styling"/>
      </span>
      <div className="top">
        <div>
          <span>
            <span className="logoWrapper">
              <img src="imgUrl" />
            </span>
          </span>
        </div>
        <div>
          <a href='#'>"title"</a>
          <p>{job.company}</p>
          <div>
            <LocationOnOutlinedIcon />
            {job.location}
          </div>
        </div>
        <span>Posted day: {job.posted}</span>
      </div>
      <hr />
      <div className="bottom">
        <div>
          <div>
            <SignalCellularAltOutlinedIcon />
            {job.experience} year exp
          </div>
        </div>
        <div>
          <div>
            <AccessTimeOutlinedIcon />
            {job.type}
          </div>
        </div>
        <div>
          <div>
            <LocalAtmOutlinedIcon />
            {job.pay}
          </div>
        </div>
        <div>
          <div>
            <PersonOutlineOutlinedIcon />
            {job.level}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;