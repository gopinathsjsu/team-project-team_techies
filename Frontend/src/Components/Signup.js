import React from 'react'
import {useState } from "react";
import '../App.css'
import Landing from './Landing';

const Signup = () => {

    const[email,setEmail] = useState("");
    const[password,setPassword]=useState("");
    const[firstName,setFirstName] = useState("");
    const[lastName,setLastName]=useState("");
    const[contact,setContact]=useState("");
    return (
        <div>
             <Landing/>
            <div className="container">
            <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                            <h2>Sign up</h2>
                            
                        </div>
                        <div className="form-group">
                                <input onChange = {(e)=>setFirstName(e.target.value)} type="text" className="form-control"
                                       name="firstname" value ={firstName} placeholder="First Name " required={true}
                                      />
                        </div>

                        <div className="form-group">
                                <input onChange = {(e)=>setLastName(e.target.value)} type="text" className="form-control"
                                       name="lastname" value ={lastName} placeholder="Last Name " required={true}
                                      />
                        </div>
                        
                        
                            <div className="form-group">
                                <input onChange = {(e)=>setEmail(e.target.value)} type="email" className="form-control"
                                       name="useremail" value ={email} placeholder="email" required={true}
                                      />
                            </div>
                            <div className="form-group">
                                <input onChange = {(e)=>setPassword(e.target.value)} type="password" className="form-control"
                                       name="password" value ={password} placeholder="Password" required={true}
                                       />
                            </div>
                            
                            <button className="btn btn-primary">Sign up</button> 
                            
                            
                            
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
