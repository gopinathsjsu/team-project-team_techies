import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {useState,useEffect} from "react";
import '../App.css'
import Employee_Landing from './Employee_Landing';
import Axios from 'axios'

const AddFlight = () => {
    
    const[price,setPrice]=useState(0.0);
    const[aircraft,setAircraft] = useState("");
    const[aircraftData,setAircraftData] = useState([]);
    const[depDate,setDepDate]=useState("");
    const[arrDate,setArrDate]=useState("");
    const[depTime,setDepTime]=useState("");
    const[arrTime,setArrTime]=useState("");
    const[depAirport,setDepAirport]=useState("");
    const[airportData,setAirportData]=useState([]);
    const[arrAirport,setArrAirport]=useState("");
    



    const airports=[{
    "code" : "SJC",
    "name" : "San Jose International Airport",
    "city" : "San Jose"
    },
    {
    "code" : "SFO",
    "name" : "San Francisco International Airport",
    "city" : "San Francisco"
    },
  
            
]
  
    
    const aircrafts = [{
    "name" : "Airbus A380",
    },
    {
    "name" : "Boeing 737",
    },
    {
    "name" : "DreamLiner 787",
    },
]

    const url="http://localhost:5000/flight";
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

    ).catch(()=>{
        console.log('some error occurred!')
    }

    )
    useEffect(()=>{
        const url ="http://localhost:5000/aircraft";
        Axios.get(url)
        .then((response)=>{
            setAircraftData(response.data);
        }).catch(()=>{
            console.log('some error occurred!')
        })
    },[])

    useEffect(()=>{
        const url ="http://localhost:5000/airport";
        Axios.get(url)
        .then((response)=>{
            setAirportData(response.data);
        }).catch(()=>{
            console.log('some error occurred!')
        })
    },[])
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
                            <option value="" disabled selected hidden>Select Aircraft</option>
                            {aircrafts.map((aircraft)=>{
                                return <option value={aircraft.name}>{aircraft.name}</option>
                            })}
                        </select>
                        </div>
                        <br></br>

                        <div >
                        <select id="departure airport" value={depAirport} onChange={(e)=>{
                            setDepAirport(e.target.value);
                        }} style={{ width: "280px",height:"38px",border:"1px solid black" }}>
                            <option value="" disabled selected hidden>Select Departure Airport</option>
                            {airports.map((airport)=>{
                                return <option value={airport.code}>{airport.code + " ("+ airport.name + ")"}</option>
                            })}
                        </select>
                        </div>
                        <br></br>

                        <div >
                        <select id="arrival airport" value={arrAirport} onChange={(e)=>{
                            setArrAirport(e.target.value)
                        }} style={{ width: "280px",height:"38px",border:"1px solid black" }}>
                            <option value="" disabled selected hidden>Select Arrival Airport</option>
                            {airports.filter((value)=>{
                                if(depAirport!=value.code){
                                    return value;
                                }
                            }).map((airport)=>{
                                return <option value={airport.code}>{airport.code + " ("+ airport.name + ")"}</option>
                            })}
                        </select>
                        </div>
                        <br></br>

                        

                        <div className="form-group">
                                <input onChange = {(e)=>setDepDate(e.target.value)} type="date" className="form-control"
                                       name="date" value ={depDate} placeholder="Departure Date" required={true}
                                      />
                        </div>

                        <div className="form-group">
                                <input onChange = {(e)=>setArrDate(e.target.value)} type="date" className="form-control"
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
