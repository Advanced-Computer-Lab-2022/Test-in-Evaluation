import React from 'react';
import '../style/Navbar.css'
import '../App.css'
import NavSearchBar from './NavSearchBar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();

  return (
    <div className="Navbar">
      <Button variant='contained' onClick={() => {navigate('/')}}>Home</Button>
      <NavSearchBar/>
      <Button variant='contained' onClick={() => {navigate('/courses')}}>Course List</Button>
      <Button variant='contained' onClick={() => {navigate('/signup')}}>Sign Up</Button>
      <Button variant='contained' onClick={() => {navigate('/signin')}}>Sign in</Button>
      <Button variant='contained' onClick={() => {navigate('/profile')}}>Profile</Button>
    </div>
  );
}

export default Navbar;