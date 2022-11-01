import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <FontAwesomeIcon icon={ faGithub } />
        <a href='https://github.com/Virkkunen'>@Virkkunen</a>
      </div>
    )
  }
}
