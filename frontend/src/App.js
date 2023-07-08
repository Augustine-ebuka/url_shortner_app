// Importing modules
import React from "react";
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Navbar from "./component/navbar";
import Home from './pages/home.jsx'
import Signup from './pages/signup'
import Signin from "./pages/signin";
import Dashboard from "./pages/profile";
import Footer from "./component/footer";



function App() {
	// const URL = "http://localhost:5000";
	return (
		<>
			<header className="App-header">
			</header>
			<Navbar />
			<Routes>
			<Route exact path='/' element={<Home/>}/>
			<Route exact path='/signup' element={<Signup/>}/>
			<Route exact path='/signin' element={<Signin />}/>
			<Route exact path='/dashboard' element={<Dashboard />}/>
			</Routes>
			<Footer></Footer>
	</>
	);
}

export default App;
