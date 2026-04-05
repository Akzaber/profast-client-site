import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import brands1 from '../../../assets/brands/amazon.png';
import brands2 from '../../../assets/brands/amazon_vector.png';
import brands3 from '../../../assets/brands/casio.png';
import brands4 from '../../../assets/brands/moonstar.png';
import brands5 from '../../../assets/brands/randstad.png';
import brands6 from '../../../assets/brands/star.png';
import brands7 from '../../../assets/brands/start_people.png';
import { Autoplay } from 'swiper/modules';


const Brands = () => {
    return (
        <div className='my-14 space-y-8'>
            <h1 className='text-4xl font-extrabold mb-10 text-secondary text-center'>We've helped thousands of sales teams</h1>
            <Swiper
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                loop={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
            >
                <SwiperSlide><img src={brands1} /></SwiperSlide>
                <SwiperSlide><img src={brands2} /></SwiperSlide>
                <SwiperSlide><img src={brands3} /></SwiperSlide>
                <SwiperSlide><img src={brands4} /></SwiperSlide>
                <SwiperSlide><img src={brands5} /></SwiperSlide>
                <SwiperSlide><img src={brands6} /></SwiperSlide>
                <SwiperSlide><img src={brands7} /></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Brands;