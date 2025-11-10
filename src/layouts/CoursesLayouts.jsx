import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import AllCourses from '../pages/AllCourses';
import Footer from '../pages/Footer';

const CoursesLayouts = () => {
    return (
      <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    );
};

export default CoursesLayouts;