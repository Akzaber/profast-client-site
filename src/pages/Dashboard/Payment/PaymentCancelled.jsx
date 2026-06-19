import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className='space-y-12'>
            <h2 className="text-4xl font-bold">Payment is Cancelled, Please Try again</h2>
            <Link to="/dashboard/my-parcels"><button className='btn btn-primary text-black'>Try Again</button></Link>
        </div>
    );
};

export default PaymentCancelled;