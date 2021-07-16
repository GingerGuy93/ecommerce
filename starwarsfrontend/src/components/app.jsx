import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { Component } from "react";
import {Route, Switch, Link} from 'react-router-dom';
import Login from "./Login/login";
import Registration from "./Registration/registration";
import HomePage from "./HomePage/homepage";

export class App extends Component {
    constructor(props){
        super(props)
        this.state = { 
            token: [],
            user: [],
            productTable: [],
            visible: false,
        };
    }

    componentDidMount(){
        this.productTable();
        const jwt = localStorage.getItem('token');
        try{
            const user = jwtDecode(jwt);
            this.setState({user});

        }catch {}
    }

    register = async (user) => {
        let response = await axios.post("https://localhost:44394//api/authentication", user);
        if (response === undefined) {
          this.setState({});
        } else {
          this.setState({
            user: response.data,
          });
        } 
    };

    login = async (login) => {
        let response = await axios.post("https://localhost:44394/api/authentication/login", login);
        if (response === undefined) {
          this.setState({});
        } else {
          this.setState({
            token: response.data,
          });
        }
      };

    productTable = async () => {
        let response = await axios.get("http://127.0.0.1:8000/api/products/products/");
        if (response === undefined) {
            this.setState({});
        } else {
            this.setState( {
                productTable: response.data
            });
        }
    }

      showForm = () => {
        this.setState({
          visible: !this.state.visible,
        });
      };
    
    render() {
        return (
            <div>
                <h1>STAR WARS</h1>
                <div>
                <button onClick={() => {
                    this.showForm();
                }}>Register</button>
                {this.state.visible? (
                    <Registration register={this.register}/>
                ):null}
                </div>
                <Switch>
                    <Route path='/' render={props => <Login {...props} login={this.login}/>}/>
                    <Route path='/homePage' render={props => <HomePage {...props} products={this.state.productTable}/>}/>
                </Switch>
            </div>  
        );
    }
}

export default App;