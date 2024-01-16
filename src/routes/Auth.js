import React, { useState } from 'react';
// import { authServiece } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {Button, Form} from 'react-bootstrap';
import styled from 'styled-components'

let LoginBox = styled.div`
	margin: 312px 0 268px 0;
	text-align: center;

	.pass_error {
		position: absolute;
		top: 28%;
		left: 78%;
		transform: translateX(-50%);
		margin: 0;
		text-wrap: nowrap;
	}
`;

/*
function Auth() {
	return (
			<h2>Auth page</h2>
	)
}
 */

const Auth = ()=>{
	const[email, setEmail] = useState('');
	const[password, setPassword] = useState('');
	const[newAccount, setNewAccount] = useState(true);
	const[error, setError] = useState(true);


	const [passwordError, setPasswordError] = useState('');




	const auth = getAuth();

	const onSubmit = (e) => {
		e.preventDefault();
		//export const authServiece = getAuth(app); => fierbase.js에서 변수로 지정한걸 불러옴
		if(newAccount) {
			//Create Account 회원가입
			createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
				// console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// console.log(errorCode, errorMessage);
				setError(errorMessage);

				if (errorCode === "auth/weak-password") {
					setPasswordError("비밀번호는 6자 이상이어야 합니다.");
				} 
			});

				
			}else {
				//로그인
				signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					// Signed in 
					const user = userCredential.user;
					// console.log(user);
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					// console.log(errorCode, errorMessage);
					if (errorCode === "auth/invalid-credential") {
						window.alert("해당 사용자를 찾을 수 없습니다.");
					}
				});
		
		}
	}
	const onChange = (e) => {
		//let name = e.target.value
		const {target:{name, value}} = e;

		if(name==="email") {
				//setEmail(e.target.value);
				setEmail(value);
		} else {
				setPassword(value);
		}
	}

	const toggleAccount = () => setNewAccount((prev)=>!prev);
	const onSocialClick = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
		.then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			const user = result.user;
			// console.log(token, user);
		
		}).catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.customData.email;
			const credential = GoogleAuthProvider.credentialFromError(error);
			// console.log(errorCode, errorMessage, email, credential);
		});
	
	}

	return (
		<div className='container login'>
			<LoginBox>
				<h2 className='text-center'>로그인</h2>
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

						<Form.Group controlId="formBasicPassword" className='mb-4 position-relative'>
							{/* <Form.Label>비밀번호</Form.Label> */}
							<Form.Control 
								type="password" 
								placeholder="비밀번호" 
								name="password" 
								value={password} 
								onChange={onChange} 
							/>
							{passwordError && <p className="text-danger pass_error">{passwordError}</p>}
						</Form.Group>

						
						<Button 
							variant="primary" type="button"
							onClick={toggleAccount}
						>
							{newAccount?  "로그인" : "회원가입"}
						</Button>

						<hr/>


						<div className='my-4'>
							<Button variant="primary" type="submit" className='me-2'>
								{newAccount ? "계정 생성" : "로그인"}
							</Button>

					

							<Button 
								variant="secondary" 
								type="button" 
								onClick={onSocialClick}
							>
								{newAccount ? "구글로 계정 생성" : "구글로 로그인"}
							</Button>`
						</div>
				
					</Form>
			</LoginBox>
		</div>
	)
}

export default Auth;

