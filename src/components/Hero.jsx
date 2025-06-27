import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

const slideData = [
    {
        image: '/img-1.jpg',
        title: 'Engineering Excellence, Building the Future',
        subtitle: 'Precision, Innovation, and Quality in Every Project.'
    },
    {
        image: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        title: 'Pioneering Advanced Infrastructure',
        subtitle: 'From concept to completion, we deliver cutting-edge solutions.'
    },
    
];

const Hero = () => {
    return (
        <div className="relative h-screen w-full">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={true}
                className="h-full"
            >
                {slideData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent flex items-center">
                                <div className="w-full max-w-4xl mx-auto px-8 md:px-16">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                                        {slide.subtitle}
                                    </p>
                                    <button className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
                                        Quote Us
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <style>{`
                .swiper-button-next, .swiper-button-prev {
                    color: #fff;
                }
                .swiper-pagination-bullet {
                    background: rgba(255, 255, 255, 0.5);
                    width: 12px;
                    height: 12px;
                    opacity: 1;
                }
                .swiper-pagination-bullet-active {
                    background: #f59e0b;
                }
            `}</style>
        </div>
    );
};

export default Hero; 