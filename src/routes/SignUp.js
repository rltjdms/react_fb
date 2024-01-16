import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDocs , collection, } from "firebase/firestore";
import styled from 'styled-components';

let SignBox = styled.section `
   
    .form-control,
    button {
        display: inline-block;
        width: 312px;
    }
    hr {
        width: 312px;
        margin: 1rem auto;
    }

    .tag {
        fonst-size: 14px;

        &:hover {
            color: #F26529;
        }
    } 

    .main_color {
        border-bottom: 1px solid #222;
    }

    .pass_error {
        position: absolute;
		top: 28%;
		left: 78%;
		transform: translateX(-50%);
		margin: 0;
		text-wrap: nowrap;
    }

`
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const auth = getAuth();

    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호가 6자 미만인 경우 에러를 표시하고 함수 종료
        if (password.length < 6) {
            setPasswordError("비밀번호는 6자 이상이어야 합니다.");
            return;
        }

        if (email !== "" && password !== "" && userName !== "") {
            try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(auth.currentUser, { displayName: userName });

                // 회원가입 성공 시 할 작업들
                navigate('/login')
                alert('회원가입이 완료되었습니다. 로그인 해주세요!')

            } catch (error) {
            const errorCode = [
                'auth/invalid-email',
                'auth/email-already-in-use',
                'auth/invalid-password',
                
            ]
            const errorMessage = error.message;

                setError(errorMessage);

                const errorAlertMsg = [
                    '올바른 형식의 이메일을 사용해 주세요.',
                    '중복된 이메일입니다. 다른 이메일을 사용하세요!',
                    '패스워드는 6자 이상이어야 합니다.',
                ]

                if (errorCode === "auth/weak-password") {
					setPasswordError("비밀번호는 6자 이상이어야 합니다.");
				} 

                for (const i in errorCode) {
                    if (error.code === errorCode[i]) {
                      alert(errorAlertMsg[i]);
                      break; 
                    }
                  }

                // console.log(error.code)
            }
            } else {
                alert('모든 항목을 입력하세요.')
            }
    } 

    const onChange = (e) => {
        const { target: { name, value } } = e;

        if (name === 'email') {
        setEmail(value);
        } else if (name === 'password') {
        setPassword(value);
        } else if (name === 'userName') {
        setUserName(value);
        }
    };



  return (
    <SignBox className="container loginbox text-center">
        <h2>회원가입</h2>
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail" className='mb-2'>
                {/* <Form.Label>이메일</Form.Label> */}
                <Form.Control 
                    type="email" 
                    placeholder="이메일" 
                    name="email" 
                    value={email} 
                    onChange={onChange} 
            
                />
                
            </Form.Group>

            <Form.Group controlId="formBasicUser" className='mb-2'>
                <Form.Control
                type="text"
                placeholder="닉네임"
                name="userName"
                value={userName}
                onChange={onChange}
                autoComplete="email"
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className='mb-4 position-relative'>
                {/* <Form.Label>비밀번호</Form.Label> */}
                <Form.Control 
                    type="password" 
                    placeholder="비밀번호" 
                    name="password" 
                    value={password} 
                    onChange={onChange}
                    autoComplete="current-password"
                />
                {passwordError && <p className="text-danger pass_error">{passwordError}</p>}
            </Form.Group>          
            <Button variant="primary" type="submit" className='mb-2'>회원가입</Button>        
        </Form>
        <hr/>
        <Link to="/login" className='fw-medium tag'>
            이미 회원이신가요? <strong className='main_color'>로그인하기</strong>
        </Link>
    </SignBox>
  );
};

export default SignUp;