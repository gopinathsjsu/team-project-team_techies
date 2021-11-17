import React from 'react'
import { Link } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar'
import {useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'
import Table from 'react-bootstrap/Table'
import Employee_Landing from './Employee_Landing';
const EmployeeViewFlights = () => {

    const FlightData = [
        {
            "flight_no":"UA1234",
            "departure_airport":"ORD",
            "arrival_airport":"LAX",
            "departure_date":"2019-06-24",
            "arrival_date":"2019-06-24",
            "departure_time":"22:10",
            "arrival_time":"23:15",
            "aircraft":"Boeing 747",
            "flight_status" : "scheduled"
        },
        {
            "flight_no":"UA1234",
            "departure_airport":"ORD",
            "arrival_airport":"LAX",
            "departure_date":"2019-06-24",
            "arrival_date":"2019-06-24",
            "departure_time":"22:10",
            "arrival_time":"23:15",
            "aircraft":"Boeing 747",
            "flight_status" : "scheduled"
        },
        {
            "flight_no":"UA1234",
            "departure_airport":"ORD",
            "arrival_airport":"LAX",
            "departure_date":"2019-06-24",
            "arrival_date":"2019-06-24",
            "departure_time":"22:10",
            "arrival_time":"23:15",
            "aircraft":"Boeing 747",
            "flight_status" : "scheduled"
        },
        {
            "flight_no":"UA1234",
            "departure_airport":"ORD",
            "arrival_airport":"LAX",
            "departure_date":"2019-06-24",
            "arrival_date":"2019-06-24",
            "departure_time":"22:10",
            "arrival_time":"23:15",
            "aircraft":"Boeing 747",
            "flight_status" : "scheduled"
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
                        <th>Update</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
                {FlightData
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
                        <td><button className="btn btn-primary" >Edit</button></td>
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

export default EmployeeViewFlights
