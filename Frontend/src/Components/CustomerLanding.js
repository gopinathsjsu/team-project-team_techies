import React from 'react'
import CustomerNavbar from './CustomerNavbar'
import {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'
import Axios from 'axios'

const CustomerLanding = () => {
    
    const[depDate,setDepDate]=useState("");
    const[origin,setOrigin] = useState("");
    const[destination,setDestination] = useState("");
    const[airportData,setAirportData]=useState([]);
    

    useEffect(()=>{
        const url ="http://localhost:5000/airport";
        Axios.get(url)
        .then((response)=>{
            setAirportData(response.data);
        }).catch(()=>{
            console.log('some error occurred!')
        })
    },[])

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
                                Search Flight
                            </h4>
                        </div>
                        <div>
                        <select id="arrival airport" value={origin} onChange={(e)=>{
                            setOrigin(e.target.value);
                        }} style={{ width: "280px",height:"38px",border:"1px solid black" }}>
                            <option value="" disabled selected hidden>Origin City</option>
                            {airports.map((airport)=>{
                                return <option value={airport.code}>{airport.code + " ("+ airport.name + ")"}</option>
                            })}
                           
                        </select>
                        </div>
                       
                        
                          
                        <br></br>

                        <div>
                        <select id="departure airport" value={destination} onChange={(e)=>{
                            setDestination(e.target.value)
                        }} style={{ width: "280px",height:"38px",border:"1px solid black" }}>
                            <option value="" disabled selected hidden>Destination City</option>
                            {airports.filter((value)=>{
                                if(origin!=value.code){
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
