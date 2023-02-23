import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {IoMdNotifications} from "react-icons/io";
import Card from 'react-bootstrap/Card';
import avatar from '../../assets/avatar.png';
import { useHistory,useNavigate , NavLink } from 'react-router-dom';

export default function Header() {
return (
	<Card className='hide shadow'>
	<Card.Header > 
	<div className='hid' >

        <div className='pro'>
        
            <img src={avatar} className="imgpub" alt="avatar" />
           <div className='position'>nom de profile</div>
           </div>
          
	  <div className='position'>
		  <div className='pro'>
		  <span class="badges badge-pill">1</span><IoMdNotifications /></div>
		  </div>
	</div>
	</Card.Header>
  </Card>
);
}
