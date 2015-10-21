var TempoControl = React.createClass({displayName: "TempoControl",

  // (bpm / 60) * 4000
  handleChange: function(e) {
    var bpm = React.findDOMNode(this.refs.bpm);
    console.log(bpm.value());
  },

  render: function() {
    return React.createElement("form", null, 
      React.createElement("div", {className: "form-group"}, 
        React.createElement("label", {for: "bpm"}, "BPM"), 
        React.createElement("input", {type: "number", className: "form-control", id: "bpm", ref: "bpm", onChange: this.handleChange})
      )
    )
  }
});
