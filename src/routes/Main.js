import React, { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { FaCirclePause, FaCirclePlay  } from "react-icons/fa6";

import styled from "styled-components";

let MainSwiper = styled.div`
    .swiper-pagination-fraction {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height:25px;
        margin-left: 6px;
        border-radius: 20px;
        background-color: #505050;
        color: #fff;
    }

    .swiper-button-prev,
    .swiper-button-next {
        position: static;
        width: 25px;
        height: 25px;
        margin : 0;
        border-radius: 50px;
        background-color: #c1c1c1;
    }

    .swiper-button-prev:after,
    .swiper-button-next:after {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.8);
    }

    .swiper-button-prev:hover,
    .swiper-button-next:hover {
        background-color: #505050;
    }

    .slide_button_box {
        left: 17.5%;
        bottom: 8px;
        z-index: 1;
    }

    .slide_button_box .play_stop_btn button {
        border: none;
        background: none;
    } 


    .slide_button_box svg {
        height: 1.8em;
        width: 1.8em;
    }

    @media (max-width: 576px) {

        .swiper-pagination-fraction {
            width: 40px;
            height: 22px;
        }

        .swiper-button-prev,
        .swiper-button-next {
            width: 20px;
            height: 20px;
        }
        .swiper-button-prev:after,
        .swiper-button-next:after {
            font-size: 10px;
        }

        .slide_button_box {
            bottom: 5px; 
        }
    }
    
`;

function Main() {

    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);

    const swiperRef = useRef(null);
    const [swiperPlaying, setSwiperPlaying] = useState(true);

    const stopSwiper = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.stop();
            setSwiperPlaying(false);
        }
    };
    
    const startSwiper = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.start();
            setSwiperPlaying(true);
        }
    };

    return (
        <MainSwiper>
            <Swiper
            loop={true}
            pagination={{
                el: '.custom-pagination',
                type: 'fraction',
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="MainSwiper"
            ref={swiperRef}

            >
            <SwiperSlide><img src={process.env.PUBLIC_URL + '/' + './image/main_slide01.jpg'} alt={`2024 청룡의 해 새해맞이 기획전 이벤트`}/></SwiperSlide>
            <SwiperSlide><img src={process.env.PUBLIC_URL + '/' + './image/main_slide02.jpg'} alt={`1월 리뷰체험단 모집, 이벤트 기간:24.01.03 - 24.01.25`}/></SwiperSlide>
            <SwiperSlide><img src={process.env.PUBLIC_URL + '/' + './image/main_slide03.jpg'} alt={`CNP 유튜버 콜라보, 소개팅 성공률 향상 추천템, 립세린`}/></SwiperSlide>
            <div className='position-absolute slide_button_box'>
                <div className='position-relative d-flex align-items-center m_btn'>
                    <div ref={navigationPrevRef} className="swiper-button-prev" />
                    <div className="custom-pagination">
                        <div className="swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal"><span className="swiper-pagination-current">1</span> / <span className="swiper-pagination-total">3</span></div>
                    </div>
                    <div className='play_stop_btn'>
                        {swiperPlaying ? (
                            <button onClick={stopSwiper}><FaCirclePause /></button>
                        ) : (
                            <button onClick={startSwiper}><FaCirclePlay /></button>
                        )}
                    </div>
                    <div ref={navigationNextRef} className="swiper-button-next" />     
                </div>
            </div>
        </Swiper>
    </MainSwiper>
    )
}

export default Main;