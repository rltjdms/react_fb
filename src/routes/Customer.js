import React,{useState, useEffect} from 'react';
import styled from "styled-components";


let CustomerBox = styled.div`

    
    .ct_top {
        padding: 20px 100px ;
        border-top: 1px solid #000;
        border-bottom: 1px solid #c9c9c9;
    }

    .ct_top > * {
        margin: 0;
    }

    .plus {
        position: relative;
        display: inline-block;
        width: 14px;
        height: 2px;
        padding: 0;
        background-color: #000;
        font-size: 0;
    }
    .plus::after {
        content: "";
        display: inline-block;
        width: 14px;
        height: 2px;
        transform: rotate(90deg);
        background-color: #000;
    }

    .ct_bot {
        margin-top: 50px;
        padding: 50px 100px;
        background: #F6F6F6;
    }

    .ct_bot .ct_bot_box {
        padding: 50px 68px;
        border: 1px solid rgba(84, 84, 84, 0.50);
        background: #F6F6F6;
    }

    .ct_bot .ct_bot_box .tel {
        color: #FEC843;
    }


    .line {
        width: 2px;
        height: 100px;
        padding: 0;
        background-color: rgba(84, 84, 84, 0.50);
    }

    .ct_bot_box .text-center p + p {
        margin-left: 7px;
    }
`;

function Customer () {
    return (
        <CustomerBox className='ct_box'>
            <div className="ct_top row justify-content-between align-items-center text-center">
                <h4 className='col-2'>공지사항</h4>
                <p className='col-6 notice_title'>CNP몰 이용약정 변경예정 공지</p>
                <span className='notice_date col-2'>2023-01-08</span>
                <a href='#' className='plus col-2'>플러스</a>
            </div>
            <div className='ct_bot'>
                <h4 className='mb-4'>온라인콜센터</h4>
                <div className='row justify-content-evenly align-items-center ct_bot_box'>
                    <div className='col text-center'>
                        <h5 className='fw-semibold'>주문/취소/배송문의</h5>
                        <h4 className='tel my-3 fw-semibold'>080-220-0707</h4>
                        <p className='call_time mb-1'>평일 : AM 9:00- PM 18:00</p>
                        <p className='call_time mb-1'>점심 : PM 12:00- PM 13:00</p>
                    </div>
                    <span className='line'></span>
                    <div className='col text-center'>
                        <h5 className='fw-semibold'>제품상담/품질불편</h5>
                        <h4 className='tel my-3 fw-semibold'>080-023-7007</h4>
                        <p className='call_time mb-1'>평일 : AM 9:00- PM 18:00</p>
                        <p className='call_time mb-1'>점심 : PM 12:00- PM 13:00</p>
                    </div>
                </div>
            </div>
        </CustomerBox>
    )
}

export default Customer;