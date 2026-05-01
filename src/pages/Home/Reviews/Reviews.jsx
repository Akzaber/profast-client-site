import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviewsPromise }) => {
    const reviews = use(reviewsPromise);
    return (
        <div className='my-24'>
            <div className='mb-20'>
                <h2 className='text-4xl font-bold text-center'>Reviews</h2>
                <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima recusandae est, in amet modi magni inventore alias iure repellat nulla officiis? Molestiae sint itaque placeat incidunt autem consequuntur deserunt ab?</p>
            </div>
            <Swiper
                effect={'coverflow'}
                loop={true}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 30,
                    stretch: '50%',
                    depth: 200,
                    scale: 0.75,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    reviews.map(review=> <SwiperSlide key={review.id}>
                    <ReviewCard review={review}></ReviewCard>
                </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Reviews;