import React, { Component } from 'react';
import './profiel.css'
import moment from 'moment'

class Card extends Component {

    constructor() {
        super()
        this.state = {
            visible: false,
            dissapear: "",
            time:'',
            image:"https://image.freepik.com/free-vector/golden-bell_1262-6415.jpg"
        }
    }
    componentDidMount(){
        if(this.props.type.includes('http')){
            this.setState({image:this.props.type})
        }
        var timestamp = moment.utc(Date.now()).local();
        let time =  timestamp.format("HH:mm:ss");
        this.setState({time:time})
    }
    handleClick(){
        this.setState({ dissapear: "dissapear" })
        fetch('http://localhost:5000/product/' + this.props.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })

    }

    render() {
        if(this.state.dissapear =="dissapear"){
            setTimeout(() => {
                this.setState({dissapear:this.state.dissapear += " remove"}) 
            }, 600);

        }
        return (
            <div className="container">
                <div className={this.state.dissapear}>
                    <div className="profile" onClick={() => this.handleClick()} >
                        <div className="rightNew">
                            <span>new</span>
                        </div>
                        <div className="info">
                            <img className="profileImg" alt="profile" src={this.state.image}></img>
                            <p className="nameProfile"><b>{this.props.title}</b>{ "  " + this.props.body}</p>
                        </div>
                        <div className="time">
                            <span>{this.state.time}</span>
                        </div>
                        <hr></hr>
                    </div>
                </div>
            </div>
        )
    }
}
export default Card