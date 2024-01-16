import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // FontAwesome 아이콘을 사용하려면 해당 패키지를 설치하세요.

import styled from 'styled-components';

let TopBTN = styled.div.attrs((props) => ({
  isVisible: props.isVisible,
}))`
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #F26529;
    color: #fff;
    border: none;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    display: ${(props) => (props.isVisible ? 'block' : 'none')};
    transition: background-color 0.3s;
    z-index: 100;

    &:hover {
    background-color: #222;
    }
`

TopBTN = styled(TopBTN).withConfig({
  shouldForwardProp: (prop) => prop !== 'isVisible',
})``;

const Topbtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트를 감지하여 버튼의 표시 여부를 결정
  const handleScroll = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 스크롤 이벤트 리스너를 등록
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 해제
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 페이지 맨 위로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드러운 스크롤을 위해 사용
    });
  };

  return (
    <TopBTN isVisible={isVisible} onClick={scrollToTop}>
      <div className='tp'>
        <FaArrowUp/>
      </div>
    </TopBTN>
  );
};

export default Topbtn;