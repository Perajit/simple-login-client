import { FC, createContext, useContext, PropsWithChildren, useState } from 'react';

export interface UserProfile {
  userId: number;
  userName: string;
  displayName: string;
  organization: string;
  group: string;
  roles: string[];
}

type UserState = {
  profile?: UserProfile;
  setProfile: (data?: UserProfile) => void;
}

const defaultUserState: UserState = {
  profile: undefined,
  setProfile: () => {}
};

const UserContext = createContext(defaultUserState);

export const useUserContext = () => useContext(UserContext);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>();

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserContext.Provider>
  )
};
