import React, {Component} from 'react';
import {Card, Form, Button} from 'react-bootstrap';

import axios from 'axios';

export default class AddCountryNumber extends Component{

    constructor(props) {
            super(props);
            this.state = this.initialState;
            this.numberChange = this.numberChange.bind(this);
            this.submitNumber = this.submitNumber.bind(this);
    };

    initialState = {id:'', name:'', phone:''}

    resetNumber = () => {
        this.setState(() => this.initialState);
    };

    //Could not implement PUT, with this the page dont render.
    /*
    componentDidMount(){
        const numberId = +this.props.match.params.id;
        if(numberId){
            this.findNumberById(numberId);
        }
    };

    findNumberById(numberId){
        fetch('http://localhost:8080/numbers/')
            .then((response) => response.json())
            .then(response => {
                if(response.content != null){
                    this.setState({
                        id: response.content.id,
                        name: response.content.name,
                        phone: response.content.phone
                    });
                }
            }).catch((error) => {
                console.error("Error - "+error);
        });
    };
    */

    submitNumber(event){
        event.preventDefault();

        const number = {
            name: this.state.name,
            phone:this.state.phone
        };

        axios.post("http://localhost:8080/numbers/", number)
            .then(response => {
                if(response.data != null){
                    this.setState(this.initialState);
                    alert("Number saved successfully")
                }
            })

    };

    numberChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    render(){
        const {name,phone} = this.state;

        return(
            <Card className="border border-dark bg-dark text-white">
                 <Card.Header>Add Number</Card.Header>
                    <Form onReset={this.resetNumber} onSubmit={this.submitNumber} id="numberFormId">
                    <Card.Body>
                      <Form.Group controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required autoComplete="off" type="text" placeholder="Enter Name" name="name" value={name} onChange={this.numberChange} className={"bg-dark text-white"}/>
                      </Form.Group>

                      <Form.Group  controlId="formGridPhone">
                        <Form.Label>Number</Form.Label>
                        <Form.Control required autoComplete="off" name="phone" type="text" placeholder=" Enter Phone Number" value={phone} onChange={this.numberChange} className={"bg-dark text-white"}/>
                      </Form.Group>
                      </Card.Body>
                      <Card.Footer style={{"textAlign":"right"}}>
                           <Button size="sm" variant="success" type="submit">
                             Submit
                           </Button>
                           <Button size="sm" variant="info" type="reset">
                             Reset
                           </Button>
                       </Card.Footer>
                    </Form>
            </Card>
        );
    }

}