import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import styled from 'styled-components';

// import required modules
import { Pagination } from 'swiper/modules';


let EventBox = styled.div`

    .swiper {
        position: static;
    }

    .swiper-pagination {
        position: absolute;
        top: 36px;
        left: auto;
        right: 0;
        bottom: auto;
        width: auto;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }



    .swiper-pagination-bullet {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #888;
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 12px;
    }
    .swiper-pagination-bullet-active {
        color: #fff;
        background: #2f3030;
        
    }
`



const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

function Event() {
    const breakpoints = {
       1024: {
            slidesPerView : 3,
            slidesPerGroup : 3
       },
        768: {
            slidesPerView: 2,
            slidesPerGroup: 2, 
            spaceBetween: 20,
        },

        576: {
            slidesPerView: 2,
            slidesPerGroup: 2, 
            spaceBetween: 20,
        },
    };

    return (
        <>
            <h2 className="tit">event</h2>
           <EventBox>
                <Swiper
                        pagination={pagination}
                        modules={[Pagination]}
                        spaceBetween={30}
                        breakpoints={breakpoints}
                        className="eventSwiper"
                    >
                        <SwiperSlide><a href='#'><img src={process.env.PUBLIC_URL + '/' + './image/event/event_01.jpg'} alt={`CNP몰이 처음이라면, 이벤트`}/></a></SwiperSlide>
                        <SwiperSlide><a href='#'><img src={process.env.PUBLIC_URL + '/' + './image/event/event_02.jpg'} alt={`카카오페이 결제 시 3천원 즉시 할인, 이벤트`}/></a></SwiperSlide>
                        <SwiperSlide><a href='#'><img src={process.env.PUBLIC_URL + '/' + './image/event/event_03.jpg'} alt={`페이코 쿠폰으로 추가 할인, 이벤트`}/></a></SwiperSlide>
                        <SwiperSlide><a href='#'><img src={process.env.PUBLIC_URL + '/' + './image/event/event_04.jpg'} alt={`2024, 새해맞이 기획전 이벤트`}/></a></SwiperSlide>
                        <SwiperSlide><a href='#'><img src={process.env.PUBLIC_URL + '/' + './image/event/event_05.jpg'} alt={`옴므&필링 스토리, 이벤트`}/></a></SwiperSlide>
                        <SwiperSlide><a href='#'><img src={process.env.PUBLIC_URL + '/' + './image/event/event_06.jpg'} alt={`보습&진정 스토리, 이벤트`}/></a></SwiperSlide>
                        
                </Swiper>
           </EventBox>
        </>
    )
}

export default Event;