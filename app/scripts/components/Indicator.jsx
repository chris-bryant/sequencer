var Indicator = React.createClass({
  render: function() {
    return <li className={this.props.active === this.props.id ? 'active' : ''}></li>;
  }
});
