import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const MainLayout = ({saveUserData}) => {
    return <div>
        <Navbar saveUserData={saveUserData}></Navbar>
        <Outlet></Outlet>
    </div>;
}



export default MainLayout;