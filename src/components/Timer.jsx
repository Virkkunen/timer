import React, { Component } from 'react'
import Button from './Button'

export default class Timer extends Component {
  
  state = {
    seconds: 0,
    minutes: 0,
    timerActive: false,
  }

  clearState = () => {
    this.setState({
      seconds: 0,
      minutes: 0,
      timerActive: false,
    });
    console.log('state cleared');
  };

  render() {
    const timeDisplay = `${this.state.minutes}:${this.state.seconds}`;
    return (
      <div className='timer-div'>
        <span id='timer'>{timeDisplay}</span>
        <div className='controls'>
          <label htmlFor='custom-time'>
            <span>Time:</span>
            <input type="number" name='custom-time' min='0'/>
          </label>
          <div className='presets'>
            <Button name="5:00" color="blue" font="mono" />
            <Button name="10:00" color="blue" font="mono" />
            <Button name="15:00" color="blue" font="mono" />
          </div>
          <div className='control-buttons'>
            <Button name="Start" color="green"/>
            <Button name="Stop" color="red"/>
            <Button name="Reset" color="purple"/>
          </div>
          
        </div>
      </div>
    )
  }
}
