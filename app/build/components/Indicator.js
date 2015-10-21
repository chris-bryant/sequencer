var Indicator = React.createClass({displayName: "Indicator",
  render: function() {
    return React.createElement("li", {className: this.props.active === this.props.id ? 'active' : ''});
  }
});
