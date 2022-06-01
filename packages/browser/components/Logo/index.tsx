import Image from 'next/image';
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
