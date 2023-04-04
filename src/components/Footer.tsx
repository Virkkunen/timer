import { FaCode, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='text-subtext0 flex p-4 justify-center shadow-md text-sm'>
      <a
          href='https://github.com/Virkkunen'
          target="_blank"
          rel="noopener noreferrer"
          className='flex content-center hover:text-lavender active:text-opacity-60 ease-in-out duration-200 mx-8 font-bold'
        >
          <FaGithub className='mx-2 my-auto' />
          @Virkkunen
        </a>
        <a
          href='https://github.com/Virkkunen/timer'
          target="_blank"
          rel="noopener noreferrer"
          className='flex content-center hover:text-lavender active:text-opacity-60 ease-in-out duration-200 mx-8 font-bold'
        >
          <FaCode className='mx-2 my-auto' />
          source
        </a>
    </footer>
  )
}

export default Footer