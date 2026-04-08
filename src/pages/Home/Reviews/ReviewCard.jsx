import React from 'react';
import reviewImg from '../../../assets/reviewQuote.png';

const ReviewCard = ({review}) => {
    const {userName, user_photoURL, user_email, review:testimonial} = review;
    return (
        <div className='p-6 bg-slate-50 rounded-2xl'>
            <img src={reviewImg}/>
            <p className='border-b-2 border-dashed border-secondary pb-5'>{testimonial}</p>
            <div className='flex items-center my-5'>
                <img className='rounded-full w-[60px]' src={user_photoURL}/>
                <div className='ml-3'>
                    <h4 className='text-xl font-bold text-secondary'>{userName}</h4>
                    <p>{user_email}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;