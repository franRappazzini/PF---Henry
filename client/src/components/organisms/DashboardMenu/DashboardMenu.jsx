import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import {MdOutlineDashboard} from 'react-icons/md'
import {FaUsers} from 'react-icons/fa'
import {RiShoppingBag3Fill} from 'react-icons/ri'
import style from './DashboardMenu.module.css'
import SearchBar2 from '../SearchBar2/SearchBar2';

export default function DashboardMenu({setOption}) {
  const [selectedIndex, setSelectedIndex] = React.useState('dashboard');

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setOption(index)
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#f6f7f9' }}>
      <List component="nav">
        <ListItemButton
          className={style.optionButton}
          selected={selectedIndex === 'dashboard'}
          onClick={(event) => handleListItemClick(event, 'dashboard')}
          style={{borderRadius:'0.4vw'}}
        >
          <ListItemText primary={<div className={selectedIndex==='dashboard'?style.buttonContentChecked:style.buttonContent}><MdOutlineDashboard size={25} className={style.icon}/> Dashboard </div>} />
        </ListItemButton>
        <ListItemButton
          className={style.optionButton}
          selected={selectedIndex === 'users'}
          onClick={(event) => handleListItemClick(event, 'users')}
          style={{borderRadius:'0.4vw'}}
        >
          <ListItemText primary={<div className={selectedIndex==='users'?style.buttonContentChecked:style.buttonContent}><FaUsers size={25} className={style.icon}/><div className={style.buttonTitle}>Users</div> </div>} />
        </ListItemButton>
        <ListItemButton
          className={style.optionButton}
          selected={selectedIndex === 'products'}
          onClick={(event) => handleListItemClick(event, 'products')}
          style={{borderRadius:'0.4vw'}}
        >
          <ListItemText primary={<div className={selectedIndex==='products'?style.buttonContentChecked:style.buttonContent}><RiShoppingBag3Fill size={25} className={style.icon}/> Products </div>} />
        </ListItemButton>
      </List>
    </Box>
  );
}