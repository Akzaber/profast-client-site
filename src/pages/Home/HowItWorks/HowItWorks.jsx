import React from 'react';
import { CiDeliveryTruck } from "react-icons/ci";


const HowItWorks = () => {
    return (
        <div>
            <h1 className='text-4xl font-bold text-secondary'>How it Works</h1>
            <div className='grid grid-cols-1 text-secondary md:grid-cols-2 lg:grid-cols-4 gap-3 my-6'>
                <div className='space-y-4 bg-slate-100 rounded p-4'>
                    <CiDeliveryTruck className='w-[100px] h-[100px]'></CiDeliveryTruck>
                    <h4 className='text-2xl font-bold'>Booking Pick & Drop</h4>
                    <p>From personal packages to business shipments - We deliver on time, every time</p>
                </div>
                <div className='space-y-4 bg-slate-100 rounded p-4'>
                    <CiDeliveryTruck className='w-[100px] h-[100px]'></CiDeliveryTruck>
                    <h4 className='text-2xl font-bold'>Booking Pick & Drop</h4>
                    <p>From personal packages to business shipments - We deliver on time, every time</p>
                </div>
                <div className='space-y-4 bg-slate-100 rounded p-4'>
                    <CiDeliveryTruck className='w-[100px] h-[100px]'></CiDeliveryTruck>
                    <h4 className='text-2xl font-bold'>Booking Pick & Drop</h4>
                    <p>From personal packages to business shipments - We deliver on time, every time</p>
                </div>
                <div className='space-y-4 bg-slate-100 rounded p-4'>
                    <CiDeliveryTruck className='w-[100px] h-[100px]'></CiDeliveryTruck>
                    <h4 className='text-2xl font-bold'>Booking Pick & Drop</h4>
                    <p>From personal packages to business shipments - We deliver on time, every time</p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;