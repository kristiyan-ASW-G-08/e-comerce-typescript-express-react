import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useRef, useState } from 'react';
import Logo from '../Logo';
import Notification from '../Notification';
import Link from 'next/link';
import NavLink from '../NavLink';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/AuthSlice';
import Basket from '../Basket';
import SearchBar from '../SearchBar';
const Navbar: FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isActiveCategories, setIsActiveCategories] = useState<boolean>(false);

  const dispatch = useDispatch();
  const authState = useSelector((state: any) => state.auth);
  const basket = useSelector((state: any) => state.basket);
  const notificationState = useSelector((state: any) => state.notification);

  const setMobileNavState = () => {
    setIsActive(prev => !prev);
  };
  const setActiveCategories = () => {
    setIsActiveCategories(prev => !prev);
  };
  return (
    <>
      {notificationState?.isActive ? (
        <Notification
          content={notificationState.content}
          type={notificationState.type}
        />
      ) : (
        ''
      )}
      <nav className=" mx-auto p-7 w-screen border-b-4 bg-slate-700 border-red-400 flex flex-col justify-center ">
        <SearchBar />

        <div className="flex items-center justify-between ">
          <Logo />

          <ul className=" md:flex  hidden space-x-6">
            <NavLink href="/" text="Home" />
            <div>
              <button
                onClick={setActiveCategories}
                className="text-neutral-50 font-bold hover:text-red-400"
              >
                Categories
              </button>
              <ul
                className={`bg-slate-700 mt-10 rounded px-5 py-4 absolute z-10 ${
                  isActiveCategories ? '' : 'hidden'
                }`}
              >
                <NavLink
                  fn={setActiveCategories}
                  href="/products/?category=Laptops and Computers"
                  text="Laptops and Computers"
                  styles={
                    'w-full   text-neutral-50 animate-fade hover:text-red-400'
                  }
                />
                <NavLink
                  fn={setActiveCategories}
                  href="/products/?category=Peripherals"
                  text="Peripherals"
                  styles={
                    'w-full text-neutral-50 animate-fade hover:text-red-400'
                  }
                />
                <NavLink
                  fn={setActiveCategories}
                  href="/products/?category=Phones and Tablets"
                  text="Phones and Tablets"
                  styles={
                    'w-full  text-neutral-50 animate-fade hover:text-red-400'
                  }
                />
                <NavLink
                  fn={setActiveCategories}
                  href="/products/?category=Audio"
                  text="Audio"
                  styles={
                    'w-full text-neutral-50 animate-fade hover:text-red-400'
                  }
                />

                <NavLink
                  fn={setActiveCategories}
                  href="/products/?category=TV"
                  text="TV"
                  styles={
                    'w-full text-neutral-50 animate-fade hover:text-red-400'
                  }
                />
              </ul>
            </div>
            <NavLink href="/deals" text="Contacts" />
            <Link href="/basket">
              <a>
                <Basket products={basket} />
              </a>
            </Link>
            {authState.token ? (
              <>
                <NavLink
                  // @ts-ignore
                  fn={() => dispatch(logout())}
                  href="/"
                  text="Log Out"
                  styles={
                    'text-neutral-50 bg-red-400 px-4 py-1 rounded hover:text-red-400 font-bold hover:bg-slate-700'
                  }
                />
              </>
            ) : (
              <>
                <NavLink
                  href="/login"
                  text="Login"
                  styles={
                    'bg-neutral-50 text-red-400 px-4 py-1 rounded-full hover:text-red-400 font-bold hover:bg-slate-700'
                  }
                />
                <NavLink
                  href="/sign-up"
                  text="Sign Up"
                  styles={
                    'bg-red-400 text-neutral-50 px-4 py-1 rounded-full hover:text-red-400 font-bold hover:bg-slate-700'
                  }
                />
              </>
            )}
            {authState.isAdmin && authState.token ? (
              <NavLink href="/create-product" text="New Product" />
            ) : (
              ''
            )}
          </ul>

          <button
            onClick={setMobileNavState}
            className="text-neutral-50 text-lg hover:text-red-400 sm:hidden block"
          >
            {' '}
            {/*
 // @ts-ignore */}
            <FontAwesomeIcon height={30} icon={faBars} />
          </button>
        </div>
      </nav>

      <nav
        className={`bg-slate-700  px-2  z-10 absolute w-full ${
          isActive ? 'flex animate-fade' : 'hidden'
        }`}
      >
        <ul className=" flex flex-col md:hidden  ">
          <NavLink fn={setMobileNavState} href="/" text="Home" isMobile />
          <NavLink
            fn={setMobileNavState}
            href="/products"
            text="Products"
            isMobile
          />
          <NavLink fn={setMobileNavState} href="/deals" text="Deals" isMobile />
          <NavLink
            fn={setMobileNavState}
            href="/deals"
            text="About Us"
            isMobile
          />
          <NavLink
            fn={setMobileNavState}
            href="/deals"
            text="Contacts"
            isMobile
          />

          {authState.token ? (
            ''
          ) : (
            <>
              <NavLink
                fn={setMobileNavState}
                href="/login"
                text="Login"
                isMobile
              />
              <NavLink
                fn={setMobileNavState}
                href="/sign-up"
                text="Sign Up"
                isMobile
              />
            </>
          )}
          {authState.isAdmin ? (
            ''
          ) : (
            <>
              <NavLink
                fn={setMobileNavState}
                href="/create-product"
                text="New Product"
                isMobile
              />
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
