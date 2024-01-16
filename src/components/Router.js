import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Auth from '../routes/Auth';
import Navigation from './Navigation';


import Home from '../routes/Home';
// import Detail from '../routes/Detail';
// import Cart from '../routes/Cart';
import Login from '../routes/Login';
import SignUp from '../routes/SignUp';
import QnA from '../routes/QnA';
import Profile from '../routes/Profile';


const AppRouter = ({isLoggedIn,userObj, product, setProduct})=>{
  
	return(
		<>

		<Routes>
	
			<Route path="/" element={<Home product={product} setProduct={setProduct}/>}></Route>
			<Route path="/profile" element={<Profile userObj={userObj}/>}></Route>
			<Route path="/login" element={ <Login/> } />
			<Route path="/signup" element={<SignUp/>} />
			
		

		</Routes>
		</>
	)
  }
  export default AppRouter;