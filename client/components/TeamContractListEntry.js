import React from "react";

export default class TeamContractListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yrTwoOption: "None",
      yrThreeOption: "None",
      yrFourOption: "None",
      yrFiveOption: "None",
      yrSixOption: "None"
    };
    this.createDollar = this.createDollar.bind(this);
  }

  componentDidMount() {
    if (this.props.player.yearTwoOption !== "None") {
      this.setState({ yrTwoOption: this.props.player.yearTwoOption });
    }
    if (this.props.player.yearThirdOption !== "None") {
      this.setState({ yrThreeOption: this.props.player.yearThirdOption });
    }
    if (this.props.player.yearFourOption !== "None") {
      this.setState({ yrFourOption: this.props.player.yearFourOption });
    }
    if (this.props.player.yearFiveOption !== "None") {
      this.setState({ yrFiveOption: this.props.player.yearFiveOption });
    }
    if (this.props.player.yearSixOption !== "None") {
      this.setState({ yrSixOption: this.props.player.yearSixOption });
    }
  }

  createDollar(value) {
    if (value === "TBD") return "TBD";
    if (value === "") return "-";
    var dollar;
    var arr = value.split("");
    var symbol = arr[0];
    var nums = arr.slice(1, value.length);
    var str = nums.join("");
    var newStr = str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    return "$" + newStr;
  }

  render() {
    var yrTwoHeader = {
      color: "black"
    };
    var yrThreeHeader = {
      color: "black"
    };
    var yrFourHeader = {
      color: "black"
    };
    var yrFiveHeader = {
      color: "black"
    };
    var yrSixHeader = {
      color: "black"
    };
    if (this.state.yrTwoOption === "Player") {
      yrTwoHeader = { color: "red" };
    }
    if (this.state.yrTwoOption === "Team") {
      yrTwoHeader = { color: "green" };
    }
    if (this.state.yrTwoOption === "Early Termination") {
      yrTwoHeader = { color: "blue" };
    }

    if (this.state.yrThreeOption === "Player") {
      yrThreeHeader = { color: "red" };
    }
    if (this.state.yrThreeOption === "Team") {
      yrThreeHeader = { color: "green" };
    }
    if (this.state.yrThreeOption === "Early Termination") {
      yrThreeHeader = { color: "blue" };
    }

    if (this.state.yrFourOption === "Player") {
      yrFourHeader = { color: "red" };
    }
    if (this.state.yrFourOption === "Team") {
      yrFourHeader = { color: "green" };
    }
    if (this.state.yrFourOption === "Early Termination") {
      yrFourHeader = { color: "blue" };
    }

    if (this.state.yrFiveOption === "Player") {
      yrFiveHeader = { color: "red" };
    }
    if (this.state.yrFiveOption === "Team") {
      yrFiveHeader = { color: "green" };
    }
    if (this.state.yrFiveOption === "Early Termination") {
      yrFiveHeader = { color: "blue" };
    }

    if (this.state.yrSixOption === "Player") {
      yrSixHeader = { color: "red" };
    }
    if (this.state.yrSixOption === "Team") {
      yrSixHeader = { color: "green" };
    }
    if (this.state.yrSixOption === "Early Termination") {
      yrSixHeader = { color: "blue" };
    }
    //console.log(this.props.player);
    return (
      <tr>
        <td>{this.props.player.name}</td>
        <td>{this.props.player.age}</td>
        <td>{this.createDollar(this.props.player.yearOne)}</td>
        <td style={yrTwoHeader}>
          {this.createDollar(this.props.player.yearTwo)}
        </td>
        <td style={yrThreeHeader}>
          {this.createDollar(this.props.player.yearThird)}
        </td>
        <td style={yrFourHeader}>
          {this.createDollar(this.props.player.yearFour)}
        </td>
        <td style={yrFiveHeader}>
          {this.createDollar(this.props.player.yearFive)}
        </td>
        <td style={yrSixHeader}>
          {this.createDollar(this.props.player.yearSix)}
        </td>
        <td>{this.props.player.signedUsing}</td>
        <td>{this.createDollar(this.props.player.guaranteed)}</td>
      </tr>
    );
  }
}
