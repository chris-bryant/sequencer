var ButtonRow = React.createClass({
  render: function() {
    var i = this.props.numButtons, buttons = [];
    var buttonId = this.props.numButtons * (this.props.id + 1);

    while (i--) {
      buttonId--;
      buttons.push(<Button id={buttonId} col={i} row={this.props.id} activate={this.props.buttonActivate} deactivate={this.props.buttonDeactivate}></Button>);
    }

    return <ul className="button-row">
      {buttons}
    </ul>
  }
});
