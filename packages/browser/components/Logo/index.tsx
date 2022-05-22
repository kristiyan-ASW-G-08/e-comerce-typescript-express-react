import Image from 'next/image';
import styles from './index.module.scss';
import logo from '../../assets/logo.svg';

const Logo = () => (
  <div>
    <Image
      src={logo ? logo : ''}
      height={20}
      width={40}
      alt="PodCasting Logo"
    />
  </div>
);

export default Logo;
