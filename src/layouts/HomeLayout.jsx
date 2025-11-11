import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import HomeHero from '../components/HomeHero';
import PopularCourses from '../components/PopularCourses';
import Footer from '../pages/Footer';
import WhyChooseUs from '../components/WhyChooseUs';
import TopInstructors from '../components/TopInstructors';

const HomeLayout = () => {
    return (
      <div>
        <header>
          <Navbar></Navbar>
        </header>
        <HomeHero></HomeHero>

        <Outlet></Outlet>

        <WhyChooseUs></WhyChooseUs>
        <TopInstructors></TopInstructors>
        <Footer></Footer>
      </div>
    );
};

export default HomeLayout;