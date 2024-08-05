import './App.css';
import Post from './Post';
import Layout from './Layout';
import {Routes,Route} from 'react-router-dom'
import IndexPage from './Pages/IndexPage.js';
import LoginPage from './Pages/LoginPage.js';
import RegisterPage from './Pages/RegisterPage.js';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
