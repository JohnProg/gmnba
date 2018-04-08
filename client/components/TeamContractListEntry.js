import React from "react";
import axios from "axios";

export default class TeamContractListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yrTwoOption: "None",
      yrThreeOption: "None",
      yrFourOption: "None",
      yrFiveOption: "None",
      yrSixOption: "None",
      id: null
    };
    this.createDollar = this.createDollar.bind(this);
    this.addLink = this.addLink.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/teams/getPlayer/${this.props.player.name}`).then(data => {
      //console.log(data.data);
      if (data.data.id) {
        this.setState({ id: data.data.id }, () => {
          console.log(this.props.player.name + ": " + this.state.id);
        });
      }
    });
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

  addLink() {
    if (this.state.id) {
      return (
        <td>
          <a href={`/player/${this.state.id}`}>
            <span style={{ color: "white" }}>{this.props.player.name}</span>
          </a>
        </td>
      );
    } else {
      return <td>{this.props.player.name}</td>;
    }
  }

  render() {
    var yrTwoHeader = {
      color: "white"
    };
    var yrThreeHeader = {
      color: "white"
    };
    var yrFourHeader = {
      color: "white"
    };
    var yrFiveHeader = {
      color: "white"
    };
    var yrSixHeader = {
      color: "white"
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
      <tr style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white" }}>
        {this.addLink()}
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
