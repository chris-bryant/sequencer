var TempoControl = React.createClass({displayName: "TempoControl",

  handleChange: function(e) {
    var bpm = React.findDOMNode(this.refs.bpm);

    this.props.onBpmChange(Math.ceil( (60 / bpm.value) * 250));
  },

  render: function() {
    return React.createElement("div", {id: "control-panel"}, 
      React.createElement("form", null, 
        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", {for: "bpm"}, "BPM"), 
          React.createElement("input", {type: "number", className: "form-control", id: "bpm", ref: "bpm", min: "10", max: "120", step: "10", onChange: this.handleChange})
        )
      )
    );
  }
});
