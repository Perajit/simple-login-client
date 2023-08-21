import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { UserProvider } from './user-context';
import Guard from './Guard';
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Guard content={<HomePage />} />
    )
  },
  {
    path: '/login',
    element: <LoginPage />
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
