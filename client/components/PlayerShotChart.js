import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";

export default class PlayerShotChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statOne: "Shot",
      stateTwo: "Shot"
    };
    this.createChart = this.createChart.bind(this);
  }

  componentDidMount() {
    this.createChart();
  }

  createChart() {
    var chart = Highcharts.chart("containerScatterShot", {
      chart: {
        type: "scatter",
        zoomType: "xy",
        plotBackgroundImage:
          "https://www.basketballgoalstore.com/wp-content/uploads/half-court.jpg"
      },
      title: {
        text: null
      },
      xAxis: {
        title: {
          enabled: true,
          text: `${this.state.statTwo}`
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
      },
      yAxis: {
        title: {
          text: `${this.state.statOne}`
        }
      },
      legend: {
        enabled: false,
        layout: "vertical",
        align: "left",
        verticalAlign: "top",
        x: 100,
        y: 70,
        floating: true,
        backgroundColor:
          (Highcharts.theme && Highcharts.theme.legendBackgroundColor) ||
          "#FFFFFF",
        borderWidth: 1
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: "rgb(100,100,100)"
              }
            }
          },
          cursor: "pointer",
          point: {
            events: {
              click: event => {
                console.log("Event: ", event.point.series.userOptions.id);
                window.location =
                  "/player/" + event.point.series.userOptions.id;
                // this.setState({
                //   name: event.point.series.userOptions.name
                // });
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
          tooltip: {
            headerFormat: "<b>{series.name}</b><br>",
            pointFormat: `{point.x} ${this.state.statTwo}, {point.y} ${this
              .state.statOne}`
          }
        }
      },
      series: this.state.data
    });
  }

  render() {
    var headerStyle = {
      backgroundColor: this.props.colors.Color_Main,
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "25px",
      color: this.props.colors.Color_Sec
    };
    return (
      <div>
        <Grid>
          <Row style={{ paddingTop: "30px" }}>
            <Col lg={3} md={4}>
              <div className="card">
                <div style={headerStyle}>
                  <div>Shot Chart</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row style={{ paddingTop: "30px" }}>
            <Col lg={12}>
              <div
                className="card playerScatter"
                id="containerScatterShot"
                style={{
                  height: "500px"
                }}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
