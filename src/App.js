import React from "react";
import LightBulb from "./components/LightBulb";
import LightSwitch from "./components/LightSwitch";
import { FormErrors } from "./components/FormErrors";
import { Col, Row, Grid, Button } from 'react-bootstrap';

import "./App.css";


const h3Style = {
  padding: '10px 0px 0px 25px',
  color: 'antiquewhite'
}

const h4Style = {
  padding: '10px 0px 0px 25px',
  color: 'antiquewhite'
}

const h5Style = {
  paddingLeft: '30px',
  color: '#fff'
}

const codeStyle = {
  backgroundColor: '#46484b',
}

const responseStyle = {
  color: 'antiquewhite',
  fontSize: '16px',
  padding: "15px 15px 0px 15px"
}


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allSwitches: {},
      response: '',
      bulbs: '',
      people: '',
      formErrors: { bulbs: '', people: ''},
      bulbsValid: false,
      peopleValid: false,
      formValid: false
    }
    // this.toggleSwitch = this.toggleSwitch.bind(this);
  }

  componentWillMount() {
    const allSwitches = {}
    for (var i = 0; i < 2000000; i++) {
        allSwitches[i] = false;
    }
    this.setState({ allSwitches })
  }

  toggleSwitch = (value) => {
    const allSwitches = { ...this.state.allSwitches }
    allSwitches[value] = !this.state.allSwitches[value]
    this.setState({ 
      allSwitches, 
      response: ""
  }, this.calcResponse);
  }

  handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name] : value
    }, () => {this.validateField(name, value)});
  }
  
  validateField = (fieldName, value) => {
    let validateErrors = this.state.formErrors;
    let bulbsValid = this.state.bulbsValid;
    let peopleValid = this.state.peopleValid;

    switch(fieldName) {
      case 'bulbs':
        bulbsValid = value.match(/(^\d+$)/);
        validateErrors.bulbs = bulbsValid ? '' : ' input is invalid. Please use only whole numbers and no letters.';
        break;
      case 'people':
        peopleValid = value.match(/^\d+$/);
        validateErrors.people = peopleValid ? '' : ' input is invalid. Please use only whole numbers and no letters.';
        break;
      default:
        break;
    }
    this.setState({formErrors: validateErrors,
                  bulbsValid: bulbsValid,
                  peopleValid: peopleValid
                }, this.validateForm);
  }
  
  validateForm = () => {
    this.setState({
      formValid: this.setState.bulbsValid && this.setState.peopleValid});
    }

  errorClass = (error) => {
    return(error.length === 0 ? '' : 'has-error')
  }

  handleSubmit = () => {
    let {bulbs, people} = this.state;
    bulbs = parseInt(bulbs);
    people = parseInt(people);
    this.setState({
      bulbs, people
    },() => {
      this.start();
    })
  }

  start = () => {
    const { allSwitches } = this.state
    for (let i = 0; i < this.state.people; i++) {
      // setTimeout(()=> {
        for (let j = i; j < this.state.people; j += i + 1) {
          allSwitches[j] = !this.state.allSwitches[j];
          this.setState({allSwitches})
        }
      // }, 3000 * i);
    }
    this.setState({ 
      allSwitches,
      response: ""
    
    }, this.calcResponse)
    
  }
    
   calcResponse = () => {
      //  console.log("set state", allSwitches)
      for (let i = 0; i < this.state.bulbs; i++) {
        // console.log("in loop")
          if (this.state.allSwitches[i]) {
            // console.log('Please enter something in the input');
            const {state} = this;
            const response = state.response += `Bulb #${i + 1} is on, `;
            this.setState({response})
          }
      }
    }
  
    // passData = (data) => {
  //   console.log(data)
  // }
  render() {
    var hundredBulbs = [];
    for (var i = 0; i < this.state.bulbs; i++) {
      hundredBulbs.push(
        (<Grid>
          <LightSwitch isOn={this.state.allSwitches[i]} value={i} toggleSwitch={this.toggleSwitch} />
          <LightBulb isOn={this.state.allSwitches[i]} />
        </Grid>)
      );
    }
    return (
      <div className="container">
      <Row className="show-grid">
        <Col>
          <h3 style={h3Style}>Light Bulbs</h3>
          <h4 style={h4Style}>There are light bulbs lined up in a row in a long room.
            Each bulb has its own switch and is currently switched off.
            The room has an entry door and an exit door.
            There are people lined up outside the entry door.
            Each bulb is numbered consecutively from 1 to the amount of the bulb that you choose. 
            So is each person. Person No. 1 enters the room, switches on every bulb, and exits.
            Person No. 2 enters and flips the switch on every second bulb (turning off bulbs 2, 4, 6, ...).
            Person No. 3 enters and flips the switch on every third bulb (changing the state on bulbs 3, 6, 9, ...).
            This continues until all people have passed through the room.
            How many of the light bulbs are illuminated after the last person has passed through the room?
            </h4>
        </Col>
        {/* <br></br> */}
        <form className = "demoForm">
          <h4 style={h4Style} >Please Enter Your:</h4>
          <div>
            <FormErrors formErrors = {this.state.formErrors}/>  
          </div>
          <div>
            <div className = {`form-group ${this.errorClass(this.state.formErrors.bulbs)}`}>
              <input type = "text" name = "bulbs" 
                value = {this.state.bulbs} 
                onChange={(e) => this.handleFormChange(e, "bulbs")} 
                placeholder = "Amount of Bulbs" />
            </div>
            <div className = {`form-group ${this.errorClass(this.state.formErrors.people )}`}>
              <input  type = "text" name = "people" 
                value = {this.state.people} 
                onChange={(e) => this.handleFormChange(e, "people")}
                placeholder = "Amount of People" />
            </div>
          </div>
          <Button onClick={this.start}>Look At the Answer</Button>
              <div style = {responseStyle}>{this.state.response}</div>
        </form>
        {/* <input type = "text" name = "people" value = {this.state.people} onChange={(e) => this.handleFormChange(e, "people")} /> */}
        {/* <button onClick = {this.handleSubmit}>submit</button> */}
        <br></br>
        {hundredBulbs.map((element, index) => {
          return <Col xs={6} md={2} key={index}>
            <code style={codeStyle}>
              <h5 style={h5Style}>
                Light # {index + 1}{element}</h5>
            </code>
          </Col>
        })}
      </Row>
      </div>
    )
  }
}
export default App;
