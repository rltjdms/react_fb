import React from "react";
import { Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

// let TextBox = styled.div `
//     .text_box .title,
//     .price_box .totalPrice  {
//         font-size: 18px;
//     }
//     .text_box .tag {
//         font-size: 14px;
//     }
// `

function Card(props) {
  let navigate = useNavigate();

  // const handleClick = () => {
  //   navigate(`/detail/${props.product.id}`);
  // }

  return (
    <>
        <div className="thumb"
            onClick={() => {
            // handleClick();
          }}>
            <img src={process.env.PUBLIC_URL + '/'+ props.product.image} alt={`product${props.product.title}`} width='80%' />
        </div>
        <div className="text_box"
          onClick={() => {
            // handleClick();
          }}>
          <h4 className="title fw-medium mt-4">{props.product.title}</h4>
          <span className="tag d-block my-3">{props.product.tag}</span>
          <div className="price_box mt-3">
            {props.product.discount !== 0 ? (
              <>
                <p className="discount fw-semibold">{props.product.discount}</p>
                <p className="totalPrice fw-semibold">{props.product.totalPrice}원</p>
                <span className="price">{props.product.price}원</span>
              </>
            ) : (
              <p className="totalPrice fw-semibold">{props.product.totalPrice}원</p>
            )}

          </div>
        </div>
    </>
  )
}

export default Card;