var TempoControl = React.createClass({

  handleChange: function(e) {
    var bpm = React.findDOMNode(this.refs.bpm);

    this.props.onBpmChange(Math.ceil( (60 / bpm.value) * 250));
  },

  render: function() {
    return <div id="control-panel">
      <form>
        <div className="form-group">
          <label for="bpm">BPM</label>
          <input type="number" className="form-control" id="bpm" ref="bpm" min="10" max="120" step="10" onChange={this.handleChange}></input>
        </div>
      </form>
    </div>;
  }
});
