import { React, Component } from 'react';
import '../CSS/PurchaseSeats.css';
import Axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';

class PurchaseSeats extends Component {
    
    constructor(props) {
        super();

        this.state = {
            booking_id: '',
            seatTypeSelected: 'window',
            seatNumberSelected: ''
        }

        this.seatTypeSelectHandler = this.seatTypeSelectHandler.bind(this);
        this.seatNumberSelectHandler = this.seatNumberSelectHandler.bind(this);
        this.seatSelectSubmission = this.seatSelectSubmission.bind(this);
    }

    componentDidMount = () => {
        this.setState({
            seatTypeSelected: document.getElementById('seat-type-selection').value,
            // seatNumberSelected: document.getElementById('seat-number-selection').value
        });
    }

    seatTypeSelectHandler = (e) => {
        console.log('DROPDOWN VALUE: ', e.target.value);
        this.setState({
            seatTypeSelected: e.target.value
        });
        if (e.target.value == 'window') {
            this.setState({
                seatNumberSelected: "1A"
            });
        } else if (e.target.value == 'middle') {
            this.setState({
                seatNumberSelected: "1B"
            });
        } if (e.target.value == 'aisle') {
            this.setState({
                seatNumberSelected: "1C"
            });
        }
    }

    seatNumberSelectHandler = (e) => {
        console.log('DROPDOWN VALUE for seat number: ', e.target.value);
        this.setState({
            seatNumberSelected: e.target.value
        });
    }

    seatSelectSubmission = (e) => {
        console.log('Seat data finalized: ', this.state);

        let data = {
            booking_id: this.state.booking_id,
            seat_type: this.state.seatTypeSelected,
            // seat_number: this.state.seatNumberSelected
        }

        Axios.get('http://localhost:5000/booking/purchase_seat', data).
            then((response)=>{
            console.log('User get api response: ', response)
            if (response.status === 200) {
                console.log('purchase_seat successfully executed!');
            }
            }).catch(

                this.props.history.push('/'),
            console.log('Something went wrong in purchase_seat API for api input data: ', data)
            )
    }
    
    render() {
        let seatArr = [];
        for (let i = 1; i <= 30; i++) {
            if (this.state.seatTypeSelected == 'window') {
                seatArr.push(i + "A");
            } else if (this.state.seatTypeSelected == 'middle') {
                seatArr.push(i + "B");
            } if (this.state.seatTypeSelected == 'aisle') {
                seatArr.push(i + "C");
            }
        }

        console.log("Abs",seatArr)

        let dropdown = (
            seatArr.map((num) => {
                return (
                    <option value={num}>{num}</option>
                );
            })
        );
        
        console.log('$$$$$$$ ', this.state.seatTypeSelected, '   ', this.state.seatNumberSelected);

        return (
            <div className="purchase-seats-box">
                <h1 style={{fontWeight: "bold"}}>Purchase Seats</h1>

                <div id="seat-type-box" className="seat-selection">
                    <h3>Seat Type</h3>

                    <select onChange={this.seatTypeSelectHandler} name="seat-type-selection" id="seat-type-selection">
                        <option value="window">Window</option>
                        <option value="middle">Middle</option>
                        <option value="aisle">Aisle</option>
                    </select>
                </div>

                <div id="seat-number-box" className="seat-selection">
                    <h3>Seat Number</h3>
                    <select onChange={this.seatNumberSelectHandler} name="seat-number-selection" id="seat-number-selection">
                        {dropdown}
                    </select>
                </div>

                <button onClick={this.seatSelectSubmission} className="purchase-btns">Puchase Now</button>
                <button className="purchase-btns">Purchase Later</button>


            </div>
        );
    }
}

export default PurchaseSeats;