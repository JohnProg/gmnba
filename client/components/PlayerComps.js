import React from "react";

export default class PlayerComps extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    console.log(this.props.comps);
    return (
      <div>
        <div>Player Comps Here</div>
      </div>
    );
  }
}
