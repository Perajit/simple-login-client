import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { AppBar, Toolbar, Box, Button, Menu, MenuItem } from '@mui/material';
import { axiosInstance } from './axios-instance';
import { useUserContext } from './user-context';

const LOGOUT_URL = '/auth/logout';

async function logoutUser() {
  return axiosInstance.post(LOGOUT_URL);
}

const AppHeader = () => {
  const userContext = useUserContext();
  const userProfile = userContext.profile;

  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const onLogout = () => {
    userContext.setProfile(undefined);
    logoutUser();
    navigate('/login');
  };

  return userProfile ? (
    <AppBar position="fixed">
      <Toolbar color="inherit">
        <Box display="flex" justifyContent="end" flexGrow={1}>
          <Button
            aria-label="current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            startIcon={<AccountCircle />}
            sx={{ textTransform: 'none' }}
            onClick={(e) => { setMenuAnchor(e.currentTarget) }}
          >
            {userProfile.displayName}
          </Button>
          <Menu
            anchorEl={menuAnchor}
            open={!!menuAnchor}
            onClose={() => { setMenuAnchor(null) }}
          >
            <MenuItem onClick={onLogout}>Log Out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  ) : null;
};

export default AppHeader;
