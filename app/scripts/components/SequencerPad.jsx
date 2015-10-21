var SequencerPad = React.createClass({

  NUM_ROWS: 4,
  sounds: [
    new Howl({ urls: ['audio/rimshot.wav']}),
    new Howl({ urls: ['audio/hihat.wav']}),
    new Howl({ urls: ['audio/snare.wav']}),
    new Howl({ urls: ['audio/bass.wav']})
  ],

  getInitialState: function() {
    this.timer = setInterval(this.updateIndicator, 500);
    return { current: 0, activeButtons: [], timerInterval: 500, numBeats: 8 };
  },

  updateIndicator: function() {
    var current = this.state.current < this.state.numBeats - 1 ? this.state.current + 1 : 0;

    this.setState({current: current});

    for (var button of this.state.activeButtons) {
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
    for (var button of this.state.activeButtons) {
      button.setState({active: false, flash: false});
    }

    this.state.activeButtons = [];
  },

  render: function() {
    var i = this.NUM_ROWS, rows = [];
    while (i--) {
      rows.push(<li>
        <ButtonRow id={i} buttonActivate={this.activate} buttonDeactivate={this.deactivate} numButtons={this.state.numBeats}></ButtonRow>
        <div className="clearfix"></div>
      </li>);
    }

    var i = this.state.numBeats, output = [];

    while (i--) {
      output.push(<Indicator ref={'indicator'+i} active={this.state.current} id={i}/>);
    }

    return <div id="sequencer">

      <div className="main-pad">
        <div className="control-panel left">
          <TempoControl onBpmChange={this.updateBpm}></TempoControl>
        </div>
        <ul className="indicators">
          {output}
        </ul>

        <ul className="beatpad">
          {rows}
        </ul>

        <div className="control-panel right add-remove-beats">
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-default" onClick={this.removeBeat}>
              <span className="glyphicon glyphicon-chevron-left"></span>
            </button>
            <button type="button" className="btn btn-default" onClick={this.addBeat}>
              <span className="glyphicon glyphicon-chevron-right"></span>
            </button>
          </div>
        </div>
      </div>

      <button className="btn round-button add-channel">
        <span className="glyphicon glyphicon-plus"></span>
      </button>
    </div>;
  }
});

React.render(<SequencerPad></SequencerPad>, document.getElementById('app'));
