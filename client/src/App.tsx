import React from 'react';
import logo from './logo.svg';
import { BrowserRouter,Routes,Route} from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import CourseListPage from './components/CourseListPage';
import SearchResultPage from './components/SearchResultPage';
import ProfilePage from './components/ProfilePage';

import { useNavigate } from 'react-router-dom';

  // const navigate = useNavigate();
  // navigate('INSERT PATH HERE')


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route  path='/' element={< HomePage />}></Route>
          <Route  path='/signin' element={< SignInPage />}></Route>
          <Route  path='/signup' element={< SignUpPage />}></Route>
          <Route  path='/courses' element={< CourseListPage />}></Route>
          <Route  path='/search' element={< SearchResultPage />}></Route>
          <Route  path='/profile' element={< ProfilePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
