var Button = React.createClass({displayName: "Button",
  getInitialState: function() {
    return {active: false, flash: false};
  },

  classNames: function(classes) {
    var classNames = [];
    for (var className in classes) {
      if (classes[className]) classNames.push(className);
    }

    return classNames.join(' ');
  },

  activate: function(event) {
    this.setState({active: !this.state.active});

    if (!this.state.active) {
      this.props.activate(this);
    } else {
      this.setState({flash: false});
      this.props.deactivate(this.props.id);
    }
  },

  render: function() {
    var classes = this.classNames({'active': this.state.active, 'flash': this.state.flash});

    return React.createElement("li", {className: classes, onClick: this.activate})
  }
});
