import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";

export default class Tabs extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className="w3-bar w3-white w3-card">
          <Nav
            bsStyle="pills"
            justified
            activeKey={1}
            onSelect={this.handleSelect}
          >
            <NavItem eventKey={1} href="/">
              PROFILE
            </NavItem>
            <NavItem eventKey={2} href="/">
              SEASON
            </NavItem>
            <NavItem eventKey={3} href="/">
              PLAYERS
            </NavItem>
            <NavItem eventKey={4} href="/">
              SCHEDULE
            </NavItem>
            <NavItem eventKey={5} title="Item">
              SCORES
            </NavItem>
            <NavItem eventKey={5} title="Item">
              RANKINGS
            </NavItem>
          </Nav>
        </div>
      </div>
    );
  }
}
