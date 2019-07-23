import React from "react";

class LightBulb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount = () => {
    const {isOn} = this.props;
    this.setState({isOn}); 
  }

  componentDidUpdate = () => {
    const {isOn} = this.props;
    if (this.state.isOn === !isOn) this.setState({isOn});
  }

  render() {
    let lightClass = this.state.isOn ? "light-bulb on" : "light-bulb off";
    return (
      <div className={lightClass}></div>
    )
  }
}
export default LightBulb