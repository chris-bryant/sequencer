var SequencerPad = React.createClass({

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
      rows.push(<li>
        <ButtonRow id={i} buttonActivate={this.activate} buttonDeactivate={this.deactivate} numButtons={this.state.numBeats}></ButtonRow>
        <div className="clearfix"></div>
      </li>);
    }

    var i = this.state.numBeats, output = [];

    while (i--) {
      output.push(<Indicator ref={'indicator'+i} active={this.state.current} id={i}/>);
    }

    var padClasses = 'main-pad';
    if (this.state.direction !== this.RIGHT_TO_LEFT) {
      padClasses += ' directionFlip';
    }

    return <div id="sequencer">

      <div className={padClasses}>
        <div className="control-panel left">
          <TempoControl onBpmChange={this.updateBpm}></TempoControl>
          <button type="button" className="btn btn-default" onClick={this.flipDirection}>
            <span className="glyphicon glyphicon glyphicon-arrow-left"></span>
            <span className="glyphicon glyphicon glyphicon-arrow-right"></span>
          </button>
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
