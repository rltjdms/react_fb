import React, { useEffect, useState, useRef } from "react";
import {Row, Container , Nav, Navbar,Button,OverlayTrigger ,Tooltip ,Popover   } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../routes/Profile';

import styled from 'styled-components';

let HeaderBox = styled.header.attrs((props) => ({
	height: props.height,
  })) 
  `

	.nav_box > div {
		padding: 20px;
	}

	.nav_box > div:hover > a {
		color: #F26529;
	}

	.nav_box > div:hover::after {
		content: "";
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: #F26529;
		z-index: 100;
	}

	.sub_box {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		box-sizing: border-box;
		background-color: #fff;
		padding: 10px 0;
		z-index: 90;
	}

	.sub_box > ul {
		padding: 0 10px;
	}

	.sub_box li {
		padding: 2px 10px;
		white-space: nowrap;
	}

	.sub_box li:hover a ,
	.login_btn:hover a,
	.signup_btn:hover a {
		color: #F26529;
	}

	.sub_box .sub_menu {
		margin: 0;
		padding: 0 20px;
	}

	@media (max-width: 1000px) {
		
		.nav_box {
			margin-top: 20px;
		}

		.nav_box > div {
			padding: 20px 10px;
		}

		.header_list {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}
	
		.login_box {
			position: absolute;
			top: 13%;
			left: 85%;
			transform: translateX(-50%);
		}
	
	}

	
`


const Navigation = ({isLoggedIn, userObj}) => {
	let navigate = useNavigate();

	const [activeSubMenu, setActiveSubMenu] = useState(null);


	// 메뉴에 마우스가 들어왔을 때 서브메뉴를 보이게 함
	const handleMouseEnter = (menu) => {
		if (typeof menu === 'string') {
			const submenuRef = document.querySelector(`.${menu}`);
		
			setActiveSubMenu(activeSubMenu === menu ? null : menu);

		  } else {
			setActiveSubMenu(activeSubMenu === menu ? null : menu);
		  }
	};
	
	// 메뉴에서 마우스가 나갔을 때 서브메뉴를 숨김
	const handleMouseLeave = () => {
		setActiveSubMenu(null);
		// setHeight(height);
	};

	  
	return (
		<HeaderBox  data-bs-theme="light" className="container header_box">
			<div className='d-flex justify-content-between align-items-center header_list position-relative'>
				<h1 className="m-0"><Link to="/"><img src={process.env.PUBLIC_URL + '/image/cnp_logo.png'} alt={`CNP로고`}/></Link></h1>
				<nav className='d-flex justify-content-between align-items-center nav_box'>
					<div 
						className='main_menu position-relative'
						onMouseEnter={() => handleMouseEnter('main_menu_1')}
						onMouseLeave={handleMouseLeave}
					>
						<a href='#'>진지한 UP</a>
						{activeSubMenu === 'main_menu_1' && (
							<div className='sub_box'>
								<ul className='sub_menu'>
									<li><a href='#'>clean up</a></li>
									<li><a href='#'>hi light up</a></li>
									<li><a href='#'>boost up</a></li>
									<li><a href='#'>shoot up</a></li>
									<li><a href='#'>light up</a></li>
								</ul>
							</div>
						)}
					</div>
					<div 
						className='main_menu position-relative'
						onMouseEnter={() => handleMouseEnter('main_menu_2')}
						onMouseLeave={handleMouseLeave}
					>
						<a href='#'>라인별</a>
						{activeSubMenu === 'main_menu_2' && (
							<div className='sub_box d-flex'>
								<ul className='sub_menu'>
									<li><a href='#'>프로폴리스</a></li>
									<li><a href='#'>프로페셔널</a></li>
									<li><a href='#'>인비져블</a></li>
									<li><a href='#'>옴므</a></li>
									<li><a href='#'>안티포어</a></li>
									<li><a href='#'>bye od-td</a></li>
									<li><a href='#'>그 외</a></li>
								</ul>
								<ul className='sub_menu'>
									<li><a href='#'>아쿠아수딩</a></li>
									<li><a href='#'>뮤제너</a></li>
									<li><a href='#'>비타-비</a></li>
									<li><a href='#'>더마텐션</a></li>
									<li><a href='#'>에이클린</a></li>
									<li><a href='#'>하이드로세라</a></li>
								</ul>
							</div>
						)}
					</div>
					<div 
						className='main_menu position-relative'
						onMouseEnter={() => handleMouseEnter('main_menu_3')}
						onMouseLeave={handleMouseLeave}
					>
						<a href='#'>유형별</a>

						{activeSubMenu === 'main_menu_3' && (
							<div className='sub_box d-flex'>
							<ul className='sub_menu'>
								<li><a href='#'>앰플/에센스</a></li>
								<li><a href='#'>클렌징</a></li>
								<li><a href='#'>부스터/토너</a></li>
								<li><a href='#'>에멀전</a></li>
								<li><a href='#'>팩/마스크</a></li>
								<li><a href='#'>선케어</a></li>
							</ul>
							<ul className='sub_menu'>
								<li><a href='#'>미스트</a></li>
								<li><a href='#'>크림</a></li>
								<li><a href='#'>쿠션/베이스</a></li>
								<li><a href='#'>스페셜케어</a></li>
								<li><a href='#'>스팟케어</a></li>
								<li><a href='#'>기타</a></li>
							</ul>
						</div>
						)}
					</div>
					<div 
						className='main_menu position-relative'
						onMouseEnter={() => handleMouseEnter('main_menu_4')}
						onMouseLeave={handleMouseLeave}
					>
						<a href='#'>고객센터</a>

						{activeSubMenu === 'main_menu_4' && (
							<div className='sub_box'>
							<ul className='sub_menu d-flex'>
								<li><a href='#'>공지사항</a></li>
								<li><a href='#'>상품</a></li>
								<li><a href='#'>Q&A</a></li>
								<li><a href='#'>이용안내</a></li>
								<li><a href='#'>FAQ</a></li>
								<li><a href='#'>1:1문의</a></li>
								<li><a href='#'>1:1문의</a></li>
							</ul>
						</div>
						)}
					</div>
					<div 
						className='main_menu position-relative'
						onMouseEnter={() => handleMouseEnter('main_menu_5')}
						onMouseLeave={handleMouseLeave}
					>
						<a href='#'>피부고민</a>

						{activeSubMenu === 'main_menu_5' && (
							<div className='sub_box d-flex'>
								<ul className='sub_menu'>
									<li><a href='#'>영양/안티에이징</a></li>
									<li><a href='#'>더마케어</a></li>
									<li><a href='#'>트러블진정</a></li>
									<li><a href='#'>수분/보습</a></li>
									<li><a href='#'>모공/각질</a></li>
									<li><a href='#'>클렌징</a></li>
								</ul>
								<ul className='sub_menu'>
									<li><a href='#'>선케어</a></li>
									<li><a href='#'>남성케어</a></li>
								</ul>
							</div>
						)}
					</div>
					<div className='main_menu position-relative'>
						<a href='#'>피부과전용</a>
					</div>
				</nav>
				{isLoggedIn && userObj ? (
				<Profile userObj={userObj}/>
				) : (
				<div className="d-flex gap-4 login_box">
					<div className="login_btn">
					<Link to="/login">로그인</Link>
					</div>
					<div className="signup_btn">
					<Link to="/signup">회원가입</Link>
					</div>
				</div>
				)}
			
			</div>
		</HeaderBox>
	);
	
  };


  
  export default Navigation;