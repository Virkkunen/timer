import React, { Component } from 'react'

export default class Button extends Component {
  render() {
    const { name, color, font } = this.props;

    return (
      <button name={name} className={`${color} ${font}`} value={name} >{name}</button>
    )
  }
}
