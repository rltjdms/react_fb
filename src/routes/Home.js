import React, {useState} from "react";
import {Row, Container, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';



import Card from "./Card";
import Event from "./Event";
import Main from "./Main";
import Customer from "./Customer";
import Footer from "./Footer";
import Topbtn from "../Topbtn";

import {useNavigate , useParams} from 'react-router-dom';
import styled from "styled-components";


let SwiperBox = styled.div`
    width: auto;
    height: 402px;
    overflow: hidden;

    .MdSwiper  {
        height: 100%;
    }
    
    .swiper-wrapper {
        height: 100%;
    }

    .swiper-slide {
        display: flex;
        // width: 530px;
        // height: 190px;
    }


    .thumb {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 190px;
        height: 190px;
        margin-right: 1.5em;
    }

    .thumb img {
        width: 190px;
        height: 190px;
    }

    .thumb:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.025);
        border-radius: 16px;
    }



`;


function Home (props) {

    // let [shoes] = useState(Data);
    // let shoes = props.shoes;
    const [product, setProduct ] =  useState(props.product);
    
   // 카테고리별 상품 추출 함수
    const getProductsByCategory = (category) => {
        return (props.product || []).filter((item) => item.category === category);
    };

    // 각 카테고리에 해당하는 상품 추출
    const bestProducts = getProductsByCategory('best');
    const mdProducts = getProductsByCategory('md');

    let navigate = useNavigate();

    const { id } = useParams();

    const onClickCard = (id) => {
        navigate(`/detail/${id}`);
    }


    return (
    <>
        <Main/>
        <Container className="main_font">
                <section className="best_box">
                    <h2 className="tit">베스트 상품</h2>
                    <Row className="row-cols-sm-2 row-cols-md-4">
                    {bestProducts.map(function(shoe, i) {
                        return (
                            <Col key={shoe.id}>
                                <Card product={shoe} 
                                    key={shoe.id} 
                                    onClick={() => onClickCard(shoe.id)}
                                ></Card>
                            </Col>
                            
                            )
                            
                        })
                    }
                    </Row>
                </section>
                <section className="md_box">
                    <h2 className="tit">md 상품</h2>
                    <Row className="align-items-center">
                        <div className="video col">
                            <div className="video_area">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?corols=1&amp;mute=1&amp;autoplay=1&amp;loop=1&amp;list=PL0fxwj3vYLQQhm1IMEcwMqU1tZng2VkFF" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
                            </div>
                        </div>
                        <SwiperBox className="col">
                            <Swiper
                                direction={'vertical'}
                                slidesPerView={2}
                                spaceBetween={30}
                                scrollbar={true}
                                modules={[Scrollbar,Mousewheel]}
                                mousewheel={true}
                                className="MdSwiper"
                            >
                                {mdProducts.map(function (shoe, i) {
                                return (
                                    <SwiperSlide key={shoe.id}>
                                    <Card
                                        product={shoe}
                                        key={shoe.id} 
                                        onClick={() => onClickCard(shoe.id)}
                                    ></Card>
                                    </SwiperSlide>
                                );
                                })}
                            </Swiper>
                        </SwiperBox>
                    </Row>
                </section>
                <section className="position-relative">
                    <Event/>
                </section>
                <section>
                    <Customer/>
                </section>
        </Container>
        <Topbtn/>
        <Footer/>
    </>
   )
}

export default Home;