import React from "react";
// import Switch from "./Switch";

class LightSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    const {isOn, value} = this.props;
    this.setState({isOn, value},()=>{
      // console.log("switch",value)
      // console.log("isOn", isOn)
    });
  }

  componentDidUpdate() {
    const {isOn} = this.props;
    if (this.state.isOn === !isOn) this.setState({isOn}) 
  }

  render() {
    var switchClass = this.state.isOn ? "cube-switch active" : "cube-switch";
    return (
      <div className={switchClass}>
        <span className = "switch" onClick = {e => this.props.toggleSwitch(this.state.value)}>
          <span className = "switch-state off">Off</span>
          <span className = "switch-state on">On</span>
            {/* value = "off"
            className = "switch-state off"
            passData = {this.props.passData}
          /> */}
          {/* <Switch 
            value = "off"
            className = "switch-state on"
            passData = {this.props.passData}
          /> */}
        </span>
      </div>
    );
  }
}
export default LightSwitch
