import React from 'react';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router';

const ProFastLogo = () => {
    return (
        <Link to="/" className='flex items-end'>
            <img className='mb-2' src={logo} alt="" />
            <h1 className='text-4xl font-extrabold -ml-3'>ProFast</h1>
        </Link>
    );
};

export default ProFastLogo;