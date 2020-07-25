import React, { Component } from 'react'; 
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Login from './login/Login'; 
import Home from './home/Home';
import Profile from './profile/Profile';

class App extends Component { 
render() { 
	return ( 
	<Router> 
		<div className="App"> 
            <Route exact path='/' component={Login}></Route> 
			<Route exact path='/home' component={Home}></Route> 
			<Route exact path='/profile' component={Profile}></Route> 
		</div> 
	</Router> 
); 
} 
} 

export default App; 
