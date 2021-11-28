import React from 'react'
import { Link,useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'
import Axios from 'axios'
import { Navbar,Nav,NavItem,Form,FormControl,Button,Modal} from 'react-bootstrap';
import {useState } from "react";

const Landing = () => {
    let history=useHistory();
    const[login,setLogin]=useState(false);
    const[email,setEmail] = useState("");
    const[password,setPassword]=useState("");
    const[userInfo,setUserInfo]=useState([]);

    const mockData = [
        {
            "message": "User - nidhi@gmail.com login successfully",
            "user": {
                "first_name": "nidhi",
                "user_type": "employer"
            }
        }
    ]

    const userLogin = (e)=>{
        setLogin(false);
        const url="http://localhost:5000/user";
        Axios.post( url,{email:email,password:password
    
    }).then(async(response)=>{
        var userResponseData = await response.data;
        console.log(userResponseData);
        setUserInfo(response.data);
        var enitreToken = response.headers.get('Authorization');
        var mainToken = enitreToken.split(" ");
        var token = mainToken[1];
        localStorage.setItem('token',token);

        userInfo.map((loginuser)=>{
            if(loginuser.user.user_type=="admin"){
                history.push("/employee");
            }
            else{
                history.push("/customer");
            }
        })
        
       
    }

    ).catch(()=>{
        console.log("some error occurred");
    }

    )

    }
    

    return (
        <div>
            <Navbar bg="dark" variant="dark" sticky="top">
                <Navbar.Brand>Techies Airline</Navbar.Brand>
                <Nav>
                    <Nav.Link href="/"> Home </Nav.Link>
                    <Nav.Link href=""> About  </Nav.Link>
                    <Nav.Link href=""> Contact </Nav.Link>
                </Nav>
                <Nav >
                  <Nav.Link onClick={()=>{setLogin(true)}}> Login</Nav.Link > 
                </Nav>

                <Nav >
                  <Nav.Link href="/signup"> Sign up</Nav.Link > 
                </Nav>
               
                </Navbar>
                <Modal show={login} onHide={()=>{setLogin(false)}}>
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                    <div >
                         <div className="login-form">
                            <div className="main-div-login">
                                <div >
                                    <h2>Login</h2>
                                    <p>Please enter your email and password</p>
                                </div>
                        
                            <div className="form-group">
                                <input onChange = {(e)=>setEmail(e.target.value)} type="email" className="form-control"
                                       name="useremail" value ={email} placeholder="email" required={true}
                                      />
                            </div>
                            <div className="form-group">
                                <input onChange = {(e)=>setPassword(e.target.value)} type="password" className="form-control"
                                       name="password" value={password} placeholder="Password" required={true}
                                       />
                            </div>
                            
                            <button onClick={(e)=>userLogin(e)} className="btn btn-primary sm-5">Login</button> 
                            
                            
                            
                    </div>
                </div>
            </div>
                    </Modal.Body>
                    <Modal.Footer>
                    
                    </Modal.Footer>
                    

                </Modal>
            
           
            
   
        </div>
    )
}

export default Landing


