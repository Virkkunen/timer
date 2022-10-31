import React, { Component } from 'react'
import Button from './Button'

export default class Timer extends Component {
  
  state = {
    seconds: 0,
  }

  render() {
    return (
      <div>
        <span id='timer'>{this.state.seconds}</span>
        <div className='buttons'>
          <Button name="Start"/>
          <Button name="Stop"/>
          <Button name="Reset"/>
        </div>
      </div>
    )
  }
}
