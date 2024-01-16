import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// 유저가 URL 파라미터에 입력한거 가져오려면 => useParams()

import { cartCount, addItem } from "../reducers/CartSlice";
import { useDispatch, useSelector } from 'react-redux';
import {Modal,Button} from 'react-bootstrap';

import styled from 'styled-components';

let DetailBox = styled.section `

  .detail_img {
    padding: calc(var(--bs-gutter-x) * 2);
  }

  .detail_text {
    padding-left: calc(var(--bs-gutter-x) * 4);
  }

  .discount {
    color: #F26529;
  }

  tbody > tr:first-child {
    magrin-top: 20px;
  }

  th {
    width: 115px;
    padding: 7px 0 8px 9px;
    text-align: left;
    vertical-align: middle;
  }

  
  td {
    padding: 7px 0 8px 9px;
  }
`

function Detail(props) {

    
  const { id } = useParams();
  let listItem = props.product.find((x) => x.id == id);
  let dispatch = useDispatch(); //store.js로 요청보내주는 함수

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cart = useSelector((state) => state.cart);


  useEffect(() => {
      if (!listItem) {
        // 'listItem'이 없는 경우에 대한 처리
        return <div>상품을 찾을 수 없습니다.</div>;
      }
      // 나머지 코드는 그대로 유지
  }, [id, listItem]);

  const handleOrderClick = () => {
    // 중복 상품 확인
    const itemExists = cart.find((cartItem) => cartItem.id === listItem.id);

    if (itemExists) {
      // 중복 상품이 있는 경우
      const confirmation = window.confirm('장바구니에 동일한 상품이 있습니다. 장바구니에 추가 하시겠습니까? ');
      if (confirmation) {
        // 중복 상품 수량 증가를 위한 액션 디스패치
        dispatch(cartCount(listItem.id));
        handleShow();
      } 
    } else {
      // 중복 상품이 없는 경우
      dispatch(addItem({ id: listItem.id, name: listItem.title, count: 1 }));
      handleShow();

      navigate('/detail/' + listItem.id);
    }
  };

  const handleMoveToCart = () => {
    handleClose();
    navigate('/cart');
  };

  return (
    <>
      <DetailBox>
        <div className='container'>
          <div className="row">
            <div className="col-4 border detail_img">
              <img src={ process.env.PUBLIC_URL + '/' + listItem.image} alt={listItem.title} width="50%" />
            </div>
            <div className="col-8 detail_text">
              <h4 className='mb-4'>{listItem.title}</h4>
              <p className='h6 mb-4'>{listItem.tag}</p>
              <table border="1" className='border-top'>
                <tbody>
                  <tr rel="국내·해외배송">
                    <th scope="row"><span>국내·해외배송</span></th>
                    <td><span>국내배송</span></td>
                  </tr>
                  <tr rel="배송방법">
                    <th scope="row"><span>배송방법</span></th>
                    <td><span>택배</span></td>
                  </tr>
                  <tr rel="배송비">
                    <th scope="row"><span>배송비</span></th>
                    <td><span><span class="delv_price_B">
                      <input id="delivery_cost_prepaid" name="delivery_cost_prepaid" value="P" type="hidden"/>무료</span></span></td>
                  </tr>
                  <tr rel="고객상담실">
                    <th scope="row"><span>고객상담실</span></th>
                    <td><span>080-023-7007(수신자 요금 부담)</span></td>
                  </tr>
                  <tr rel="원산지">
                    <th scope="row"><span>원산지</span></th>
                    <td><span>국내 </span></td>
                  </tr>
                </tbody>
              </table>
              <div className="price_box">
                {listItem.discount !== 0 && (
                  <>
                    <p className="discount h5">{listItem.discount}</p>
                    <p className="totalPrice h5">{listItem.totalPrice}원</p>
                  </>
                )}
                <span className="price h6">{listItem.price}원</span>
              </div>
              <button className="btn btn-danger"
              onClick={handleOrderClick}
              >주문하기</button>
            </div>

          </div>
          <Modal show={show} onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
              <Modal.Header closeButton>
                <Modal.Title>장바구니 담기</Modal.Title>
              </Modal.Header>
              <Modal.Body>장바구니에 상품이 정상적으로 담겼습니다.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  닫기
                </Button>
                <Button variant="primary" onClick={handleMoveToCart}>
                  장바구니로 이동
                </Button>
              </Modal.Footer>
          </Modal>
        </div>
      </DetailBox>
    </>
  )
}



export default Detail;