import React from "react";
import Slider from "react-slick";
import CompCarouselItem from "./CompCarouselItem";

export default class PlayerComps extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    return (
      <div>
        <Slider {...settings}>
          {this.props.comps.map((player, i) => (
            <div>
              <CompCarouselItem player={player} rank={i + 1} />
            </div>
          ))}
          <div>.</div>
          <div>.</div>
          <div>.</div>
        </Slider>
      </div>
    );
  }
}
