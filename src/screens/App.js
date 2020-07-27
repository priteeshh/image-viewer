import React, { Component } from 'react'; 
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Login from './login/Login'; 
import Home from './home/Home';
import Profile from './profile/Profile';

class App extends Component { 
	constructor() {
        super();
        this.state = {
            api: {
				profileURL : 'https://graph.instagram.com/me?fields=id,username,media_count,account_type&access_token=',
				mediaURL : 'https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,caption,timestamp&access_token='
			}
        };
    }
render() { 
	return ( 
	<Router> 
		<div className="App"> 
            <Route exact path='/' component={Login}></Route>
			<Route exact path='/home' component={(props) => <Home api= {this.state.api} {...props} />} ></Route> 
			<Route exact path='/profile' component={(props) => <Profile api= {this.state.api} {...props} />} api= {this.state.api}></Route> 

		</div> 
	</Router> 
); 
} 
} 

export default App; 
