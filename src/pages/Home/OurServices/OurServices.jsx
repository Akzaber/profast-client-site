import React from 'react';
import serviceImg from '../../../assets/service.png'

const OurServices = () => {
    return (
        <div className='my-10 bg-secondary rounded p-14 space-y-6'>
            <div className='text-center text-white space-y-4'>
                <h1 className='text-4xl font-bold'>Our Services</h1>
                <p>Enjoy fast, reliable parcel delivery with real time tracking and zero hassels, from personal packages to business shipments - we deliver on time, every time.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div className='space-y-4 text-center hover:bg-primary bg-slate-50 rounded p-6'>
                    
                    <img className='mx-auto bg-linear-to-b from-slate-200 to-slate-50 p-3 rounded-full' src={serviceImg}/>
                    <h4 className='text-2xl font-bold'>Express Standard delivery</h4>
                    <p>We deliver parcels within 24-36 hours in Dhaka, chittagong, Khulna, Sylhet, Rajshahi. Express Delivery available in Dhaka within 4-6 hours from pick-up to drop-off.</p>
                </div>
                <div className='space-y-4 text-center hover:bg-primary bg-slate-50 rounded p-6'>
                    <img className='mx-auto bg-linear-to-b from-slate-200 to-slate-50 p-3 rounded-full' src={serviceImg}/>
                    <h4 className='text-2xl font-bold'>Express Standard delivery</h4>
                    <p>We deliver parcels within 24-36 hours in Dhaka, chittagong, Khulna, Sylhet, Rajshahi. Express Delivery available in Dhaka within 4-6 hours from pick-up to drop-off.</p>
                </div>
                <div className='space-y-4 text-center hover:bg-primary bg-slate-50 rounded p-6'>
                    <img className='mx-auto bg-linear-to-b from-slate-200 to-slate-50 p-3 rounded-full' src={serviceImg}/>
                    <h4 className='text-2xl font-bold'>Express Standard delivery</h4>
                    <p>We deliver parcels within 24-36 hours in Dhaka, chittagong, Khulna, Sylhet, Rajshahi. Express Delivery available in Dhaka within 4-6 hours from pick-up to drop-off.</p>
                </div>
                <div className='space-y-4 text-center hover:bg-primary bg-slate-50 rounded p-6'>
                    <img className='mx-auto bg-linear-to-b from-slate-200 to-slate-50 p-3 rounded-full' src={serviceImg}/>
                    <h4 className='text-2xl font-bold'>Express Standard delivery</h4>
                    <p>We deliver parcels within 24-36 hours in Dhaka, chittagong, Khulna, Sylhet, Rajshahi. Express Delivery available in Dhaka within 4-6 hours from pick-up to drop-off.</p>
                </div>
                <div className='space-y-4 text-center hover:bg-primary bg-slate-50 rounded p-6'>
                    <img className='mx-auto bg-linear-to-b from-slate-200 to-slate-50 p-3 rounded-full' src={serviceImg}/>
                    <h4 className='text-2xl font-bold'>Express Standard delivery</h4>
                    <p>We deliver parcels within 24-36 hours in Dhaka, chittagong, Khulna, Sylhet, Rajshahi. Express Delivery available in Dhaka within 4-6 hours from pick-up to drop-off.</p>
                </div>
                <div className='space-y-4 hover:bg-primary text-center bg-slate-50 rounded p-6'>
                    <img className='mx-auto bg-linear-to-b from-slate-200 to-slate-50 p-3 rounded-full' src={serviceImg}/>
                    <h4 className='text-2xl font-bold'>Express Standard delivery</h4>
                    <p>We deliver parcels within 24-36 hours in Dhaka, chittagong, Khulna, Sylhet, Rajshahi. Express Delivery available in Dhaka within 4-6 hours from pick-up to drop-off.</p>
                </div>
            </div>
        </div>
    );
};

export default OurServices;