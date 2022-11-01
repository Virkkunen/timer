import React, { Component } from 'react'

const oneSecond = 1000;

export default class Timer extends Component {
  
  state = {
    seconds: 0,
    display: '00:00',
    timerActive: false,
  }

  presetTime = (e) => {
    const time = Number(e.target.value);
    this.setState({seconds: time, display: this.displayTime()});
  };

  startTimer = () => {
    this.setState({timerActive: true});
    // o countdown em si
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({seconds: prevState.seconds - 1, display: this.displayTime()}));
    }, oneSecond);
  };

  inputHandleChange = (e) => {
    this.setState({seconds: e.target.value});
  };

  displayTime = () => {
    const { seconds } = this.state;
    const displayMinutes = Math.floor(seconds / 60);
    const displaySeconds = seconds - displayMinutes * 60;
    // this.setState({display: `${displayMinutes}:${displaySeconds}`});
    return `${displayMinutes}:${displaySeconds}`;
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  stopTimer = () => {
    this.componentWillUnmount();
    this.setState({timerActive: false});
    console.log('timer stopped');
  };

  clearInputField = () => {
    const input = document.getElementById('time-input');
    input.value = '';
  };

  clearState = () => {
    this.componentWillUnmount();
    this.setState({
      seconds: 0,
      display: '00:00',
      timerActive: false,
    });
    this.clearInputField();
    console.log('state cleared');
  };

  render() {
    const { timerActive, display } = this.state;
    return (
      <div className='timer-div'>
        <span id='timer'>{display}</span>
        <div className='controls'>
          <label htmlFor='custom-time'>
            <input type="number" name='custom-time' min='0' placeholder='Time' onChange={this.inputHandleChange} id="time-input" disabled={timerActive}/>
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
              <button type='button' className='red sans' onClick={this.stopTimer}>Stop</button>
            )}
            <button type='button' className='purple sans' onClick={this.clearState}>Reset</button>
          </div>
        </div>
      </div>
    )
  }
}
