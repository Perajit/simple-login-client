import { FC } from 'react';
import LoginForm from './LoginForm';
import { Box } from '@mui/material';

const LoginPage: FC = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        alignItems: 'center',
        px: 2,
        py: 2,
      }}
    >
      <LoginForm />
    </Box>
  )
};

export default LoginPage;
