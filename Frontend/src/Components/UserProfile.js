import React from 'react'
import CustomerNavbar from './CustomerNavbar'
import {useState,useEffect} from "react";
import Axios from 'axios'
const UserProfile = () => {
    const userDetails = [{
        "email":"sameerjoshi42@gmail.com",
        "first_name":"Sameer",
        "last_name":"Joshi",
        "mileage_points":10.00
    }]

    const[userInfo,setUserInfo] = useState([]);

    useEffect(()=>{
        const url ="http://localhost:5000/user";
        const token = localStorage.getItem('token');
       // Axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        Axios.get(url,{headers: {"Authorization" : `Bearer ${token}`}})
        .then((response)=>{
            console.log(response)
            setUserInfo(response.data);
        }).catch(()=>{
            console.log('some error occurred!')
        })
    },[])
    return (
        <div>
            <CustomerNavbar/>
            
                    <div>
                        <h3><strong> Profile</strong></h3>
            <div style={{paddingTop:"20px"}}>
                <img src="../../profile_202.jpg"></img>
            </div>
            <div style={{paddingTop:"20px"}}>
            <h4><strong> First Name : </strong></h4>
            </div>
            
            <div>
            <h4>{userInfo.first_name}</h4>
            </div>
            <div style={{paddingTop:"20px"}}>
            <h4><strong> Last Name : </strong></h4>
            </div>

            <div>
            <h4> {userInfo.last_name}</h4>
            </div>

            <div style={{paddingTop:"20px"}}>
            <h4><strong> Email : </strong></h4>
            </div>

            <div>
            <h4> {userInfo.email}</h4>
            </div>

            <div style={{paddingTop:"20px"}}>
            <h4><strong> Reward Points : </strong></h4>
            </div>

            <div>
            <h4> {userInfo.mileage_points}</h4>
            </div>
                    </div>    
             
            
        </div>
    )
}

export default UserProfile
