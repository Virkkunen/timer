import React, { Component } from 'react'
import Footer from './Footer';

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
    this.setState({seconds: time}, this.displayTime);
  };

  startTimer = () => {
    const { seconds } = this.state;
    if (seconds <= 0 ) return console.log('invalid time');

    this.setState({timerActive: true, timerDone: false});
    // o countdown em si
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({seconds: prevState.seconds - 1}), this.displayTime);
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

  invalidInputColors = () => {
    const input = document.getElementById('time-input');
    input.style.backgroundColor = 'var(--red)';
    input.style.color = 'var(--bg0)';
  };

  validateTimeInput = (time) => {
    if (time.length > 3 || !time) {
      this.invalidInputColors();
      return false;
    }

    for (let i in time) {
      if (time[i].length > 10 || time[i] < 0) {
        this.invalidInputColors();
        return false;
      }
    };

    return true;
  };

  validateTimeReduce = (time) => {
    const typeOfTime = (typeof time === 'number');
    const timeNotNegative = time >= 0;

    return typeOfTime && timeNotNegative;
  };

  inputHandleChange = (e) => {
    // senti o cérebro expandindo fazendo essa conta
    // e ai diminuiu de novo porque esse input=time só deixa até 24
    // const calculatedTime = e.target.valueAsNumber / 60000;
    //
    const timeSplitter = e.target.value.split(':');
    // validação do split
    if (!this.validateTimeInput(timeSplitter)) return;
    // esse reduce converte de MM:SS ou HH:MM:SS pra segundos
    const time = (+timeSplitter.reduce((acc, time) => (60 * acc) + + time));
    // validação do reduce
    if (!this.validateTimeReduce(time)) {
      this.invalidInputColors();
      return;
    };

    this.restoreInputColors();
    this.setState({seconds: time}, this.displayTime);
  };

  displayTime = () => {
    this.restoreDisplayColors();
    const { seconds } = this.state;
    // a gambiarra tá grande mas funciona
    const displayMinutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    // coloca o 0 a esquerda, poderia usar String.padLeft
    const formatMinutes = ((displayMinutes < 10) ? ('0' + displayMinutes) : displayMinutes);
    const formatSeconds = ((displaySeconds < 10) ? ('0' + displaySeconds) : displaySeconds);
    const display = `${formatMinutes}:${formatSeconds}`;
    this.setState({display: display});
  };

  stopInterval = () => {
    clearInterval(this.intervalId);
    this.setState({timerActive: false});
  };

  componentWillUnmount() {
    this.stopInterval();
  }

  timerComplete = () => {
    new Audio('alarm.mp3').play();

    const timer = document.getElementById('timer');
    timer.style.backgroundColor = 'var(--green)';
    timer.style.color = 'var(--bg0)';

    this.setState({display: 'Timer complete!', timerDone: false});
  };

  componentDidUpdate() {
    const { seconds, timerDone, timerActive } = this.state;
    if (seconds === 0 && !timerDone && timerActive) {
      // pausa timer, limpa state, conclui timer, toca alarme, muda cor, muda texto 
      this.stopInterval();
      this.clearStatePartial();
    }
    // segunda validação porque algo quebrou quando consertei o delay
    // e eu não sei o que é, mas essa fita crepe arruma
    if (seconds === 0 && timerDone && !timerActive) {
      this.stopInterval();
      this.timerComplete();
    }
  }

  stopTimer = () => {
    this.stopInterval();
    this.setState({timerActive: false});
    console.log('timer stopped');
  };

  clearInputField = () => {
    const input = document.getElementById('time-input');
    input.value = '';
    this.restoreInputColors();
  };

  clearStateFully = () => {
    this.stopInterval();
    this.setState({
      seconds: 0,
      display: '00:00',
      timerActive: false,
      timerDone: false,
    });
    this.restoreDisplayColors();
    this.clearInputField();
    console.log('state cleared');
  };

  clearStatePartial = () => {
    this.stopInterval();
    this.setState({
      timerActive: false,
      timerDone: true,
    });
    this.clearInputField();
    console.log('state partially cleared');
  };

  render() {
    const { timerActive, display } = this.state;
    return (
      <div className='timer-div'>
        <span id='timer'>{display}</span>
        <div className='controls'>
          <label htmlFor='custom-time'>
            <input
              type="text"
              name='custom-time'
              placeholder='Time, eg.: 1:19 or 79'
              onChange={this.inputHandleChange}
              id="time-input" 
              disabled={timerActive}
            />
          </label>
          <div className='presets'>
            <button
              type='button'
              className='blue mono'
              name='5'
              value='300'
              disabled={timerActive}
              onClick={this.presetTime}
            >
              5:00
            </button>
            <button
              type='button'
              className='blue mono'
              name='10'
              value='600'
              disabled={timerActive}
              onClick={this.presetTime}
            >
              10:00
            </button>
            <button
              type='button'
              className='blue mono'
              name='15'
              value='900'
              disabled={timerActive}
              onClick={this.presetTime}
            >
              15:00
            </button>
          </div>
          <div className='control-buttons'>
            <button 
              type='button' 
              className={`${!timerActive ? 'green' : 'red'} sans`} 
              onClick={!timerActive ? this.startTimer : this.stopTimer}
            >
              {`${!timerActive ? 'Start' : 'Stop'}`}
            </button>
            <button
              type='button'
              className='purple sans'
              onClick={this.clearStateFully}
            >
              Reset
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
