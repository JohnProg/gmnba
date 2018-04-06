import React from "react";
import Slider from "react-slick";
import CarouselItemCollege from "./CarouselItemCollege";
import CarouselNavItemCollege from "./CarouselNavItemCollege";

export default class PlayerCarouselCollege extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
    this.renderNav = this.renderNav.bind(this);
    this.renderCar = this.renderCar.bind(this);
    this.renderPlayers = this.renderPlayers.bind(this);
    this.getOverall = this.getOverall.bind(this);
    this.getOffense = this.getOffense.bind(this);
    this.getDefense = this.getDefense.bind(this);
    this.scaleStat = this.scaleStat.bind(this);
    this.rankStat = this.rankStat.bind(this);
  }

  componentDidMount() {
    this.setState({ nav1: this.slider1, nav2: this.slider2 });
  }

  renderPlayers() {
    if (this.props.players) {
      if (this.props.stat === "Overall") {
        this.getOverall(this.props.players);
        //console.log(this.props.players);
      } else if (this.props.stat === "Offense") {
        this.getOffense(this.props.players);
      } else if (this.props.stat === "Defense") {
        this.getDefense(this.props.players);
      } else {
        this.rankStat(this.props.players, this.props.stat);
      }
    }
  }

  scaleStat(high, stat, low) {
    var scaled = 100 / (high - low) * (stat - low);
    return scaled;
  }

  rankStat(players, stat) {
    //console.log("Ranking players by ", stat);
    players.sort(function(a, b) {
      return parseFloat(b[stat]) - parseFloat(a[stat]);
    });
  }

  getOverall(players) {
    for (var i = 0; i < players.length; i++) {
      let player = players[i];
      var scaledPer = this.scaleStat(34.2, parseFloat(player.per), 5.0) * 0.45;
      var scaledBpm = this.scaleStat(16.8, parseFloat(player.bpm), -3.5) * 0.35;
      var scaledWs48 =
        this.scaleStat(0.309, parseFloat(player.wsFourtyEight), 0) * 0.1;
      var scaledWs = this.scaleStat(5.8, parseFloat(player.ws), 0) * 0.1;
      var weightedOvr = scaledPer + scaledBpm + scaledWs48 + scaledWs;
      // var per = parseFloat(player.per) * 0.5;
      // var bpm = parseFloat(player.bpm) * 0.2;
      // var ws48 = parseFloat(player.wsFourtyEight) * 0.15;
      // var ws = parseFloat(player.ws) * 0.15;
      // var weightedOvr = per + bpm + ws48 + ws;
      player["ovr"] = weightedOvr;
    }
    players.sort(function(a, b) {
      return parseFloat(b.ovr) - parseFloat(a.ovr);
    });
    //console.log(players);
  }

  getOffense(players) {
    for (var i = 0; i < players.length; i++) {
      let player = players[i];
      var scaledObpm =
        this.scaleStat(12.0, parseFloat(player.obpm), -4.0) * 0.5;
      var scaledOws = this.scaleStat(4.5, parseFloat(player.ows), -0.1) * 0.5;
      // var obpm = parseFloat(player.obpm);
      // var ows = parseFloat(player.ows);
      var offRating = scaledObpm + scaledOws;
      player["off"] = offRating;
    }
    players.sort(function(a, b) {
      return parseFloat(b.off) - parseFloat(a.off);
    });
    //console.log(players);
  }

  getDefense(players) {
    for (var i = 0; i < players.length; i++) {
      let player = players[i];
      var scaledDbpm =
        this.scaleStat(12.1, parseFloat(player.dbpm), -1.5) * 0.5;
      var scaledDws = this.scaleStat(2.7, parseFloat(player.dws), 0.2) * 0.5;
      // var dbpm = parseFloat(player.dbpm);
      // var dws = parseFloat(player.dws);
      var defRating = scaledDbpm + scaledDws;
      player["def"] = defRating;
    }
    players.sort(function(a, b) {
      return parseFloat(b.def) - parseFloat(a.def);
    });
    //console.log(players);
  }

  renderNav() {
    // if (this.props.players) {
    //   return this.props.players.map((player, i) => {
    //     <div>
    //       <CarouselItemCollege player={player} />
    //     </div>;
    //   });
    // }
  }

  renderCar() {
    // if (this.props.players) {
    //   return this.props.players.map(player => {
    //     <div>
    //       <div>Hello</div>
    //     </div>;
    //   });
    // }
  }

  render() {
    this.renderPlayers();
    const settings = {
      lazyLoad: true
      //adaptiveHeight: true
    };
    return (
      <div>
        <div className="card">
          <Slider
            {...settings}
            asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)}
          >
            {this.props.players.map(player => (
              <div>
                <CarouselItemCollege
                  stat={this.props.stat}
                  player={player}
                  name={player.name}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="card" style={{ marginTop: "30px" }}>
          <Slider
            asNavFor={this.state.nav1}
            ref={slider => (this.slider2 = slider)}
            slidesToShow={6}
            swipeToSlide={true}
            focusOnSelect={true}
            lazyLoad={true}
            adaptiveHeight={true}
          >
            {this.props.players.map((player, i) => (
              <div>
                <CarouselNavItemCollege
                  player={player}
                  stat={this.props.stat}
                  rank={i}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}
