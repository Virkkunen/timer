import React, { Component } from 'react'

const oneSecond = 1000;

export default class Timer extends Component {
  
  state = {
    seconds: 0,
    display: '00:00',
    timerActive: false,
    timerDone: false,
  }

  presetTime = (e) => {
    const time = Number(e.target.value);
    this.setState({seconds: time}, () => this.displayTime());
  };

  startTimer = () => {
    const { seconds } = this.state;
    if (seconds <= 0 ) return console.log('invalid time');

    this.setState({timerActive: true, timerDone: false});
    // o countdown em si
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({seconds: prevState.seconds - 1}), this.displayTime());
    }, oneSecond);
  };

  inputHandleChange = (e) => {
    if (e.target.value < 0) return;
    this.setState({seconds: Number(e.target.value)}, () => this.displayTime());
  };

  displayTime = () => {
    const { seconds } = this.state;
    if (seconds < 0) {
      this.setState({display: '00:00'});
    }
    // a gambiarra tá grande mas funciona
    const displayMinutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    const formatMinutes = ((displayMinutes < 10) ? ('0' + displayMinutes) : displayMinutes);
    const formatSeconds = ((displaySeconds < 10) ? ('0' + displaySeconds) : displaySeconds);
    const display = `${formatMinutes}:${formatSeconds}`;
    this.setState({display: display});
  };

  componentWillUnmount() {
    clearInterval(this.intervalId); // pausa/para o timer
  }

  componentDidUpdate(prevState) {
    console.log(prevState.seconds)
    const { seconds, timerDone } = this.state;
    if (seconds < 0 && !timerDone) {
      // pausa timer, limpa state, trava loop
      this.componentWillUnmount();
      this.clearState();
      this.setState({timerDone: true}); // segunda validação pra não dar loop
    }
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
