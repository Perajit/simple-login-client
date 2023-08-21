import { ChangeEventHandler, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, RegisterOptions, SubmitHandler } from 'react-hook-form';
import { AxiosError } from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, Button, Stack, Typography } from '@mui/material';
import { axiosInstance } from '../axios-instance';
import { useUserContext, UserProfile } from '../user-context';

const LOGIN_URL = '/auth/login';

type FormValues = {
  userName: string;
  password: string;
};

async function loginUser(userName: string, password: string) {
  return axiosInstance.post(LOGIN_URL, { userName, password }, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const userContext = useUserContext();

  const { register, handleSubmit, setValue, reset, formState } = useForm<FormValues>();
  const { errors } = formState;

  const [errorMessage, setErrorMessage] = useState('');

  const inputValidations: Record<keyof FormValues, RegisterOptions> = {
    userName: {
      required: 'Email is required',
      validate: {
        matchPattern: (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'Invalid email format',
      },
    },
    password: {
      required: 'Password is required'
    },
  };

  const inputChangeHandler: (fieldName: keyof FormValues) => ChangeEventHandler<HTMLInputElement> = (fieldName) => (e) => {
    setValue(fieldName, e.target.value);
    setErrorMessage('');
  };

  const onSubmitForm: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await loginUser(data.userName, data.password);
      const userProfile = res.data as UserProfile;
  
      userContext.setProfile(userProfile);
      navigate('/');
    } catch(e) {
      console.log(e);
      const error = e as AxiosError;
      const errorResponseData = error.response?.data as { message: string } | undefined
      const errorMessage = errorResponseData?.message ?? error.message;
      setErrorMessage(errorMessage);
    }
  };
  
  return (
    <Box
      component="form"
      name="login"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <Stack spacing={2} sx={{ mx: 'auto', my: 2, maxWidth: '50%' }}>
        <Typography component="h1" variant="h5">Sign In</Typography>
        <TextField
          type="email"
          label="Email"
          placeholder="your-email@mail.com"
          {...register('userName', inputValidations.userName)}
          error={!!errors.userName}
          helperText={errors.userName?.message}
          onChange={inputChangeHandler('userName')}
        />
        <TextField
          type="password"
          label="Password"
          placeholder="password"
          {...register('password', inputValidations.password)}
          error={!!errors.password}
          helperText={errors.password?.message}
          onChange={inputChangeHandler('password')}
        />
        <Stack direction="row" spacing={2} justifyContent="end">
          <Button type="button" variant="text" onClick={() => reset()}>clear</Button>
          <Button type="submit" variant="contained">submit</Button>
        </Stack>
      </Stack>
      {errorMessage ? (<Alert severity="error">{errorMessage}</Alert>) : null}
    </Box>
  )
};

export default LoginForm;
