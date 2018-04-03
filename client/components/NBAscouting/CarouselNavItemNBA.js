import React from "react";

export default class CarouselNavItemNBA extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var stat = this.props.stat;
    if (this.props.stat === "Overall") {
      stat = "ovr";
    }
    if (this.props.stat === "Offense") {
      stat = "off";
    }
    if (this.props.stat === "Defense") {
      stat = "def";
    }
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
        <div
          style={{
            textAlign: "center",
            color: "grey",
            backgroundColor: "rgba(105,105,105,0.1)"
          }}
        >
          {this.props.rank + 1}. {this.props.player.name}
        </div>
        <div
          style={{
            color: "grey",
            textAlign: "center",
            textDecoration: "underline",
            backgroundColor: "rgba(105,105,105,0.1)",
            fontSize: "10px"
          }}
        >
          {stat.toUpperCase()}
        </div>
        <div
          style={{
            color: "grey",
            textAlign: "center",
            backgroundColor: "rgba(105,105,105,0.1)",
            paddingBottom: "5px"
          }}
        >
          {this.props.player[stat].toFixed(1)}
        </div>
      </div>
    );
  }
}
