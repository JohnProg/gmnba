import React from "react";

export default class CarouselNavItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var picture =
      "https://vignette.wikia.nocookie.net/charmscrp/images/a/ac/Generic_Avatar.png/revision/latest?cb=20140819033443";
    if (this.props.player.picture) {
      picture = this.props.player.picture;
    }
    return (
      <div
        style={{
          borderLeft: "1px solid white",
          borderRight: "1px solid white",
          backgroundColor: "black"
        }}
      >
        <img style={{ height: "100px" }} src={picture} />
        <div style={{ textAlign: "center", color: "grey" }}>
          {this.props.player.name}
        </div>
      </div>
    );
  }
}
