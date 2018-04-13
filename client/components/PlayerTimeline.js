import React from "react";
import Slider from "react-slick";
import PlayerTimelineNav from "./PlayerTimelineNav";
import TimelineItem from "./TimelineItem";

export default class PlayerTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({ nav1: this.slider1, nav2: this.slider2 });
  }

  render() {
    //var stats = []
    var playersArr = this.props.stats.sort(function(a, b) {
      return parseInt(b.year) - parseInt(a.year);
    });

    const settings = {
      lazyLoad: false,
      slidesToShow: 3,
      swipeToSlide: true,
      focusOnSelect: true,
      infinite: true
    };
    return (
      <div>
        <div style={{ marginBottom: "15px" }}>
          <Slider
            asNavFor={this.state.nav1}
            ref={slider => (this.slider2 = slider)}
            slidesToShow={3}
            swipeToSlide={true}
            lazyLoad={false}
            adaptiveHeight={true}
            focusOnSelect={true}
            infinite={true}
          >
            {playersArr.map((player, i) => (
              <div>
                <PlayerTimelineNav player={player} />
              </div>
            ))}
          </Slider>
        </div>
        <div>
          <Slider
            {...settings}
            asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)}
          >
            {playersArr.map((player, i) => (
              <div>
                <TimelineItem
                  player={player}
                  name={player.year.toString()}
                  index={i}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}
