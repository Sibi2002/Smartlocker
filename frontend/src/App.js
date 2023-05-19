import { Route, Routes,BrowserRouter } from 'react-router-dom';
import LogIn from './component/LogIn';
import Signup from './component/Signup';
import Navigation from './component/Navigation';
import About from './component/About';
import UserLog from './Authtorization/UserLog';
import Refresher from './Authtorization/Refresher';
import { AuthProvider } from './Authtorization/AuthProvider';
import LockerLocate from './Authtorization/LockerLocate';
import Requireauth from './Authtorization/RequireAuth';
import OTPVerification from './component/OTPVerification';


function App() {
  return (<>
   <AuthProvider>
    <BrowserRouter>
    <Navigation></Navigation>
    <Routes>
    <Route element={<Refresher></Refresher>}>
    <Route element={<Requireauth></Requireauth>}>
    <Route element={<LockerLocate></LockerLocate>}>
    <Route path="/" element={<OTPVerification></OTPVerification>}/>
    </Route>
    </Route>
     <Route path='/about' element={<About></About>}></Route>
     <Route path='/login' element={<UserLog><LogIn></LogIn></UserLog>}></Route>
     <Route path='/signup' element={<UserLog><Signup></Signup></UserLog>}></Route>
     </Route>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App;
