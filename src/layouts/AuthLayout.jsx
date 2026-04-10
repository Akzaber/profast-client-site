import React from 'react';
import ProFastLogo from '../pages/shared/ProFastLogo/ProFastLogo';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <ProFastLogo></ProFastLogo>
            <div className='flex items-center gap-6'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img src={authImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;