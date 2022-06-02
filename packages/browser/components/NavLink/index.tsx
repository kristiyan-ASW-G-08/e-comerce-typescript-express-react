import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
interface NavLinkProps {
  href: string;
  text: string;
  fn?: () => void;
  isMobile?: boolean;
  styles?: string;
  activeStyles?: string;
}

const NavLink: FC<NavLinkProps> = ({
  href,
  text,
  fn = () => {},
  isMobile = false,
  styles = 'text-neutral-50 hover:text-red-400 font-bold',
  activeStyles = 'text-red-400',
}) => {
  const router = useRouter();

  return (
    <li className={isMobile ? 'px-5 mb-3' : ''}>
      <Link href={href}>
        <a
          onClick={fn}
          className={[
            styles,
            router.pathname === href ? activeStyles : '',
            ,
          ].join(' ')}
        >
          {text}
        </a>
      </Link>
    </li>
  );
};

export default NavLink;
