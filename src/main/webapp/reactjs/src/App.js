import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import AddCountryNumber from './components/AddCountryNumber';
import ListCountryNumbers from './components/ListCountryNumbers';


function App() {
  const marginTop={
    marginTop:"20px"
  };
  return (
    <BrowserRouter>
        <NavigationBar/>
        <Container>
            <Row>
                <Col lg={12} style={marginTop}>
                    <Routes>
                        <Route exact path="/" element={<Welcome/>}/>
                        <Route path="/add" element={<AddCountryNumber/>}/>
                        <Route path="/edit/:id" element={<AddCountryNumber/>}/>
                        <Route path="/list" element={<ListCountryNumbers/>}/>
                        <Route path="/list" element={<ListCountryNumbers/>}/>
                    </Routes>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
