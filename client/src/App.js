import {Route, Routes, Navigate} from 'react-router-dom';
import Main from './components/main/main';
import Signup from './components/signup/signup';
import Login from './components/login/login';

function App() {
  const user = localStorage.getItem("token")
  return (
    <Routes>
      {user && <Route path='/' element={<Main/>}/>}
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Navigate replace to='/login'/>}/>
    </Routes>
  );
}

export default App;
