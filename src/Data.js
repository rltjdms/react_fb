let Data = [
  {
    id: 0,
    category: "best",
    title: "[유튜버 콜라보]  CNP 프로폴리스 앰플 인 쿠션 21호(본품+리필)",
    tag: "모든피부 사용가능",
    image: "./image/best/cnp_best1.jpg",
    price: 37000,
    discount: 35 + '%',
    totalPrice: 0 // 초기값 설정
  },
  {
    id: 1,
    category: "best",
    title: "[유튜버 콜라보] CNP 프로폴리스 에너지 액티브 앰플 대용량 세트(앰플35mlX2)",
    tag: "모든피부 사용가능",
    image: "./image/best/cnp_best2.jpg",
    price: 118000,
    discount: 0,
    totalPrice: 0 // 초기값 설정
  },
  {
    id: 2,
    category: "best",
    title: "CNP 프로폴리스 립세린",
    tag: "모든피부 사용가능",
    image: "./image/best/cnp_best3.jpg",
    price: 18000,
    discount: 45 + '%',
    totalPrice: 0 // 초기값 설정
  },
  {
    id: 3,
    category: "best",
    title: "CNP 프로폴리스 액티브 마스크 2매",
    tag: "모든피부 사용가능",
    image: "./image/best/cnp_best4.jpg",
    price: 9000,
    discount: 56 + '%',
    totalPrice: 0 // 초기값 설정
  },
  {
    id: 4,
    category: "md",
    title: "CNP 프로폴리스 에너지 액티브 앰플 대용량 세트(앰플35mlX2)",
    tag: "모든피부 사용가능",
    image: "./image/md/cnp_md1.jpg",
    price: 118000,
    discount: 40 + '%',
    totalPrice: 0 // 초기값 설정
  },
  {
    id: 5,
    category: "md",
    title: "CNP 프로폴리스 에센셜 아이 크림",
    tag: "모든피부 사용가능",
    image: "./image/md/cnp_md2.jpg",
    price: 41000,
    discount: 17 + '%',
    totalPrice: 0 // 초기값 설정
  },
  {
    id: 6,
    category: "md",
    title: "프로폴리스 앰플 50ml 기획 (35ml + 15ml)",
    tag: "모든피부 사용가능",
    image: "./image/md/cnp_md3.jpg",
    price: 85000,
    discount: 30 + '%',
    totalPrice: 0 // 초기값 설정
  },
  {
    id: 7,
    category: "md",
    title: "[1/12일주차 입고예정] 프로폴리스 트리트먼트 앰플 에센스 150ml",
    tag: "모든피부 사용가능",
    image: "./image/md/cnp_md4.jpg",
    price: 40000,
    discount: 24 + '%',
    totalPrice: 0 // 초기값 설정
  },
 
];

// 할인 적용 및 총 가격 계산
Data.forEach(item => {
  // 할인이 적용된 경우
  if (item.discount) {
    const discountPercentage = parseInt(item.discount);
    const discountedPrice = parseInt(item.price) - (parseInt(item.price) * discountPercentage) / 100;
    item.totalPrice = discountedPrice.toLocaleString(); // 숫자를 통화 형식으로 변환하여 설정
  } else {
    // 할인이 없는 경우
    item.totalPrice = item.price.toLocaleString(); // 숫자를 통화 형식으로 변환하여 설정
  }
  // 가격도 통화 형식으로 변환
  item.price = item.price.toLocaleString();
});

// 카테고리별 상품 추출 함수
// const getProductsByCategory = (category) => {
//   return Data.filter(item => item.category === category);
// };

// export default { Data, getProductsByCategory };
export default Data;