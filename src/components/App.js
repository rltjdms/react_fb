import React,{useState, useEffect} from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import '../App.scss';

import AppRouter from './Router';
import Navigation from './Navigation';

import Data from '../Data';
import Footer from '../routes/Footer';


import { getAuth, onAuthStateChanged } from "firebase/auth";

// const App = ({ isLoggedIn, userObj }) => {
const App = () => {
  let [product, setProduct] = useState(Data);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {

      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          uid: user.uid
        });
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
    });
  }, [])

  // // 로그인 후 path="/"로 이동하는 함수
  // const navigateToHome = () => {
  //   navigate('/');
  // };

  return (
    <>
      <Navigation userObj={userObj} isLoggedIn={isLoggedIn} />
      <AppRouter  product={product} setProduct={setProduct} isLoggedIn={isLoggedIn} userObj={userObj} />
      <Footer />
    </>
  );
};

export default App;

  {/* {init ? (
        <>
          <Navigation isLoggedIn={isLoggedIn} />
          <Routes>
            <Route
              path="/"
              element={<Home product={product} setProduct={setProduct} />}
            />
            <Route path="/detail/:id" element={<Detail product={product} />} />
            <Route path="/cart" element={<Cart />} />
            {isLoggedIn && userObj ? (
              <>
                <Route path="/profile" element={<Profile userObj={userObj} />} />
                <Route path="/QnA" element={<QnA userObj={userObj} />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </>
            )}
          </Routes>
        </>
      ) : (
        '회원정보 확인 중...'
      )} */}