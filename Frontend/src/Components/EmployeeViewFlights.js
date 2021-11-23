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
    const[flightData,setFlightData] = useState([]);

    const updatePrice=(e)=>{
        e.preventDefault();
        const url ="http://localhost:5000/flight";
        Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        Axios.put(url,{price:price})
        .then((response)=>{
            console.log("flight price updated successfully");
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



    // const FlightData = [
    //     {
    //         "flight_no":"UA1234",
    //         "departure_airport":"ORD",
    //         "arrival_airport":"LAX",
    //         "departure_date":"2019-06-24",
    //         "arrival_date":"2019-06-24",
    //         "departure_time":"22:10",
    //         "arrival_time":"23:15",
    //         "aircraft":"Boeing 747",
    //         "flight_status" : "Scheduled",
    //         "price":150.00
    //     },
    //     {
    //         "flight_no":"UA1234",
    //         "departure_airport":"ORD",
    //         "arrival_airport":"LAX",
    //         "departure_date":"2019-06-24",
    //         "arrival_date":"2019-06-24",
    //         "departure_time":"22:10",
    //         "arrival_time":"23:15",
    //         "aircraft":"Boeing 747",
    //         "flight_status" : "Scheduled",
    //         "price":100.00
    //     },
    //     {
    //         "flight_no":"UA1234",
    //         "departure_airport":"ORD",
    //         "arrival_airport":"LAX",
    //         "departure_date":"2019-06-24",
    //         "arrival_date":"2019-06-24",
    //         "departure_time":"22:10",
    //         "arrival_time":"23:15",
    //         "aircraft":"Boeing 747",
    //         "flight_status" : "Scheduled",
    //         "price":120.00
    //     },
    //     {
    //         "flight_no":"UA1234",
    //         "departure_airport":"ORD",
    //         "arrival_airport":"LAX",
    //         "departure_date":"2019-06-24",
    //         "arrival_date":"2019-06-24",
    //         "departure_time":"22:10",
    //         "arrival_time":"23:15",
    //         "aircraft":"Boeing 747",
    //         "flight_status" : "Scheduled",
    //         "price":90.00
    //     }
    // ]
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
                {flightData
                .map((val,idx)=>{
                return(
                    
                    <tr>
                        <td>{val.flight_no}</td>
                        <td>{val.aircraft}</td>
                        <td>{val.departure_airport}</td>
                        <td>{val.arrival_airport}</td>
                        <td>{val.departure_date}</td>
                        <td>{val.arrival_date}</td>
                        <td>{val.departure_time}</td>
                        <td>{val.arrival_time}</td>
                        <td>{val.flight_status}</td>
                        <td>{val.price}</td>
                        <td><button onClick={()=>{
                            setModal(true);
                            setPrice(val.price)
                        }} className="btn btn-primary" >Edit</button></td>
                        <td><button className="btn btn-primary" >Cancel</button></td>

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
                           
                            
                            <button onClick={(e)=>updatePrice(e)} className="btn btn-primary sm-5">Edit</button> 
                            
                            
                            
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
