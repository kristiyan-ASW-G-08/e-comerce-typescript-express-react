import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
interface NavLinkProps {
  href: string;
  text: string;
  fn?: () => void;
  isMobile?: boolean;
  styles?: string;
}

const NavLink: FC<NavLinkProps> = ({
  href,
  text,
  fn = () => {},
  isMobile = false,
  styles = '  text-neutral-50 hover:text-blue-400 font-bold',
}) => {
  const router = useRouter();

  return (
    <li className={isMobile ? 'px-5 mb-3' : ''}>
      <Link href={href}>
        <a
          onClick={fn}
          className={[
            router.pathname === href ? 'text-blue-400 ' : '',
            ,
            styles,
          ].join(' ')}
        >
          {text}
        </a>
      </Link>
    </li>
  );
};

export default NavLink;