import React,{useState} from 'react';
import '../Home.css'
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'


const Home = (props) =>{

  const [cardNumber,setCardNumber] = useState('')
  const [name,setName] = useState('')
  const [cvv,setCvv] = useState('')
  const [expirydate,setExpiryDate] = useState('')
  const [price,setPrice] = useState(props?.price)
  const [travellerDetails,setTravellerDetails] = useState({firstName:'',title:'',id:'',lastName:'',email:'',dob:'',nationality:'',contactNo:''})


  // const url="http://localhost:3001/user-registration";
  // Axios.post( url,travellerDetails
  // }).then((response)=>{
  //     console.log(response)
  // }

  // ).catch(

  // )

  
     
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
                  <span class="text-success">UA1234</span>

                </li>
                <li class="list-group-item d-flex justify-content-between bg-light">
                  <div class="text-success">
                    <h6 class="my-0">departure_airport</h6>
                  </div>
                  <span class="text-success">ORD</span>

                </li>
                <li class="list-group-item d-flex justify-content-between bg-light">
                  <div class="text-success">
                    <h6 class="my-0">departure_date</h6>
                    <small>departure_time</small>

                  </div>
                  <span class="text-success">-Set the departure_date prop here</span>

                </li>
                <li class="list-group-item d-flex justify-content-between bg-light">
                  <div class="text-success">
                    <h6 class="my-0">arrival_airport</h6>
                  </div>
                  <span class="text-success">-Set the arrival_airport prop here</span>
                </li>
                <li class="list-group-item d-flex justify-content-between bg-light">
                  <div class="text-success">
                    <h6 class="my-0">arrival_date</h6>
                    <small>arrival_time</small>

                  </div>
                  <span class="text-success">-Set the arrival_date prop here</span>

                </li>
                <li class="list-group-item d-flex justify-content-between bg-light">
                  <div class="text-success">
                    <h6 class="my-0">Price</h6>

                  </div>
                  <span class="text-success">-Set the proce prop here</span>

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
                  <span class="text-success">-$5</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Total Price(USD)</span>
                  <strong>$price-discount</strong>
                </li>
              </ul>

              <form class="card p-2">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Enter Discount Amount"/>
                  <div class="input-group-append">
                    <button  type="button" class="btn btn-secondary">Redeem</button>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-md-7 order-md-1">
              <h4 class="col-md-3 mb-1">Traveller Details</h4>
              <form class="needs-validation" novalidate>
                <div class="row">
                <div class="col-md-1 mb-1">
                    <label for="Name">Name</label>
                    <select  class="custom-select d-block w-10" id="genderType" required>
                      <option value=""></option>
                      <option>MR</option>
                      <option>MS</option>
                    </select>
                    <div class="invalid-feedback">
                      Title
                    </div>
                  </div>
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
                    <input type="text" class="form-control" id="cc-name" placeholder="" required />
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
                    <input type="text" class="form-control" id="cc-expiration" placeholder="" required />
                    <div class="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="cc-expiration">CVV</label>
                    <input type="text" class="form-control" id="cc-cvv" placeholder="" required />
                    <div class="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>
                <hr class="mb-4" />
                <button class="btn btn-primary btn-lg btn-block" type="button" onClick={() => alert('HI')}>Continue to checkout</button>
              </form>
            </div>
          </div>

          
        </div>
     
    
      </div>

      
)
};


export default Home;