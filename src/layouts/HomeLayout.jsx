import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import HomeHero from '../components/HomeHero';

const HomeLayout = () => {
    return (
      <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
    );
};

export default HomeLayout;