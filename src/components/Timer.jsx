import React, { Component } from 'react'

const oneSecond = 1000;

export default class Timer extends Component {
  
  state = {
    seconds: 0,
    timerActive: false,
  }

  presetTime = (e) => {
    const time = Number(e.target.value);
    this.setState({seconds: time});
    console.log(this.state)
  };

  startTimer = () => {
    this.setState({timerActive: true});
    // o countdown em si
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({seconds: prevState.seconds - 1}));
    }, oneSecond);
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  clearState = () => {
    this.componentWillUnmount();
    this.setState({
      seconds: 0,
      timerActive: false,
    });
    console.log('state cleared');
  };


  render() {
    const { timerActive, seconds } = this.state;
    return (
      <div className='timer-div'>
        <span id='timer'>{seconds}</span>
        <div className='controls'>
          <label htmlFor='custom-time'>
            <input type="number" name='custom-time' min='0' placeholder='Time'/>
          </label>
          <div className='presets'>
            <button type='button' className='blue mono' name='5' value='300' disabled={timerActive} onClick={this.presetTime}>5:00</button>
            <button type='button' className='blue mono' name='10' value='600' disabled={timerActive} onClick={this.presetTime}>10:00</button>
            <button type='button' className='blue mono' name='15' value='900' disabled={timerActive} onClick={this.presetTime}>15:00</button>
          </div>
          <div className='control-buttons'>
            {!timerActive ? (
              <button type='button' className='green sans' onClick={this.startTimer}>Start</button>
            ) : (
              <button type='button' className='red sans'>Stop</button>
            )}
            <button type='button' className='purple sans' onClick={this.clearState}>Reset</button>
          </div>
        </div>
      </div>
    )
  }
}
