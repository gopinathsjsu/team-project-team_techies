import React from 'react'

import { Link } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar'
import {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'
import Axios from 'axios'
const Booking = (props) => {
  const[userInfo,setUserInfo] = useState([]);
  const[maxRewards,setMaxRewards] = useState("")
  const[firstName,setFirstName] = useState("");
  const[lastName,setLastName] = useState("");
  const[email,setEmail] = useState("");
  
  const flightInfo = props.location.flight;
  const depart_date = flightInfo.departure_date.slice(0,16);
  const arrival_date = flightInfo.arrival_date.slice(0,16);
  useEffect(()=>{
    const url ="http://localhost:5000/user";
    const token = localStorage.getItem('token');
   // Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    Axios.get(url,{headers: {"Authorization" : `Bearer ${token}`}})
    .then(async(response)=>{
      var res = await response.data;
        console.log(response)
        setUserInfo(response.data);
        if(res.mileage_points>0.6*flightInfo.price){
          setMaxRewards(0.6*flightInfo.price);
        }
        else{
          setMaxRewards(res.mileage_points)
        }

    }).catch(()=>{
        console.log('some error occurred!')
    })
},[])

const bookFlight = (e)=>{
  e.preventDefault();
  const url ="http://localhost:5000/booking";
  const token = localStorage.getItem('token');
 // Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
  Axios.post(url,{flight_oid:flightInfo.id,traveler_details:{
    name:firstName+" "+lastName,
    email:email
  },
payment:{
  reward_points_used:Math.ceil(maxRewards),
  cash:flightInfo.price - Math.ceil(maxRewards)
}},
    {headers: {"Authorization" : `Bearer ${token}`}})
  .then((response)=>{
      console.log(response)
     

  }).catch(()=>{
      console.log('some error occurred!')
  })
}
 

  return (
    <div style={{backgroundColor:"lightblue",height:1000}}>
      <CustomerNavbar/>
      <div>
        <h2>Book your flight</h2>
      </div>
      <div>
        <h3>Iternary:</h3>
      </div>
      <div>
      <h4> Flight Details :{"  "+flightInfo.flight_num+"  "+flightInfo.aircraft.name} </h4>
      <h4> Departure Airport :{"  "+flightInfo.departure_airport.code +" - "+ flightInfo.departure_airport.name} </h4>
      <h4> Arrival Airport :{"  "+flightInfo.arrival_airport.code +" - "+ flightInfo.arrival_airport.name} </h4>
      <h4> Departure Details :{"  "+depart_date +" "+ flightInfo.departure_time} </h4>
      <h4> Arrival Details :{"  "+arrival_date + " "+ flightInfo.arrival_time} </h4>
      <h4> Price :{"   $ "+flightInfo.price} </h4>
      </div>
      
                         <div className="login-form">
                            <div className="booking-div">
                                <div >
                                    <h2>Add passenger details - </h2>
                                    
                                </div>
                        
                            <div className="form-group">
                                <input onChange = {(e)=>setFirstName(e.target.value)} type="text" className="form-control"
                                       name="firstName" value ={firstName} placeholder="First Name" required={true}
                                      />
                            </div>
                            <div className="form-group">
                                <input onChange = {(e)=>setLastName(e.target.value)} type="text" className="form-control"
                                       name="lastName" value={lastName} placeholder="LastName" required={true}
                                       />
                            </div>
                            <div className="form-group">
                                <input onChange = {(e)=>setEmail(e.target.value)} type="email" className="form-control"
                                       name="email" value={email} placeholder="Email" required={true}
                                       />
                            </div>
                            
                            {/* <button className="btn btn-primary sm-5">Login</button>  */}
                            
                            <div>
                                <h4>Your total rewards points -  {userInfo.mileage_points}</h4>
                            </div>
                            <div>
                                <h4> Allowed points to redeem -  </h4>
                                <h4>{Math.ceil(maxRewards)}</h4>
                            </div>
                            <div>
                                <h4>Effective price ($) - </h4>
                                <h4>{flightInfo.price - Math.ceil(maxRewards)}</h4>
                            </div>
                            <button onClick={(e)=>bookFlight(e)} className="btn btn-primary sm-5">Book</button> 
                            
                    </div>
                </div>
           
            
      
      
    </div>
  )
}

export default Booking
