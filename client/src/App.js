import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  componentDidMount() {
    fetch(`http://localhost:5000/product`)
    .then(response => response.json())
    .then(data => console.log(data));
  }
  render() {
    return (
      <div className="App">
     <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">Company name</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark" href="#">Features</a>
        <a class="p-2 text-dark" href="#">Enterprise</a>
        <a class="p-2 text-dark" href="#">Support</a>
        <a class="p-2 text-dark" href="#">Pricing</a>
      </nav>
      <a class="btn btn-outline-primary" href="#">Sign up</a>
    </div>

    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Pricing</h1>
      <p class="lead">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It's built with default Bootstrap components and utilities with little customization.</p>
    </div>
      </div>
    );
  }
}

export default App;
