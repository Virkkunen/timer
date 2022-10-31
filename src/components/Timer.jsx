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
    const { timerActive } = this.state;
    return (
      <div className='timer-div'>
        <span id='timer'>{timeDisplay}</span>
        <div className='controls'>
          <label htmlFor='custom-time'>
            <input type="number" name='custom-time' min='0' placeholder='Time'/>
          </label>
          <div className='presets'>
            <Button name="5:00" color="blue" font="mono" />
            <Button name="10:00" color="blue" font="mono" />
            <Button name="15:00" color="blue" font="mono" />
          </div>
          <div className='control-buttons'>
            <Button name={timerActive ? "Stop" : "Start"} color={timerActive ? "red" : "green"} />
            <Button name="Reset" color="purple"/>
          </div>
          
        </div>
      </div>
    )
  }
}
