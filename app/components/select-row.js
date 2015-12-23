
let r = require('r-dom')
let PropTypes = require('react').PropTypes
let DeepComponent = require('./deep-component')

/**
 * A drop-down you can select from
 * TODO: turn into shallow component (immutable options?)
 */
class SelectRow extends DeepComponent {
  constructor (props) {
    super(props)
    this.on_change = this.on_change.bind(this)
  }

  on_change (event) {
    let on_change = this.props.on_change
    if (on_change) { on_change(event.target.value) }
  }

  render () {
    let options = this.props.options
    let value = this.props.value
    let label = this.props.label || ''

    let option_tags = options.map((option, index) => {
      console.log(`select value = ${value}, option value = ${option.value}`)
      return r.option({
        value: option.value,
        selected: (value === option.value)
      }, option.label)
    })

    return (
      r.div({className: 'select-row'}, [
        r.label({}, [
          label,
          r.select({
            ref: 'input',
            value,
            onChange: this.on_change
          }, option_tags)
        ])
      ])
    )
  }

  value () {
    return this.refs.input.value
  }
}

SelectRow.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired
}

// XXX: can't use translate because it doesn't pass refs
module.exports = SelectRow