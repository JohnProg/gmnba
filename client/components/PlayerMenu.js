import React from "react";
import { Col, Row, Grid, MenuItem, DropdownButton } from "react-bootstrap";

export default class PlayerMenu extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          fontSize: "16px",
          position: "relative",
          zIndex: 100,
          lineHeight: "50px",
          color: this.props.colors.Color_Sec || "white"
        }}
      >
        <div style={{ height: "50px", paddingLeft: "15px" }}>Season Stats</div>
        <div style={{ height: "50px", paddingLeft: "15px" }}>Career Stats</div>
        <div style={{ height: "50px", paddingLeft: "15px" }}>
          Player Ratings
        </div>
        <div style={{ height: "50px", paddingLeft: "15px" }}>
          Player Projection
        </div>
        <div style={{ height: "50px", paddingLeft: "15px" }}>
          Player Comparison
        </div>
        <div style={{ height: "50px", paddingLeft: "15px" }}>Shot Chart</div>
        <div style={{ height: "50px", paddingLeft: "15px" }}>Contract</div>
      </div>
    );
  }
}
