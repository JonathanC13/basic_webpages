import {FaFacebook, FaTwitter, FaLinkedin, FaHouse, FaUser, FaFolder, FaEnvelope, FaAddressCard} from 'react-icons/fa6'

export const links = [
    {
      id: 1,
      url: '/',
      text: 'home',
      icon: <FaHouse/>
    },
    {
      id: 2,
      url: '/about',
      text: 'about',
      icon: <FaUser/>
    },
    {
      id: 3,
      url: '/projects',
      text: 'projects',
      icon: <FaFolder/>
    },
    {
      id: 4,
      url: '/contact',
      text: 'contact',
      icon: <FaEnvelope/>
    },
    {
      id: 5,
      url: '/profile',
      text: 'profile',
      icon: <FaAddressCard/>
    },
];
  
export const social = [
    {
      id: 1,
      url: 'https://www.facebook.com',
      icon: <FaFacebook />,
    },
    {
      id: 2,
      url: 'https://www.twitter.com',
      icon: <FaTwitter />,
    },
    {
      id: 3,
      url: 'https://www.linkedin.com',
      icon: <FaLinkedin />,
    }
];