import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './helper/AuthContext';
import { AuthorizeUser } from './middleware/auth';

// importing all components 
import Password from './Components/Password'
import Register from './Components/Register'
import Username from './Components/Username'
import PageNotFound from './Components/PageNotFound'
import UserHome from './Components/UserHome';

// root routes 
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/password',
    element: <Password/>
  },
  {
    path: '/userhome',
    element: <AuthorizeUser><UserHome/></AuthorizeUser>
  },
  {
    path: '/*',
    element: <PageNotFound/>
  }
])

function App() {


  return (
    <main>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </main>
  );
}

export default App;

  // {
  //   path: '/reset',
  //   element: <Reset/>
  // },
  // {
  //   path: '/profile',
  //   element: <Profile/>
  // },
  // {
  //   path: '/recovery',
  //   element: <Recovery/>
  // },
