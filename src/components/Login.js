import React,{useState, useEffect} from 'react';
import AppRouter from './Router';
import { authService } from '../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Data from '../Data';

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  //기본적으로 로그인을 안했으니 초기설정 - false => 사용자 인증 currentUser 다시 기존으로 변경
  const [init, setInit] = useState(false); 
  const [userObj, setUserObj] = useState(null);

  useEffect(()=> {
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
        // console.log(user);
      } else {
        // User is signed out
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, [])
  //빈배열 만들고 한번만 실행

  

  return (
    <>
    {init?
      <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>
      : "회원정보 확인 중.."
    }
    </>
  );
}

export default Login;
