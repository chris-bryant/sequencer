var SequencerPad = React.createClass({displayName: "SequencerPad",

  NUM_ROWS: 4,
  RIGHT_TO_LEFT: true,
  sounds: [
    new Howl({ urls: ['audio/rimshot.wav']}),
    new Howl({ urls: ['audio/hihat.wav']}),
    new Howl({ urls: ['audio/snare.wav']}),
    new Howl({ urls: ['audio/bass.wav']})
  ],

  getInitialState: function() {
    this.timer = setInterval(this.updateIndicator, 500);
    return { current: 0, activeButtons: [], timerInterval: 500, numBeats: 8, direction: this.RIGHT_TO_LEFT };
  },

  updateIndicator: function() {
    var current = this.state.current < this.state.numBeats - 1 ? this.state.current + 1 : 0;

    this.setState({current: current});

    for (var i in this.state.activeButtons) {
      var button = this.state.activeButtons[i];
      button.setState({flash: false});

      // play sound and flash
      if (current === button.props.col) {
        button.setState({flash: true});

        if (!_.isUndefined(this.sounds[button.props.row])) {
          this.sounds[button.props.row].play();
        }
      }
    }
  },

  activate: function(e) {
    this.state.activeButtons.push(e);
  },

  deactivate: function(id) {
    this.state.activeButtons = _.filter(this.state.activeButtons, function(button) { return button.props.id != id });
  },

  updateBpm: function(newBpm) {
    clearInterval(this.timer);
    this.setState({bpm: newBpm});
    this.timer = setInterval(this.updateIndicator, newBpm);
  },

  addBeat: function() {
    if (this.state.numBeats < 8) this.setState({numBeats: this.state.numBeats + 1});
    this.clearActiveButtons();
  },

  removeBeat: function() {
    if (this.state.numBeats > 4) this.setState({numBeats: this.state.numBeats - 1});
    this.clearActiveButtons();
  },

  clearActiveButtons: function() {
    for (var i in this.state.activeButtons) {
      var button = this.state.activeButtons[i];
      button.setState({active: false, flash: false});
    }

    this.state.activeButtons = [];
  },

  flipDirection: function() {
    this.setState({direction: !this.state.direction});
  },

  render: function() {
    var i = this.NUM_ROWS, rows = [];
    while (i--) {
      rows.push(React.createElement("li", null, 
        React.createElement(ButtonRow, {id: i, buttonActivate: this.activate, buttonDeactivate: this.deactivate, numButtons: this.state.numBeats}), 
        React.createElement("div", {className: "clearfix"})
      ));
    }

    var i = this.state.numBeats, output = [];

    while (i--) {
      output.push(React.createElement(Indicator, {ref: 'indicator'+i, active: this.state.current, id: i}));
    }

    var padClasses = 'main-pad';
    if (this.state.direction !== this.RIGHT_TO_LEFT) {
      padClasses += ' directionFlip';
    }

    return React.createElement("div", {id: "sequencer"}, 

      React.createElement("div", {className: padClasses}, 
        React.createElement("div", {className: "control-panel left"}, 
          React.createElement(TempoControl, {onBpmChange: this.updateBpm}), 
          React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.flipDirection}, 
            React.createElement("span", {className: "glyphicon glyphicon glyphicon-arrow-left"}), 
            React.createElement("span", {className: "glyphicon glyphicon glyphicon-arrow-right"})
          )
        ), 
        React.createElement("ul", {className: "indicators"}, 
          output
        ), 

        React.createElement("ul", {className: "beatpad"}, 
          rows
        ), 

        React.createElement("div", {className: "control-panel right add-remove-beats"}, 
          React.createElement("div", {className: "btn-group", role: "group"}, 
            React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.removeBeat}, 
              React.createElement("span", {className: "glyphicon glyphicon-chevron-left"})
            ), 
            React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.addBeat}, 
              React.createElement("span", {className: "glyphicon glyphicon-chevron-right"})
            )
          )
        )
      ), 

      React.createElement("button", {className: "btn round-button add-channel"}, 
        React.createElement("span", {className: "glyphicon glyphicon-plus"})
      )
    );
  }
});

React.render(React.createElement(SequencerPad, null), document.getElementById('app'));
