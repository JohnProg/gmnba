import React from "react";
import Slider from "react-slick";
import CarouselItem from "./CarouselItem";
import CarouselNavItem from "./CarouselNavItem";

export default class PlayerCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
    this.renderNav = this.renderNav.bind(this);
    this.renderCar = this.renderCar.bind(this);
  }

  componentDidMount() {
    this.setState({ nav1: this.slider1, nav2: this.slider2 });
  }

  renderNav() {
    if (this.props.players) {
      return this.props.players.map((player, i) => {
        <div>
          <CarouselItem player={player} />
        </div>;
      });
    }
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
    //console.log(this.props.players);
    const settings = {
      lazyLoad: true
    };
    var playersArr = this.props.players.sort(function(a, b) {
      return parseFloat(a.mpg) - parseFloat(b.mpg);
    });
    return (
      <div>
        <div className="card">
          <Slider
            {...settings}
            asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)}
          >
            {playersArr.map(player => (
              <div>
                <CarouselItem
                  player={player}
                  name={player.name}
                  team={this.props.team}
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
          >
            {playersArr.map(player => (
              <div>
                <CarouselNavItem player={player} />
              </div>
            ))}
            {/*<div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>*/}
          </Slider>
        </div>
      </div>
    );
  }
}
