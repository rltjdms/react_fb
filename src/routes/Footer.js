import React,{useState, useEffect} from 'react';
import styled from "styled-components";


let FooterBox = styled.div`
    .ft_top {
        border-top: 1px solid #c9c9c9;
        border-bottom: 1px solid #c9c9c9;
    }

    .ft_top .container {
        margin-bottom: 0;
    }
    
    .ft_top li::after {
        content: " ";
        display: inline-block;
        width: 1px;
        height: 10px;
        margin: 0 12px;
        background-color: #545454;
    }

    .ft_top li:last-child::after {
        display: none;
    }

    .ft_bot {
        padding: 40px 0 ;
    }

    .ft_bot a {
        display: inline-block;
        width: 150px;
    }
    
    .ft_bot .adress_box {
        line-height: 1.2;
    }

    @media (max-width: 576px) {
    
    .ft_bot .adress_box {
        font-size: 10px;
        line-height: 0.8;
    }
`;

function Footer () {
    return (
        <FooterBox>
            <div className="ft_top">
                <ul className="container py-3">
                    <li className='d-inline-block'><a href='#'>이용약관</a></li>      
                    <li className='d-inline-block'><a href='#'>개인정보처리방침</a></li>      
                    <li className='d-inline-block'><a href='#'>회사소개</a></li>      
                    <li className='d-inline-block'><a href='#'>채용안내</a></li>    
                </ul>
            </div>
            <div className='ft_bot'>
                <div className="container">
                    <a href='#' className='mb-3'><img src={process.env.PUBLIC_URL + '/' + './image/cnp_logo.png'} alt={`CNP로고`}/></a>     
                    <div className="adress_box">
                        <p>상호명 : (주)엘지생활건강 CNP COSMETIC 대표이사 : 차석용 사업자번호 : 107-81-98143</p>     
                        <p>통신판매업 신고 : 제 2011-서울종로-0190호 개인정보 보호책임자 : 주범석</p>     
                        <p>주소 : 서울특별시 종로구 새문안로 58, 1층(신문로 2가) (주)엘지생활건강</p>
                        <span>COPYRIGHT© LG H&H Co., Ltd. ALL RIGHTS RESERVED.</span>     
                    </div>
                </div>
            </div>
        </FooterBox>
    )
}

export default Footer;