import React, { Component } from 'react';
import './event.css'

class Card extends Component {

    constructor() {
        super()
        this.state = {
            type: '',
            title: "",
            text: "",
            expires: 1861923661000,
            expiresValue:'1861923661000',
            name:'text',
            body:"",
            selectType:'text',
            placeholder:'Enter a message title',
            placeholder2:"Enter a message",
            placeholder1:'Enter a message type',

           // expiresDate: 1861923661
        }
        this.handleType = this.handleType.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleText = this.handleText.bind(this);
        this.handleBody = this.handleBody.bind(this);

        this.handleExpire = this.handleExpire.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectType = this.handleSelectType.bind(this);


    }
    handleType(event) {
        this.setState({ type: event.target.value })
    }
    handleSubmit(event) {
        console.log(this.state)
        event.preventDefault();
        fetch('http://localhost:5000/product', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: this.state.type,
                title: this.state.title,
                text: this.state.text,
                body:this.state.body,
                expires: this.state.expires
            })
        })
    }
    handleTitle(event) {
        this.setState({ title: event.target.value })
    }
    handleText(event) {
        this.setState({ text: event.target.value })
    }
    handleBody(event) {
        this.setState({ body: event.target.value })
    }
    handleExpire(event) {
        let time = Date.now()

       // console.log(event.target.value)
        if(event.target.value == "1861923661000"){
            this.setState({expires:event.target.value,expiresValue:event.target.value})
            return
        }
        let currentSecond = event.target.value
        console.log(currentSecond);
        let result = Number(Date.now() +Number(currentSecond * 1000))
        console.log(result)

        this.setState({ expires: result,expiresValue:event.target.value })
    }
    handleSelectType(type){
        console.log(type.target.value)
       switch (type.target.value){
           case 'promotion':
           this.setState({name:"promotion",
            placeholder:"Paste promotion title",
            placeholder1:'Enter Image URL',
            placeholder2:'Enter Link address',
            selectType:'promotion'})
           break;
           case 'text':
           this.setState({name:'text',
           placeholder:'Enter message title',
           placeholder1:'Enter a message type',
           placeholder2:"Enter message body",
           selectType:'text'})
           break;
           case 'bonus':
           this.setState({name:'bonus',
           placeholder:'Enter a bonus title',
           placeholder1:"Enter a bonus prmotion",
           placeholder2:"Enter bonus message",
           selectType:'bonus'})
       }
    }
    //1861923661000
    render() {
      //  console.log(this.props.expire)
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <div>
                    <label className="label">Select type of notification</label>
                    <br></br>
                    <select value={this.state.selectType} onChange={this.handleSelectType} className="form-control form-control-sm">
                        <option value="text">text</option>
                        <option value="promotion">promotion</option>
                        <option value="bonus">bonus</option>
                    </select>
                </div>
                <div >
                    <label htmlFor="exampleInputEmail1" className="label">Title</label>
                    <input type="text" className="form-control"
                        value={this.state.title}
                        onChange={this.handleTitle}
                        placeholder={this.state.placeholder}
                        required></input>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>

                </div>
                <div>
                    <label htmlFor="exampleInputPassword1" className="label">Type</label>
                    <input type="text"
                        className="form-control"
                        value={this.state.type}
                        onChange={this.handleType}
                        placeholder={this.state.placeholder1}
                        required></input>
                </div>
                {(this.state.selectType =="text" || this.state.selectType =="promotion") ?
                
                <div>
                <label className="label">Select expires time in seconds</label>
                <br></br>
                <select value={this.state.expiresValue} onChange={this.handleExpire} className="form-control form-control-sm">
                   <option value="1861923661000">Infinity</option>
                   <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="35">25</option>

                    </select>
            </div>:null
            }

                <div>
                    <label className="label" htmlFor="exampleCheck1">message me</label>
                    <input type="text"
                        className="form-control"
                        value={this.state.body}
                        required
                        onChange={this.handleBody}
                        placeholder={this.state.placeholder2}
                    ></input>
                </div>
                <button type="submit" style={{marginTop:'5px'}} className="btn btn-outline-info">Submit</button>
            </form>
        )
    }
}
export default Card