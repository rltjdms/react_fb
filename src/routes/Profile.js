import React, { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {Button,OverlayTrigger ,Tooltip , Popover   } from 'react-bootstrap';
import { HiOutlineUserCircle } from "react-icons/hi";

const Profile = ( userObj)=> {
  const placement = 'bottom';

  const [showPopover, setShowPopover] = useState(false);
  const [user, setUser] = useState(null);

  const handleTogglePopover = () => {
    setShowPopover(!showPopover);
  };


  const auth = getAuth();

  const navigate = useNavigate();

  const onLogoutClick = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      console.log(error);
    });    

    setUser(null);
  }

  const QnaClick = () =>{
    navigate("/QnA");
  }

  const CartClick = () =>{
    navigate("/cart");
  }
  

  useEffect(() => {
    // 인증 상태가 변경될 때마다 호출
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // user 객체 업데이트
    });

    // 컴포넌트가 언마운트될 때 cleanup
    return () => unsubscribe();
  }, [auth]);

  /*
  const user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      const displayName = user.displayName;
      const email = user.email;
      // console.log(uid,displayName, email);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  */


  return(
    <>
    { user && (
      <OverlayTrigger
      key={placement}
      trigger="click"
      placement={placement}
      show={showPopover}
      overlay={
        <Popover id={`popover-positioned-${placement}`}>
          <Popover.Header as="h3" className='text-center  bg-light-subtle'>내 프로필</Popover.Header>
          <Popover.Body>

        
          <>
            <p className='text-center'>{ user.displayName} 님</p>
            <p>이메일 : {user.email}</p>
          </>
          

          {/* <QnA userObj={userObj}/> */}
          
          {/* <button onClick={QnaClick}>게시글</button>
          <button onClick={CartClick}>장바구니</button> */}
          <a href='#' onClick={onLogoutClick} className='logout_btn d-block text-end'>로그아웃</a>
          </Popover.Body>
        </Popover>
        }
      >
        <Button variant="secondary" onClick={handleTogglePopover} className="login_box">
          <HiOutlineUserCircle/>
        </Button>
      </OverlayTrigger>
    )}

    </>
  )
}

export default Profile;



