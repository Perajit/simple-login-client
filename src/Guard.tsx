import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from './user-context';

type GuardProps = {
  content: ReactElement;
};

const Guard: FC<GuardProps> = ({ content }) => {
  const userContext = useUserContext();
  const isUnauthenticated = !userContext.profile;

  return isUnauthenticated ? <Navigate to="/login" replace /> : content;
};

export default Guard;
