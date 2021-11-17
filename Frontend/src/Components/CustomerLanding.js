import React from 'react'
import CustomerNavbar from './CustomerNavbar'
import {useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'

const CustomerLanding = () => {
    const[price,setPrice]=useState("");
    const[aircraft,setAircraft] = useState("");
    const[depDate,setDepDate]=useState("");
    const[arrDate,setArrDate]=useState("");
    const[depTime,setDepTime]=useState("");
    const[arrTime,setArrTime]=useState("");
    return (
        <div style={{backgroundColor:"lightblue",height:600}}>
            <CustomerNavbar/>
            <div style={{paddingTop:"20px",color:"blue"}}>
                <h2>You are now free to move about the country...</h2>
            </div>
            <div className="container" >
            <div className="login-form">
                    <div className="search-main-div">
                        <div>
                            <h4>
                                One Way
                            </h4>
                        </div>
                        
                        <div >
                        <select id="aircraft" style={{ width: "280px",height:"38px",border:"1px solid black"}}>
                            <option  value="" disabled selected hidden>Origin City</option>
                            <option value="SJC">SJC (San Jose Airport)</option>
                            <option value="LAX">LAX</option>
                            <option value="ATL">ATL</option>
                            <option value="BOS">BOS</option>
                            <option value="MSP">MSP</option>
                        </select>
                        </div>
                        <br></br>

                        <div>
                        <select id="departure airport" style={{ width: "280px",height:"38px",border:"1px solid black" }}>
                            <option value="" disabled selected hidden  >Destination City</option>
                            <option value="SJC">SJC (San Jose Airport)</option>
                            <option value="LAX">LAX</option>
                            <option value="ATL">ATL</option>
                            <option value="BOS">BOS</option>
                            <option value="MSP">MSP</option>
                        </select>
                        </div>
                        <br></br>

                        <div className="form-group">
                                <input onChange = {(e)=>setDepDate(e.target.value)} type="date" className="form-control"
                                       name="date" value ={depDate} placeholder="Date" required={true}
                                      />
                        </div>
                        <br></br>
                        <button className="btn btn-primary">Search</button> 
                        </div>
                </div>
            </div>

         
            
        </div>
    )
}

export default CustomerLanding
