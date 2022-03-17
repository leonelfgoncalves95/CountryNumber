import React, {Component} from 'react';
import {Card, Table, ButtonGroup, Button, InputGroup, FormControl, Form} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class ListCountryNumbers extends Component{

    constructor(props) {
            super(props);
            this.state = {
                countryNumbers: [],
                currentPage : 1,
                numbersPerPage : 10,
                filter : ''
            };
            this.changePage = this.changePage.bind(this);
            this.changeFilter = this.changeFilter.bind(this);

        }

    componentDidMount() {
        fetch('http://localhost:8080/numbers/')
        .then((response) => response.json())
        .then((res) => {
            this.setState({ countryNumbers: res.content });
        })
    }

    deleteNumber(numberId){
        axios.delete("http://localhost:8080/numbers/"+numberId)
            .then(response => {
                if(response.data != null){
                    alert("Number deleted successfully");
                    this.setState({
                        countryNumbers: this.state.countryNumbers.filter(number => number.id !== numberId)
                    });
                }
            });
    }

    changePage = (event) => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        })
    };

    changeFilter(event){
            event.preventDefault();

            fetch('http://localhost:8080/numbers/')
                    .then((response) => response.json())
                    .then((res) => {
                        this.setState({ countryNumbers: res.content });
                    })
        };



    firstPage(){
        if(this.state.currentPage > 1){
            this.setState({
                currentPage: 1
            });
        }
    };

    prevPage(){
        if(this.state.currentPage > 1){
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    nextPage(){
        if(this.state.currentPage < Math.ceil(this.state.countryNumbers.length / this.state.numberPerPage)){
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    lastPage(){
        if(this.state.currentPage < Math.ceil(this.state.countryNumbers.length / this.state.numberPerPage)){
            this.setState({
                currentPage: Math.ceil(this.state.countryNumbers.length / this.state.numberPerPage)
            });
        }
    };

    render(){
        const {countryNumbers, currentPage, numbersPerPage, filter} = this.state;
        const lastIndex = currentPage * numbersPerPage;
        const firstIndex = lastIndex - numbersPerPage;
        const currentNumbers = countryNumbers.slice(firstIndex, lastIndex);
        const totalPages = countryNumbers.length / numbersPerPage;

        return(
            <Card className="border border-dark bg-dark text-white">
                <Card.Header>Country Number</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr>
                              <th>Name</th>
                              <th>Number</th>
                            </tr>
                          </thead>
                          <tbody>
                          {
                          currentNumbers.map(countryNumber => (
                                  <tr key={countryNumber.id}>
                                      <td> {countryNumber.name} </td>
                                      <td> {countryNumber.phone} </td>
                                      <td>
                                          <ButtonGroup>
                                            <Link to={"/edit/"+countryNumber.id} className="btn btn-sm btn-outline-primary">Edit</Link>
                                            <Button onClick={this.deleteNumber.bind(this, countryNumber.id)}>Delete</Button>
                                          </ButtonGroup>
                                      </td>
                                  </tr>
                                  )
                          )
                          }
                      </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer>
                    <div style={{"float":"left"}}>
                        Showing Page {currentPage} of {totalPages}
                    </div>
                    <div style={{"float":"right"}}>
                        <InputGroup size="sm">
                                <Button type="button" variant="outline-info" disable={currentPage === 1 ? true: false} onClick={this.firstPage}>
                                    First
                                </Button>
                                <Button type="button" variant="outline-info" disable={currentPage === 1 ? true: false} onClick={this.revPage}>
                                    Prev
                                </Button>
                                 <Button type="button" variant="outline-info" disable={currentPage === totalPages ? true: false} onClick={this.nextPage}>
                                    Next
                                </Button>
                                 <Button type="button" variant="outline-info" disable={currentPage === totalPages ? true: false} onClick={this.lastPage}>
                                    Last
                                </Button>
                                <FormControl
                                className={"page-num bg-white"}
                                name="currentPage"
                                value={currentPage}
                                onChange={this.changePage}
                                />
                        </InputGroup>
                        <Form onSubmit={this.changeFilter}>
                        <Form.Group  controlId="formGridFilter">
                        <Form.Control required autoComplete="off" name="filter" type="text" placeholder=" Enter Filter" value={this.state.filter} onChange={this.changeFilter} className={"bg-dark text-white"}/>
                      </Form.Group>
                      <Button size="sm" variant="success" type="submit">
                       Submit
                     </Button>
                     </Form>
                    </div>
                </Card.Footer>
            </Card>
        );
    }

}

