import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {useState } from "react";
import '../App.css'
import Employee_Landing from './Employee_Landing';
import Axios from 'axios'

const AddFlight = () => {
    
    const[price,setPrice]=useState(0.0);
    const[aircraft,setAircraft] = useState("");
    const[depDate,setDepDate]=useState("");
    const[arrDate,setArrDate]=useState("");
    const[depTime,setDepTime]=useState("");
    const[arrTime,setArrTime]=useState("");
    const[depAirport,setDepAirport]=useState("");
    const[arrAirport,setArrAirport]=useState("");

    const url="http://localhost:3001/flight";
    Axios.post( url,{
        aircraft:aircraft,
        departure_airport:depAirport,
        arrival_airport:arrAirport,
        departure_date:depDate,
        arrival_date:arrDate,
        departure_time:depTime,
        arrival_time:arrTime,
        price:price

    
    }).then((response)=>{
        console.log(response)
    }

    ).catch(

    )
    return (
        <div>
            <Employee_Landing/>
            <div className="container">
            <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                            <h2>Add a flight</h2>
                            
                        </div>
                        <div >
                        <select id="aircraft" value={aircraft} onChange={(e)=>{
                            setAircraft(e.target.value);
                        }} style={{ width: "280px",height:"38px",border:"1px solid black" }}>
                            <option value="" disabled selected hidden style={{textAlign:"center"}}>Select AirCraft</option>
                            <option value="AirBus A380">AirBus A380</option>
                            <option value="Boeing 747">Boeing 747</option>
                            <option value="DreamLiner 787">DreamLiner 787</option>
                        </select>
                        </div>
                        <br></br>

                        <div >
                        <select id="departure airport" value={depAirport} onChange={(e)=>{
                            setDepAirport(e.target.value);
                        }} style={{ width: "280px",height:"38px",border:"1px solid black" }}>
                            <option value="" disabled selected hidden style={{textAlign:"center"}}>Select Departure AirPort</option>
                            <option value="SJC">SJC (San Jose Airport)</option>
                            <option value="LAX">LAX</option>
                            <option value="ATL">ATL</option>
                            <option value="BOS">BOS</option>
                            <option value="MSP">MSP</option>
                        </select>
                        </div>
                        <br></br>

                        <div >
                        <select id="arrival airport" value={arrAirport} onChange={(e)=>{
                            setArrAirport(e.target.value)
                        }} style={{ width: "280px",height:"38px",border:"1px solid black" }}>
                            <option value="" disabled selected hidden style={{textAlign:"center"}}>Select Arrival AirPort</option>
                            <option value="SJC">SJC</option>
                            <option value="LAX">LAX</option>
                            <option value="ATL">ATL</option>
                            <option value="BOS">BOS</option>
                            <option value="MSP">MSP</option>
                        </select>
                        </div>
                        <br></br>

                        

                        <div className="form-group">
                                <input onChange = {(e)=>setDepDate(e.target.value)} type="text" className="form-control"
                                       name="date" value ={depDate} placeholder="Departure Date" required={true}
                                      />
                        </div>

                        <div className="form-group">
                                <input onChange = {(e)=>setArrDate(e.target.value)} type="text" className="form-control"
                                       name="date" value ={arrDate} placeholder="Arrival Date" required={true}
                                      />
                        </div>
                        
                        
                            <div className="form-group">
                                <input onChange = {(e)=>setDepTime(e.target.value)} type="text" className="form-control"
                                       name="dep time" value ={depTime} placeholder="Departure Time" required={true}
                                      />
                            </div>

                            <div className="form-group">
                                <input onChange = {(e)=>setArrTime(e.target.value)} type="text" className="form-control"
                                       name="arr time" value ={arrTime} placeholder="Arrival Time" required={true}
                                      />
                            </div>

                            <div className="form-group">
                                <input onChange = {(e)=>setPrice(e.target.value)} type="text" className="form-control"
                                       name="price" value ={price} placeholder="Price" required={true}
                                       />
                            </div>
                            
                            <button className="btn btn-primary">Add</button> 
                            
                            
                            
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default AddFlight
