import { FC } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { axiosInstance } from "../axios-instance";
import { useUserContext } from '../user-context';
import AppHeader from '../AppHeader';

const HomePage: FC = () => {
  const userContext = useUserContext();
  const userProfile = userContext.profile;

  const onTestClick = () => {
    try {
      axiosInstance.get('/test');
    } catch(e) {
      console.log({ e });
    }
  }

  return (
    <Box display="flex">
      <AppHeader />
      {
        userProfile ? (
          <Box component="main" sx={{ mt: 10, mx: 'auto' }}>
            <Stack spacing={2}>
              <Typography variant="body1">Welcome user {userProfile.userName}.</Typography>
              <Button variant="outlined" onClick={onTestClick}>Test request with credentials</Button>
            </Stack>
          </Box>
        ) : null
      }
    </Box>
  );
}

export default HomePage;
