var ButtonRow = React.createClass({displayName: "ButtonRow",
  render: function() {
    var i = this.props.numButtons, buttons = [];
    var buttonId = this.props.numButtons * (this.props.id + 1);

    while (i--) {
      buttonId--;
      buttons.push(React.createElement(Button, {id: buttonId, col: i, row: this.props.id, activate: this.props.buttonActivate, deactivate: this.props.buttonDeactivate}));
    }

    return React.createElement("ul", {className: "button-row"}, 
      buttons
    )
  }
});
