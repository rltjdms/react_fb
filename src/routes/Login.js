import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FcGoogle } from "react-icons/fc";

let LoginBox = styled.section `
    overflow: hidden;

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
        font-size: 14px; 

        &:hover {
            color: #F26529;
        }
    } 

    .main_color {
        border-bottom: 1px solid #222;
    }

    .google_btn {
        font-size: 18px; 
        &:hover {
            border: solid 1px #F26529 !important;
        }
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

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const auth = getAuth();

    const onSubmit = async (e) => {
    e.preventDefault();

        if (email !== "" && password !== "") {
            try {
                await signInWithEmailAndPassword(auth, email,password);
                // const user = userCredential.user;
                // console.log('로그인 성공:', user);
                navigate('/')
                // window.location.reload()
            } catch (error) {
            // console.error('로그인 실패:', error);
            const errorCode = [
                'auth/user-disabled',
                'auth/user-not-found',
                'auth/wrong-password',
                'auth/invalid-email',
                'auth/invalid-password',
                'auth/invalid-credential'
            ]
            const errorAlertMsg = [
                '등록되어 있지 않은 사용자입니다.',
                '등록되어 있지 않은 사용자입니다.',
                '패스워드가 틀립니다.',
                '올바른 형식의 이메일 주소를 입력하세요',
                '패스워드를 올바르게 입력하세요.',
                '등록되어 있지 않은 사용자입니다.',
            ]
            // console.log(error.code)

            if (errorCode === "auth/weak-password") {
                setPasswordError("비밀번호는 6자 이상이어야 합니다.");
            } 

            for (const i in errorCode) {
                if (error.code === errorCode[i]) {
                alert(errorAlertMsg[i])
            }
        }
            }
            } else {
                alert('모든 항목을 입력하세요.')
        }

    };

    const onChange = (e) => {
    const { target: { name, value } } = e;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } 
    };

    const onSocialClick = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // console.log(token, user);

        navigate('/');
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // console.log(errorCode, errorMessage, email, credential);
        });
    };

    return (
        <LoginBox className="container loginbox text-center">
             <h2>로그인</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="formBasicEmail" className='mb-2'>
                    {/* <Form.Label>이메일</Form.Label> */}
                    <Form.Control 
                        type="email" 
                        placeholder="이메일" 
                        name="email" 
                        value={email} 
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
                <Button variant="primary" type="submit" className='mb-4'>로그인</Button>
                <Link to="/signup" className='fw-medium tag'>
                   <p>아직 계정이 없다면? <strong className='main_color'>회원가입!</strong></p>
                </Link>
                <hr/>
                <p>아이디와 비밀번호 입력하기 없이<br/>구글로 1초만에 로그인 하세요.</p>
                <div className='d-inline-flex justify-content-center align-items-center google_btn rounded-1 border border-dark p-3' onClick={onSocialClick}>
                    <FcGoogle/>
                    <span className='ms-2 fw-medium'>Google 계정으로 로그인/회원가입</span>
                </div>
            </Form>
           
            
            
        </LoginBox>
    );
};

export default Login;