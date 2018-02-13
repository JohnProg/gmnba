import React from "react";
import TeamScatter from "./TeamScatter";
import {
  Col,
  Button,
  Well,
  Row,
  Grid,
  Nav,
  NavItem,
  TabContainer,
  TabContent,
  TabPane,
  Tab,
  Checkbox,
  FormGroup
} from "react-bootstrap";

export default class PlayerFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pg: false,
      sg: false,
      sf: false,
      pf: false,
      c: false,
      exp1: false,
      exp2: false,
      exp3: false,
      exp4: false,
      exp5: false,
      age1: false,
      age2: false,
      age3: false,
      age4: false,
      age5: false,
      mpg1: false,
      mpg2: false,
      mpg3: false,
      mpg4: false,
      mpg5: false
    };
  }

  render() {
    console.log(this.props.teams);
    var headerStyle = {
      backgroundColor: "#d00000",
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "20px",
      color: "#fff"
    };
    return (
      <div>
        <Row style={{ paddingTop: "40px" }}>
          <Col lg={3} lgOffset={1}>
            <div className="card" style={headerStyle}>
              Find Player
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "40px", paddingBottom: "20px" }}>
          <Col lg={10} lgOffset={1}>
            <div className="card" style={{ backgroundColor: "white" }}>
              <Tab.Container
                id="left-tabs-example"
                defaultActiveKey="first"
                style={{ paddingTop: "20px", paddingLeft: "10px" }}
              >
                <Row className="clearfix">
                  <Col sm={4}>
                    <Nav bsStyle="pills" stacked style={{ border: "1px" }}>
                      <NavItem eventKey="first">Basic Info</NavItem>
                      <NavItem eventKey="second">Ratings</NavItem>
                      <NavItem eventKey="third">Advanced Ratings</NavItem>
                      <NavItem eventKey="fourth">Statistics</NavItem>
                      <NavItem eventKey="fifth">Advanced Statistics</NavItem>
                    </Nav>
                  </Col>
                  <Col sm={8}>
                    <Tab.Content animation>
                      <Tab.Pane eventKey="first">
                        <Row>
                          <Col lg={4}>
                            <div style={{ textDecoration: "underline" }}>
                              Position
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.pg}
                                onChange={this.handlePG}
                              >
                                Point Guard
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sg}
                                onChange={this.handleSG}
                              >
                                Shooting Guard
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sf}
                                onChange={this.handleSF}
                              >
                                Shooting Forward
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.pf}
                                onChange={this.handlePF}
                              >
                                Power Forward
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.c}
                                onChange={this.handleC}
                              >
                                Center
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={4}>
                            <div style={{ textDecoration: "underline" }}>
                              Experience
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.exp1}
                                onChange={this.handleEXP1}
                              >
                                Rookie
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.exp2}
                                onChange={this.handleEXP2}
                              >
                                1-3 yrs
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.exp3}
                                onChange={this.handleEXP3}
                              >
                                4-6 yrs
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.exp4}
                                onChange={this.handleEXP4}
                              >
                                7-10 yrs
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.exp5}
                                onChange={this.handleEXP5}
                              >
                                > 10 yrs
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={4}>
                            <div style={{ textDecoration: "underline" }}>
                              Age
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 21
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                21-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                26-30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                31-35
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 35
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={4}>
                            <div style={{ textDecoration: "underline" }}>
                              Height
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.pg}
                                onChange={this.handlePG}
                              >
                                &#60; 6'0
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sg}
                                onChange={this.handleSG}
                              >
                                6'0 - 6'3
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sf}
                                onChange={this.handleSF}
                              >
                                6'4 - 6'7
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.pf}
                                onChange={this.handlePF}
                              >
                                6'8 - 6'11
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.c}
                                onChange={this.handleC}
                              >
                                7'0 +
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={4}>
                            <div style={{ textDecoration: "underline" }}>
                              Weight
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.pg}
                                onChange={this.handlePG}
                              >
                                &#60; 180lbs
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sg}
                                onChange={this.handleSG}
                              >
                                180lbs - 220lbs
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sf}
                                onChange={this.handleSF}
                              >
                                220lbs - 260lbs
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.pf}
                                onChange={this.handlePF}
                              >
                                260lbs - 280lbs
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.c}
                                onChange={this.handleC}
                              >
                                280lbs +
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              Salary Per Year
                            </div>
                            <FormGroup>
                              <Checkbox>&#60; 5 mil.</Checkbox>{" "}
                              <Checkbox>5-10 mil.</Checkbox>{" "}
                              <Checkbox>10-15 mil.</Checkbox>{" "}
                              <Checkbox>15-20 mil.</Checkbox>{" "}
                              <Checkbox>> 20 mil.</Checkbox>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane
                        style={{ height: "320px", overflowY: "scroll" }}
                        eventKey="second"
                      >
                        <Row>
                          <Col lg={4}>
                            <div style={{ textDecoration: "underline" }}>
                              Overall
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>1 Star</option>
                                <option>1.5 Stars</option>
                                <option>2 Stars</option>
                                <option>2.5 Stars</option>
                                <option>3 Stars</option>
                                <option>3.5 Stars</option>
                                <option>4 Stars</option>
                                <option>4.5 Stars</option>
                                <option>5 Stars</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>1 Star</option>
                                <option>1.5 Stars</option>
                                <option>2 Stars</option>
                                <option>2.5 Stars</option>
                                <option>3 Stars</option>
                                <option>3.5 Stars</option>
                                <option>4 Stars</option>
                                <option>4.5 Stars</option>
                                <option>5 Stars</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div style={{ textDecoration: "underline" }}>
                              Offense
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>1 Star</option>
                                <option>1.5 Stars</option>
                                <option>2 Stars</option>
                                <option>2.5 Stars</option>
                                <option>3 Stars</option>
                                <option>3.5 Stars</option>
                                <option>4 Stars</option>
                                <option>4.5 Stars</option>
                                <option>5 Stars</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>1 Star</option>
                                <option>1.5 Stars</option>
                                <option>2 Stars</option>
                                <option>2.5 Stars</option>
                                <option>3 Stars</option>
                                <option>3.5 Stars</option>
                                <option>4 Stars</option>
                                <option>4.5 Stars</option>
                                <option>5 Stars</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={4}>
                            <div style={{ textDecoration: "underline" }}>
                              Defense
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>1 Star</option>
                                <option>1.5 Stars</option>
                                <option>2 Stars</option>
                                <option>2.5 Stars</option>
                                <option>3 Stars</option>
                                <option>3.5 Stars</option>
                                <option>4 Stars</option>
                                <option>4.5 Stars</option>
                                <option>5 Stars</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>1 Star</option>
                                <option>1.5 Stars</option>
                                <option>2 Stars</option>
                                <option>2.5 Stars</option>
                                <option>3 Stars</option>
                                <option>3.5 Stars</option>
                                <option>4 Stars</option>
                                <option>4.5 Stars</option>
                                <option>5 Stars</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: "20px" }}>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              Scoring
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              Ast
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              Reb
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              Orb
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: "20px" }}>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              Drb
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              Stl
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              Blk
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              Ft
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: "20px" }}>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              FG
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              2P
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              3P
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              Tov
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane
                        style={{ height: "320px", overflowY: "scroll" }}
                        eventKey="third"
                      >
                        <Row>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              PER
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              WS
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              OWS
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              DWS
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: "20px" }}>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              WS/48
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              VORP
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              OBPM
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              DBPM
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: "20px" }}>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              USG%
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              TS%
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              3PAr
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              AST%
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: "20px" }}>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              BLK%
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              STL%
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              DRB%
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              ORB%
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: "20px" }}>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              TRB%
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              eFG%
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              TOV%
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              FTr
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Min:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                            <div style={{ paddingTop: "5px" }}>
                              <span htmlFor="sel1">Max:</span>
                              <select
                                id="sel1"
                                onChange={this.firstInputChange}
                                style={{ marginLeft: "10px" }}
                              >
                                <option>20</option>
                                <option>25</option>
                                <option>30</option>
                                <option>35</option>
                                <option>40</option>
                                <option>45</option>
                                <option>50</option>
                                <option>55</option>
                                <option>60</option>
                                <option>65</option>
                                <option>70</option>
                                <option>75</option>
                                <option>80</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane
                        style={{ height: "320px", overflowY: "scroll" }}
                        eventKey="fifth"
                      >
                        <Row>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              PER
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.pg}
                                onChange={this.handlePG}
                              >
                                &#60; 20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sg}
                                onChange={this.handleSG}
                              >
                                20 - 30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sf}
                                onChange={this.handleSF}
                              >
                                30 - 40
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.pf}
                                onChange={this.handlePF}
                              >
                                40 - 50
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.c}
                                onChange={this.handleC}
                              >
                                > 50
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              WS
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.mpg1}
                                onChange={this.handleMPG1}
                              >
                                &#60; 15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg2}
                                onChange={this.handleMPG2}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg3}
                                onChange={this.handleMPG3}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg4}
                                onChange={this.handleMPG4}
                              >
                                25-30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg5}
                                onChange={this.handleMPG5}
                              >
                                > 30
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              OWS
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 10
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                10-15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 25
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              DWS
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 2
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                2-3
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                4-5
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                6-7
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 7
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              WS/48
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.pg}
                                onChange={this.handlePG}
                              >
                                &#60; 20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sg}
                                onChange={this.handleSG}
                              >
                                20 - 30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sf}
                                onChange={this.handleSF}
                              >
                                30 - 40
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.pf}
                                onChange={this.handlePF}
                              >
                                40 - 50
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.c}
                                onChange={this.handleC}
                              >
                                > 50
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              VORP
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.mpg1}
                                onChange={this.handleMPG1}
                              >
                                &#60; 15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg2}
                                onChange={this.handleMPG2}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg3}
                                onChange={this.handleMPG3}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg4}
                                onChange={this.handleMPG4}
                              >
                                25-30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg5}
                                onChange={this.handleMPG5}
                              >
                                > 30
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              OBPM
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 10
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                10-15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 25
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              DBPM
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 2
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                2-3
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                4-5
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                6-7
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 7
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              USG%
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.pg}
                                onChange={this.handlePG}
                              >
                                &#60; 20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sg}
                                onChange={this.handleSG}
                              >
                                20 - 30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sf}
                                onChange={this.handleSF}
                              >
                                30 - 40
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.pf}
                                onChange={this.handlePF}
                              >
                                40 - 50
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.c}
                                onChange={this.handleC}
                              >
                                > 50
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              TS%
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.mpg1}
                                onChange={this.handleMPG1}
                              >
                                &#60; 15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg2}
                                onChange={this.handleMPG2}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg3}
                                onChange={this.handleMPG3}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg4}
                                onChange={this.handleMPG4}
                              >
                                25-30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg5}
                                onChange={this.handleMPG5}
                              >
                                > 30
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              3PAr
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 10
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                10-15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 25
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              AST%
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 2
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                2-3
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                4-5
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                6-7
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 7
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              BLK%
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.pg}
                                onChange={this.handlePG}
                              >
                                &#60; 20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sg}
                                onChange={this.handleSG}
                              >
                                20 - 30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sf}
                                onChange={this.handleSF}
                              >
                                30 - 40
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.pf}
                                onChange={this.handlePF}
                              >
                                40 - 50
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.c}
                                onChange={this.handleC}
                              >
                                > 50
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              STL%
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.mpg1}
                                onChange={this.handleMPG1}
                              >
                                &#60; 15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg2}
                                onChange={this.handleMPG2}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg3}
                                onChange={this.handleMPG3}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg4}
                                onChange={this.handleMPG4}
                              >
                                25-30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg5}
                                onChange={this.handleMPG5}
                              >
                                > 30
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              DRB%
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 10
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                10-15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 25
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              ORB%
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 2
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                2-3
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                4-5
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                6-7
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 7
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              TRB%
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 10
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                10-15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 25
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              eFG%
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 2
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                2-3
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                4-5
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                6-7
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 7
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              TOV%
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 2
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                2-3
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                4-5
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                6-7
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 7
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              FTr
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 2
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                2-3
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                4-5
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                6-7
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 7
                              </Checkbox>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane
                        style={{ height: "320px", overflowY: "scroll" }}
                        eventKey="fourth"
                      >
                        <Row>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              GP
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.pg}
                                onChange={this.handlePG}
                              >
                                &#60; 20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sg}
                                onChange={this.handleSG}
                              >
                                20 - 30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sf}
                                onChange={this.handleSF}
                              >
                                30 - 40
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.pf}
                                onChange={this.handlePF}
                              >
                                40 - 50
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.c}
                                onChange={this.handleC}
                              >
                                > 50
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              MPG
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.mpg1}
                                onChange={this.handleMPG1}
                              >
                                &#60; 15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg2}
                                onChange={this.handleMPG2}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg3}
                                onChange={this.handleMPG3}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg4}
                                onChange={this.handleMPG4}
                              >
                                25-30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg5}
                                onChange={this.handleMPG5}
                              >
                                > 30
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              PTS
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 10
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                10-15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 25
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              AST
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 2
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                2-3
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                4-5
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                6-7
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 7
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              STL
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.pg}
                                onChange={this.handlePG}
                              >
                                &#60; 20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sg}
                                onChange={this.handleSG}
                              >
                                20 - 30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sf}
                                onChange={this.handleSF}
                              >
                                30 - 40
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.pf}
                                onChange={this.handlePF}
                              >
                                40 - 50
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.c}
                                onChange={this.handleC}
                              >
                                > 50
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              BLK
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.mpg1}
                                onChange={this.handleMPG1}
                              >
                                &#60; 15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg2}
                                onChange={this.handleMPG2}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg3}
                                onChange={this.handleMPG3}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg4}
                                onChange={this.handleMPG4}
                              >
                                25-30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg5}
                                onChange={this.handleMPG5}
                              >
                                > 30
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              TOV
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 10
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                10-15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 25
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              REB
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 2
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                2-3
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                4-5
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                6-7
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 7
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              DRB
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.pg}
                                onChange={this.handlePG}
                              >
                                &#60; 20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sg}
                                onChange={this.handleSG}
                              >
                                20 - 30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sf}
                                onChange={this.handleSF}
                              >
                                30 - 40
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.pf}
                                onChange={this.handlePF}
                              >
                                40 - 50
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.c}
                                onChange={this.handleC}
                              >
                                > 50
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              ORB
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.mpg1}
                                onChange={this.handleMPG1}
                              >
                                &#60; 15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg2}
                                onChange={this.handleMPG2}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg3}
                                onChange={this.handleMPG3}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg4}
                                onChange={this.handleMPG4}
                              >
                                25-30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg5}
                                onChange={this.handleMPG5}
                              >
                                > 30
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              FT%
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 10
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                10-15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 25
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              FTA
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 2
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                2-3
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                4-5
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                6-7
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 7
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              2P%
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.pg}
                                onChange={this.handlePG}
                              >
                                &#60; 20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sg}
                                onChange={this.handleSG}
                              >
                                20 - 30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.sf}
                                onChange={this.handleSF}
                              >
                                30 - 40
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.pf}
                                onChange={this.handlePF}
                              >
                                40 - 50
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.c}
                                onChange={this.handleC}
                              >
                                > 50
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              2PA
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.mpg1}
                                onChange={this.handleMPG1}
                              >
                                &#60; 15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg2}
                                onChange={this.handleMPG2}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg3}
                                onChange={this.handleMPG3}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg4}
                                onChange={this.handleMPG4}
                              >
                                25-30
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.mpg5}
                                onChange={this.handleMPG5}
                              >
                                > 30
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              3P%
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 10
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                10-15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 25
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              3PA
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 2
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                2-3
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                4-5
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                6-7
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 7
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              FG%
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 10
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                10-15
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                15-20
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                20-25
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 25
                              </Checkbox>
                            </FormGroup>
                          </Col>
                          <Col lg={3}>
                            <div style={{ textDecoration: "underline" }}>
                              FGA
                            </div>
                            <FormGroup style={{ paddingLeft: "10px" }}>
                              <Checkbox
                                checked={this.state.age1}
                                onChange={this.handleAGE1}
                              >
                                &#60; 2
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age2}
                                onChange={this.handleAGE2}
                              >
                                2-3
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age3}
                                onChange={this.handleAGE3}
                              >
                                4-5
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age4}
                                onChange={this.handleAGE4}
                              >
                                6-7
                              </Checkbox>{" "}
                              <Checkbox
                                checked={this.state.age5}
                                onChange={this.handleAGE5}
                              >
                                > 7
                              </Checkbox>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
              <hr style={{ paddingBottom: "10px" }} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
