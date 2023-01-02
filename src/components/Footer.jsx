import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';

export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <a
          href='https://github.com/Virkkunen'
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={ faGithub } />
          @Virkkunen
        </a>
        <a
          href='https://github.com/Virkkunen/timer'
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={ faCode } />
          source
        </a>
      </div>
    )
  }
}
