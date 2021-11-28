import React from 'react'
import { Link } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar'
import {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'
import Table from 'react-bootstrap/Table'
import Employee_Landing from './Employee_Landing';
import {Modal} from 'react-bootstrap';
import Axios from 'axios'
const EmployeeViewFlights = () => {

    const[modal,setModal]=useState(false);
    const[price,setPrice] = useState(0.0);
    const[flightId,setFlightId] = useState("");
    const[flightData,setFlightData] = useState([]);

    const cancelFlight=(e,flight_id)=>{
        e.preventDefault();
        const url ="http://localhost:5000/flight";
        Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        Axios.put(url,{flight_status:'canceled',id:flight_id})
        .then((response)=>{
            console.log("flight price updated successfully");
        }).catch(()=>{
            console.log('some error occurred!')
        })

    }

    const updatePrice=(e,flight_id)=>{
        e.preventDefault();
        setModal(false);
        const url ="http://localhost:5000/flight";
        Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        Axios.put(url,{price:price,id:flight_id})
        .then((response)=>{
            console.log("flight cancelled successfully");
        }).catch(()=>{
            console.log('some error occurred!')
        })

    }
    useEffect(()=>{
        const url ="http://localhost:5000/flight";
        Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        Axios.get(url)
        .then((response)=>{
            setFlightData(response.data);
        }).catch(()=>{
            console.log('some error occurred!')
        })
    },[])

const mockData = [
    {
        "_id": {
            "$oid": "61a26d7d500dc3da968da8f1"
        },
        "aircraft": {
            "$oid": "6184a9d1c2bf805a6ec5164a",
            "name": "Boeing 737"
        },
        "arrival_airport": {
            "$oid": "61849d3f4367d925b16ff24b",
            "city": "San Jose",
            "code": "SJC",
            "name": "San Jose International Airport"
        },
        "arrival_date": {
            "$date": 1641686400000
        },
        "arrival_time": "08:00",
        "departure_airport": {
            "$oid": "61849d5f4367d925b16ff24c",
            "city": "San Francisco",
            "code": "SFO",
            "name": "San Francisco International Airport"
        },
        "departure_date": {
            "$date": 1641686400000
        },
        "departure_time": "07:00",
        "flight_num": "AA3457",
        "flight_status": "scheduled",
        "modified_at": {
            "$date": 1638019405576
        },
        "price": 40.0,
        "remaining_seats": 59,
        "seat_chart": {
            "aisle": [
                "1A"
            ],
            "middle": [
                "1B"
            ],
            "window": []
        },
        "seat_price": {
            "aisle": 3,
            "middle": 0,
            "window": 5
        },
        "seats": {
            "aisle": 20,
            "middle": 20,
            "window": 16
        }
    }
]

    
    return (
        <div style={{backgroundColor:"lightblue",height:600}}>
            <Employee_Landing/>
            <h4>Our Flights...</h4>
            <div style={{paddingTop:"30px"}} >
            <Table >
                <thead>
                    <tr>
                        
                        <th>Flight Number</th>
                        <th>AirCraft</th>
                        <th>Departure Airport</th>
                        <th>Arrival Airport</th>
                        <th>Departure Date</th>
                        <th>Arrival Date</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Update</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
                {mockData
                .map((val,idx)=>{
                return(
                    
                    <tr>
                        <td>{val.flight_num}</td>
                        <td>{val.aircraft.name}</td>
                        <td>{val.departure_airport.city}</td>
                        <td>{val.arrival_airport.city}</td>
                        <td>{val.departure_date.$date}</td>
                        <td>{val.arrival_date.$date}</td>
                        <td>{val.departure_time}</td>
                        <td>{val.arrival_time}</td>
                        <td>{val.flight_status}</td>
                        <td>{val.price}</td>
                        <td><button onClick={()=>{
                            setModal(true);
                            setPrice(val.price);
                            setFlightId(val._id)
                        }} className="btn btn-primary" >Edit</button></td>
                        <td><button onClick = {(e)=>{
                            setFlightId(val._id)
                            cancelFlight(e,flightId)}}className="btn btn-primary" >Cancel</button></td>

                    </tr>
                    
                )
            })}
                </tbody>
            </Table>
            </div>

            <Modal show={modal} onHide={()=>{setModal(false)}}>
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                    <div >
                         <div className="login-form">
                            <div className="main-div-login">
                                <div >
                                    <h2>Edit Price</h2>
                                    <p>Please enter new price</p>
                                </div>
                        
                            <div className="form-group">
                                <input onChange = {(e)=>setPrice(e.target.value)} type="text" className="form-control"
                                       name="useremail" value ={price} placeholder="price" required={true}
                                      />
                            </div>
                           
                            
                            <button onClick={(e)=>updatePrice(e,flightId)} className="btn btn-primary sm-5">Edit</button> 
                            
                            
                            
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

export default EmployeeViewFlights
