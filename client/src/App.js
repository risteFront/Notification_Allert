import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cards from './component/profile';
import Home from './component/addEvent/event';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import About from './component/about/about'
class App extends Component {

  constructor() {
    super()
    this.state = {
      visible: false,
      data:[],
      notifyNumber:0,
      currentNum:3,
      baddge:0
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.state.data.map(element => {
        console.log(element.expires)

          if(element.expires < Date.now()){
            console.log('here')
            fetch('http://localhost:5000/product/' + element._id, {
              method: 'DELETE',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              }
          })
          }
      });


      fetch(`http://localhost:5000/product`)
        .then(response => response.json())
        .then(data => {
          this.setState({data:data ,notifyNumber:data.length})
        });
        if(this.state.notifyNumber > this.state.currentNum){
          console.log(this.state.data.length + " " + this.state.currentNum)
          if(this.state.data.length > this.state.currentNum){
            this.setState({baddge:this.state.data.length - this.state.currentNum})
          }
        }
        // this.setState({currentNum:this.state.data.length - this.state.notifyNumber})
   
    }, 2000)

  }
  render() {
    console.log(this.state.data)

//    console.log(this.state.currentNum)
    return (
      <Router>
        <div className="App">
          <div className=" d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto font-weight-normal">Dopamine</h5>
            <nav className="my-2 my-md-0 mr-md-3">
              <a className="p-2 text-dark" href="/home">Home</a>
              <a className="p-2 text-dark" href="/about">About</a>
              <a className="notify" href="#">
                <div className="displayInline" onClick={() =>
                   this.setState({ visible: !this.state.visible,
                                    baddge:0,
                                    currentNum:this.state.data.length
                                    })} >
                  {this.state.visible ?
                     <i className="fas fa-bell bell">
                    <span className="notification-counter hidenVisible">{this.state.baddge}</span>
                     </i> :
                      <i className="fas fa-bell bell greyBell">
                                <span className="notification-counter">{this.state.baddge}</span>
                      </i>}
                </div>
              </a>
              {this.state.visible ? <a className="arrow-up"></a> : <a className="hidden-up"></a>}
            </nav>
          </div>
          <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
           
            <div id="notForm" className={this.state.visible?'slideIn':'slideOut'}>
              <div className="formHeader"> </div>
               {this.state.data.map(function(i){
                 return <Cards key={i._id}  body={i.body} title={i.title} type={i.type} expire={i.expires}></Cards>
               })}
            </div>

          </div>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route path="/about" component={About} />
        </div>
      </Router>

    );
  }
}

export default App;
