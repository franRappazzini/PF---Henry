import react, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { MdOutlineDashboard } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import { RiShoppingBag3Fill } from 'react-icons/ri'
import style from './DashboardMenu.module.css'
import { BsBoxSeam } from 'react-icons/bs'

export default function DashboardMenu({setOption}) {
  const [index, setIndex] = useState('dashboard');

  const handleListItemClick = (event, index) => {
    setIndex(index);
    setOption(index)
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#f6f7f9' }}>
      <List component="nav">
        <ListItemButton
          className={style.optionButton}
          selected={index === 'dashboard'}
          onClick={(event) => handleListItemClick(event, 'dashboard')}
          style={{borderRadius:'0.4vw'}}
        >
          <ListItemText primary={<div className={index==='dashboard'?style.buttonContentChecked:style.buttonContent}><MdOutlineDashboard size={25} className={style.icon}/> Dashboard </div>} />
        </ListItemButton>
        <ListItemButton
          className={style.optionButton}
          selected={index === 'users'}
          onClick={(event) => handleListItemClick(event, 'users')}
          style={{borderRadius:'0.4vw'}}
        >
          <ListItemText primary={<div className={index==='users'?style.buttonContentChecked:style.buttonContent}><FaUsers size={25} className={style.icon}/><div className={style.buttonTitle}>Users</div> </div>} />
        </ListItemButton>
        <ListItemButton
          className={style.optionButton}
          selected={index === 'products'}
          onClick={(event) => handleListItemClick(event, 'products')}
          style={{borderRadius:'0.4vw'}}
        >
          <ListItemText primary={<div className={index==='products'?style.buttonContentChecked:style.buttonContent}><RiShoppingBag3Fill size={25} className={style.icon}/> Products </div>} />
        </ListItemButton>
        <ListItemButton
          className={style.optionButton}
          selected={index === 'orders'}
          onClick={(event) => handleListItemClick(event, 'orders')}
          style={{borderRadius:'0.4vw'}}
        >
          <ListItemText primary={<div className={index==='orders'?style.buttonContentChecked:style.buttonContent}><BsBoxSeam size={25} className={style.icon}/> Orders </div>} />
        </ListItemButton>
      </List>
    </Box>
  );
}