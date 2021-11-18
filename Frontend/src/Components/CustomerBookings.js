import React from 'react'
import { Link } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar'
import {useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'
import Table from 'react-bootstrap/Table'
const CustomerBookings = () => {

    const FlightData = [
        {
            "booking_num":"940QL3FTF99N",
            "flight_no":"UA1234",
            "departure_airport":"ORD",
            "arrival_airport":"LAX",
            "departure_date":"2019-06-24",
            "arrival_date":"2019-06-24",
            "departure_time":"22:10",
            "arrival_time":"23:15",
            "status":"Booked",
        },
        {
            "booking_num":"940QL3FTF99N",
            "flight_no":"UA1234",
            "departure_airport":"ORD",
            "arrival_airport":"LAX",
            "departure_date":"2019-06-24",
            "arrival_date":"2019-06-24",
            "departure_time":"22:10",
            "arrival_time":"23:15",
            "status":"Booked",
        },
        {  
            "booking_num":"940QL3FTF99N",
            "flight_no":"UA1234",
            "departure_airport":"ORD",
            "arrival_airport":"LAX",
            "departure_date":"2019-06-24",
            "arrival_date":"2019-06-24",
            "departure_time":"22:10",
            "arrival_time":"23:15",
            "status":"Booked",
        },
        {
            "booking_num":"940QL3FTF99N",
            "flight_no":"UA1234",
            "departure_airport":"ORD",
            "arrival_airport":"LAX",
            "departure_date":"2019-06-24",
            "arrival_date":"2019-06-24",
            "departure_time":"22:10",
            "arrival_time":"23:15",
            "status":"Booked",
        }
    ]
    return (
        <div style={{backgroundColor:"lightblue",height:600}}>
            <CustomerNavbar/>
            <h4>My Bookings</h4>
            <div style={{paddingTop:"30px"}} >
            <Table >
                <thead>
                    <tr>
                        <th>Booking_Id</th>
                        <th>Flight Number</th>
                        
                        <th>Departure Airport</th>
                        <th>Arrival Airport</th>
                        <th>Departure Date</th>
                        <th>Arrival Date</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {FlightData
                .map((val,idx)=>{
                return(
                    
                    <tr>
                        <td>{val.booking_num}</td>
                        <td>{val.flight_no}</td>
                    
                        <td>{val.departure_airport}</td>
                        <td>{val.arrival_airport}</td>
                        <td>{val.departure_date}</td>
                        <td>{val.arrival_date}</td>
                        <td>{val.departure_time}</td>
                        <td>{val.arrival_time}</td>
                        <td>{val.status}</td>
                        <td><button className="btn btn-primary" >Cancel</button></td>
                        

                    </tr>
                    
                )
            })}
                </tbody>
            </Table>
            </div>
        </div>
    )
}

export default CustomerBookings
