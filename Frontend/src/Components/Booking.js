import React,{useState} from 'react';
import '../CSS/Booking.css'
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'
import userInfo from './UserProfile'    

import {useHistory } from 'react-router-dom';

const Booking = (props) => {
  let user = {
    email: 'nidhi@gmail.com'
  };
  // console.log(userInfo)
  
  /* ------------- CHECK THIS ----------------
     ------ API to fetch reward points -------

    Axios.get('http://localhost:5000/user', user).
      then((response)=>{
        console.log('User get api response: ', response)
        if (response.status === 200) {
          // console.log('');
        }
      }).catch(
        console.log('Something went wrong! HERE!@@@@')
      )
  */

  const [flightInfo] = useState({
    flight_num: (props.location.flight) ? (props.location.flight.flight_no ? props.location.flight.flight_no : 'DUMMY DATA') : 'DUMMY DATA',
    departure_airport: (props.location.flight) ? (props.location.flight.departure_airport ? props.location.flight.departure_airport: 'DUMMY DATA') : 'DUMMY DATA',
    departure_date: (props.location.flight) ? (props.location.flight.departure_date ? props.location.flight.departure_date : 'DUMMY DATA1') : 'DUMMY DATA1',
    arrival_airport: (props.location.flight) ? (props.location.flight.arrival_airport ? props.location.flight.arrival_airport: 'DUMMY DATA2') : 'DUMMY DATA2',
    arrival_date: (props.location.flight) ? (props.location.flight.arrival_date ? props.location.flight.arrival_date: 'DUMMY DATA3') : 'DUMMY DATA3',
    price: (props.location.flight) ? (props.location.flight.price ? props.location.flight.price: 3000) : 3000
  });

  const [cardNumber,setCardNumber] = useState('')
  const [name,setName] = useState('')
  const [cvv,setCvv] = useState('')
  const [expirydate,setExpiryDate] = useState('')
  // const [price,setPrice] = useState(props?.price)
  const [price,setPrice] = useState(flightInfo.price)
  const [priceDiscount,setPriceDiscount] = useState(5); // CHECK THIS - If the default price discount should be 5
  const [travellerDetails,setTravellerDetails] = useState({firstName:'',id:'',lastName:'',email:'',dob:'',nationality:'',contactNo:''})


  const history = useHistory(); //added/changed this

  let bookingData = {
    flight_oid: "6192cf0795636ba8b9bf824a",  // CHECK THIS. From where will we get this value?
    travellerDetails, //{firstName:'',title:'',id:'',lastName:'',email:'',dob:'',nationality:'',contactNo:''}
    payment:{
      reward_points_used : 20, // CHECK THIS - Will be set when we fetch it in the start
      cash: price - priceDiscount}
  }

  function clearRedeemInput(e) {
    document.getElementById('price-discount-input').value = '';
  }
    
  return (
    <div className="maincontainer">

      <div class="container">
      <div class="row">
      <div class="col-md-5 order-md-1">
            <h4 class="d-flex justify-content-between align-items-left mb-3">
              <span class="text-muted">Flight Info</span>
              <span class="badge badge-secondary badge-pill">3</span>
            </h4>

            <form class="card p-2">
              <div class="input-group">
              <span  class="form-control" >flight_num  aircraft</span>
              </div>
            </form>
            
            <ul class="list-group mb-3">
      
            <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                  <h6 class="my-0">flight_num</h6>
                </div>
                <span class="text-success">{flightInfo.flight_num}</span>

              </li>
              <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                  <h6 class="my-0">departure_airport</h6>
                </div>
                <span class="text-success">{flightInfo.departure_airport}</span>

              </li>
              <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                  <h6 class="my-0">departure_date</h6>
                  <small>departure_time</small>
                </div>
                <span class="text-success">{flightInfo.departure_date}</span>

              </li>
              <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                  <h6 class="my-0">arrival_airport</h6>
                </div>
                <span class="text-success">{flightInfo.arrival_airport}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                  <h6 class="my-0">arrival_date</h6>
                  <small>arrival_time</small>
                </div>
                <span class="text-success">{flightInfo.arrival_date}</span>

              </li>
              <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                  <h6 class="my-0">Price</h6>
                </div>
                <span class="text-success">${flightInfo.price}</span>
              </li>
            </ul>

          </div>
          </div>
        <div class="row">
          <div class="col-md-3 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted">Reward Points</span>
              <span class="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                  <h6 class="my-0">Discount</h6>
                </div>
                <span class="text-success">-${priceDiscount}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Total Price(USD)</span>
                <strong>${price - priceDiscount}</strong>
              </li>
            </ul>

            <form class="card p-2">
              <div class="input-group">
                <input id="price-discount-input" onChange = {e => setPriceDiscount(e.target.value)} type="number" class="form-control" placeholder="Enter Discount Amount"/>
                <div class="input-group-append">
                  <button onClick = {e => clearRedeemInput()} type="button" class="btn btn-secondary">Redeem</button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-md-7 order-md-1">
            <h4 class="col-md-3 mb-1">Traveller Details</h4>
            <form class="needs-validation" novalidate>
              <div class="row">
                <div class="col-md-3 mb-3">
                  <label for="firstName">First name</label>
                  <input onChange = {e=>setTravellerDetails({...travellerDetails,'firstName':e.target.value})} value={travellerDetails?.firstName} type="text" class="form-control" id="firstName"  required />
                  <div class="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="lastName">Last name</label>
                  <input onChange = {e=>setTravellerDetails({...travellerDetails,'lastName':e.target.value})} value = {travellerDetails.lastName} type="text" class="form-control" id="lastName" placeholder=""  required />
                  <div class="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
              </div>

              <div class="col-md-3 mb-1">
                <label for="username">ID Number</label>
                <div class="input-group">
                  
                  <input onChange = {e=>setTravellerDetails({...travellerDetails,'id':e.target.value})} value={travellerDetails?.id} autoComplete = "off" type="text" class="form-control" id="username" placeholder="ID Number" required />
                  <div class="invalid-feedback">
                    Your ID Number is required.
                  </div>
                </div>
              </div>

              <div class="col-md-3 mb-3">
                <label for="dob">Date of Birth </label>
                <input onChange = {e=>setTravellerDetails({...travellerDetails,'dob':e.target.value})} value = {travellerDetails?.dob} autoComplete = "off" type="input" class="form-control" id="dob" placeholder="dd-mm-yyyy" />
                <div class="invalid-feedback">
                  DOB
                </div>
                <label for="Nationality">Nationality</label>
                <input onChange = {e=>setTravellerDetails({...travellerDetails,'nationality':e.target.value})} value={travellerDetails?.nationality} autoComplete = "off" type="input" class="form-control" id="nationality" placeholder="Nationality" />
                <div class="invalid-feedback">
                  Nationality
                </div>
              </div>

              <div class="col-md-3 mb-3">
                <label for="email">Email </label>
                <input onChange = {e=>setTravellerDetails({...travellerDetails,'email':e.target.value})} value={travellerDetails?.email}  autoComplete = "off" type="email" class="form-control" id="email" placeholder="you@example.com" />
                <div class="invalid-feedback">
                  email address
                </div>
              </div>

              <div class="col-md-5 mb-3">
                <label for="phone">contact Number with code </label>
                <input onChange = {e=>setTravellerDetails({...travellerDetails,'contactNo':e.target.value})} value={travellerDetails?.contactNo} autoComplete = "off" type="text" class="form-control" id="phone" placeholder="911234567890" />
                <div class="invalid-feedback">
                  email address
                </div>
              </div>

              <h4 class="mb-3"></h4>
              <h4 class="col-md-3 mb-1">Payment Details</h4>

              <div class="row">
                <div class="col-md-4 mb-3">
                  <label for="cc-name">Name on card</label>
                  <input onChange = { (e) => setName(e.target.value)} type="text" class="form-control" id="cc-name" placeholder="" required />
                  <small class="text-muted">Full name as displayed on card</small>
                  <div class="invalid-feedback">
                    Name on card is required
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="cc-number">Credit card number</label>
                  <input onChange = { (e) => setCardNumber(e.target.value)} type="text" class="form-control" id="cc-number" placeholder="" required />
                  <div class="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 mb-3">
                  <label for="cc-expiration">Expiration</label>
                  <input onChange = { (e) => setExpiryDate(e.target.value)} type="text" class="form-control" id="cc-expiration" placeholder="" required />
                  <div class="invalid-feedback">
                    Expiration date required
                  </div>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="cc-expiration">CVV</label>
                  <input onChange = { (e) => setCvv(e.target.value)} type="text" class="form-control" id="cc-cvv" placeholder="" required />
                  <div class="invalid-feedback">
                    Security code required
                  </div>
                </div>
              </div>
              <hr class="mb-4" />
              <button class="btn btn-primary btn-lg btn-block" type="button" onClick={() => {

                  console.log('travellerDetails: ', travellerDetails);
                  console.log('cardNumber: ', cardNumber);
                  console.log('name: ', name);
                  console.log('cvv: ', cvv);
                  console.log('expirydate: ', expirydate);
                  console.log('price: ', price - priceDiscount);

                  console.log('Booking data: ', bookingData);
                  
                  // FOR REFERENCE
                  // bookingData = {
                  //     "booking_id":"619ade645bf1fa1382a63771",
                  //     "flight_oid": "619af36650588e5d5593311a",
                  //     "traveler_details": bookingData.travellerDetails,
                  //     "payment" :{ 
                  //         "reward_points_used" : 20,
                  //         "cash": 50
                  //     }
                  // }

                  let traveler_details = {
                    ...bookingData.travellerDetails,
                    name: bookingData.travellerDetails.firstName + ' ' + bookingData.travellerDetails.lastName
                  }

                  // CHECK if card details need to be sent to backend
                  let bookingDataForApi = {
                    //booking_id: '', // CHECK THIS
                    flight_oid: '', // CHECK THIS
                    traveler_details: traveler_details,
                    payment: {
                      reward_points_used: 20, // CHECK AND UPDATE THIS
                      cash: (price - priceDiscount)
                    }
                  }

                  console.log('Booking data just before API call: ', bookingDataForApi);

                  const url="http://localhost:5000/booking";
                  Axios.post(url, bookingDataForApi).
                    then((response)=>{
                      console.log('Booking api response: ', response)
                      if (response.status === 200) {
                        alert('Successfully booked!');
                        console.log('Booking api successfully executed!');

                        // this.nextPath('/customer/purchase-seats');
                        // CHECK THIS
                        // After this API call; How should I redirect to PurchaseSeats page (component)
                      }
                    }).catch(
                      // this.nextPath('/customer/purchase-seats'),
                      history.push('/customer/purchase-seats'), // Shift - CHECK THIS
                      console.log('Something went wrong in booking api for data: ', bookingDataForApi)
                    )
              }}>Book</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Booking;