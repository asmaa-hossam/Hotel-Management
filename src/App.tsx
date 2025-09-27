import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPageLayout from './modules/Shared/Components/LandingPageLayout/LandingPageLayout'
import NotFound from './modules/Shared/Components/NotFound/NotFound'
import Home from './modules/Home/Components/Home'
import ExplorPage from './modules/ExplorePage/Components/ExplorPage'
import DetailsPage from './modules/DetailsPage/Components/DetailsPage'
import Favourite from './modules/Favourites/Components/Favourite'
import UserProtectedRoute from './modules/Shared/Components/ProtectedRout/UserProtectedRoute'
import AuthLayout from './modules/Shared/Components/AuthLayout/AuthLayout'
import Register from './modules/Authontication/Components/Register/Register'
import Login from './modules/Authontication/Components/Login/Login'
import ChangePassword from './modules/Authontication/Components/ChangePassword/ChangePassword'
import ResetPassword from './modules/Authontication/Components/ResetPassword/ResetPassword'
import ForgetPassword from './modules/Authontication/Components/ForgetPassword/ForgetPassword'
import BookingPage from './modules/BookingPage/BookingPage'
import UserInfo from './modules/BookingPage/UserInfo'
import PaymentInfo from './modules/Booking/Components/PaymentInfo'
import BookingSuccess from './modules/BookingPage/BookingSuccess'
import ProtectedRoute from './modules/Shared/Components/ProtectedRout/ProtectedRoute'
import MasterLayout from './modules/Shared/Components/MasterLayout/MasterLayout'
import Dashboard from './modules/Dashboard/Components/Dashboard'
import RoomsList from './modules/Rooms/Components/RoomsList/RoomsList'
import RoomsForm from './modules/Rooms/Components/RoomsForm/RoomsForm'
import Advertisments from './modules/Advertisements/Components/Advertisments'
import BookingList from './modules/Booking/Components/BookingList'
import UsersList from './modules/User/Components/UsersList'
import Facilities from './modules/Facilities/Components/Facilities'
import { ThemeProvider } from '@mui/material/styles'
import theme from './themes/themes'
 
export default function App() {


  const routes=createBrowserRouter([
  {
    path:"",
    element:<LandingPageLayout/>,
    errorElement:<NotFound/>,
    children:[
      { index:true,element:<Home/>},
       {path:"home", element:<Home/>},
       {path:"explore",element:<ExplorPage/>},
        {path:"details/:roomid",element:<DetailsPage/>},

        {path:"favourite",element:(
        //  <UserProtectedRoute>
          <Favourite/>
          // </UserProtectedRoute>
        )
        }
    ]
  },
  {
path:"booking/:roomId",
element:<BookingPage/>,
errorElement:<NotFound/>,
children:[
  {index:true,element:<UserInfo/>},
  {path:"userInfo",element:<UserInfo/>},
  {path:"paymentInfo",element:<PaymentInfo/>},
  {path:"BookingSuccess",element:<BookingSuccess/>}
]
  },
  {
    path:"",
    element:<AuthLayout/>,
    errorElement:<NotFound/>,
    children:[
      {path:"register",element:<Register/>},
      {path:"login",element:<Login/>},
      {path:"changePassword",element:<ChangePassword/>},
      {path:"resetPassword",element:<ResetPassword/>},
      {path:"forgetPassword",element:<ForgetPassword/>}
    ]
  
  },
  {
    path:"",element:(
    <ProtectedRoute>
<MasterLayout/>
    </ProtectedRoute>
    ),
    errorElement:<NotFound/>,
    children:[
      {path:"dashboard",element:<Dashboard/>},
      {path:"rooms",element:<RoomsList/>},
      {path:"roomsForm",element:<RoomsForm/>},
       { path: "advertisments", element:<Advertisments/> },
        { path: "bookingg", element:<BookingList/> },
        { path: "users", element:<UsersList/> },
       { path: "facilities", element:<Facilities/> },

    ]
  },
  


  ])
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes} />
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  );
}