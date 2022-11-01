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

  restoreInputColors = () => {
    const input = document.getElementById('time-input');
    input.style.backgroundColor = 'var(--bg3)';
    input.style.color = 'var(--fg1)';
  };

  restoreDisplayColors = () => {
    const timer = document.getElementById('timer');
    timer.style.backgroundColor = 'var(--bg1)';
    timer.style.color = 'var(--fg0)';
    timer.innerText = this.state.display;
  };

  invalidInput = () => {
    const input = document.getElementById('time-input');
    input.style.backgroundColor = 'var(--red)';
    input.style.color = 'var(--bg0)';
  };

  inputHandleChange = (e) => {
    // senti o cérebro expandindo fazendo essa conta
    // e ai diminuiu de novo porque esse input=time só deixa até 24
    // const calculatedTime = e.target.valueAsNumber / 60000;
    //
    const timeString = e.target.value.split(':');
    // acordei só pra consertar isso
    if (timeString[0].length > 10 || timeString.length > 3) {
      this.invalidInput();
      return;
    }
    // const time = (+timeString[0]) * 60 + (+timeString[1]);
    // esse reduce converte de MM:SS ou SS pra segundos
    const time = (+timeString.reduce((acc, time) => (60 * acc) + + time));
    //
    // pra estilizar caso esteja errado
    //
    if (time < 0 || !time || typeof time !== 'number') {
      this.invalidInput();
      return;
    };
    this.restoreInputColors();
    this.setState({seconds: time}, () => this.displayTime());
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

  timerComplete = () => {
    new Audio('alarm.mp3').play();
    const timer = document.getElementById('timer');
    timer.style.backgroundColor = 'var(--green)';
    timer.style.color = 'var(--bg0)';
    timer.innerText = 'Timer complete!';
  };

  componentDidUpdate(prevState) {
    const { seconds, timerDone } = this.state;
    if (seconds < 0 && !timerDone) {
      // pausa timer, limpa state, trava loop
      this.componentWillUnmount();
      this.clearState();
      this.timerComplete();
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
    // display bg
    this.restoreDisplayColors();
    // input bg
    this.restoreInputColors();
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
            <input type="text" name='custom-time' placeholder='Time, eg.: 1:19 or 79' onChange={this.inputHandleChange} id="time-input" disabled={timerActive}/>
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
