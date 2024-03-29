import { FaCode, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='text-subtext0 grid grid-flow-col grid-cols-2 place-items-center p-4 text-sm my-0'>
      <a
        href='https://github.com/Virkkunen'
        target='_blank'
        rel='noopener noreferrer'
        className='flex content-center hover:text-lavender active:text-opacity-60 ease-in-out duration-200 font-bold'
      >
        <FaGithub className='mx-2 my-auto' />
        @Virkkunen
      </a>
      <a
        href='https://github.com/Virkkunen/timer'
        target='_blank'
        rel='noopener noreferrer'
        className='flex content-center hover:text-lavender active:text-opacity-60 ease-in-out duration-200 font-bold'
      >
        <FaCode className='mx-2 my-auto' />
        source
      </a>
    </footer>
  );
};

export default Footer;
