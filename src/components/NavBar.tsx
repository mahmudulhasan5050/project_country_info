import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import MoreIcon from '@mui/icons-material/MoreVert';

import { InitialStateType } from '../redux/reducers';
import SearchBar from './SearchBar';
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  toolsbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
}
}));

export default function NavBar() {
  const navigate = useNavigate();
  const classes = useStyles();
  const favoriteCountryCount = useSelector((state:InitialStateType ) => state.favorite);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  let isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
const favButtonHandler = () => {
  navigate('/favorite');
  handleMobileMenuClose();
}
const homeHandle = () => {
  navigate('/');
  handleMobileMenuClose();
}
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={favButtonHandler}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" >
          <Badge badgeContent={favoriteCountryCount.length} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>My Favorites</p>
      </MenuItem>
      <MenuItem onClick={homeHandle}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" >
            <HomeIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>
    </Menu>
  );
//---------------------------------------------------------------
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            COUNTRY INTRO
          </Typography>
          <SearchBar/>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={favButtonHandler}>
              <Badge badgeContent={favoriteCountryCount.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={homeHandle}>
                 <HomeIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <div className={classes.toolsbarMargin} />
    </Box>
  );
}

