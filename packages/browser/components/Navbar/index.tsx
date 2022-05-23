import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useRef, useState } from 'react';
import Logo from '../Logo';
import Search from 'assets/search.svg';
import Bars from 'assets/bars-solid.svg';
import NavLink from '../NavLink';

const Navbar: FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isActiveCategories, setIsActiveCategories] = useState<boolean>(false);
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const setMobileNavState = () => {
    setIsActive(prev => !prev);
  };
  const setActiveCategories = () => {
    setIsActiveCategories(prev => !prev);
  };
  return (
    <>
      <nav className=" mx-auto p-7 w-screen border-b-4 bg-slate-700 border-red-400 flex flex-col justify-center ">
        <form className="mb-6 flex justify-center align-center ">
          <p
            className={`${
              focused ? 'text-red-400' : 'text-gray-400 '
            } absolute top-7 left-7 py-2 px-4`}
          >
            <FontAwesomeIcon height={15} icon={faSearch} />
          </p>
          <input
            onFocus={onFocus}
            onBlur={onBlur}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-10 text-slate-700  focus:outline-none focus:bg-white focus:border-red-400 "
            type="search"
            name="search"
            placeholder="Search Product Here"
          />
        </form>

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
                  href="/products"
                  text="Products"
                  styles={
                    'w-full   text-neutral-50 animate-fade hover:text-red-400'
                  }
                />
                <NavLink
                  fn={setActiveCategories}
                  href="/deals"
                  text="Deals"
                  styles={
                    'w-full text-neutral-50 animate-fade hover:text-red-400'
                  }
                />
                <NavLink
                  fn={setActiveCategories}
                  href="/deals"
                  text="About Us"
                  styles={
                    'w-full  text-neutral-50 animate-fade hover:text-red-400'
                  }
                />
                <NavLink
                  fn={setActiveCategories}
                  href="/deals"
                  text="Contacts"
                  styles={
                    'w-full text-neutral-50 animate-fade hover:text-red-400'
                  }
                />
                <NavLink
                  fn={setActiveCategories}
                  href="/deals"
                  text="Login"
                  styles={
                    'w-full text-neutral-50 animate-fade hover:text-red-400'
                  }
                />
                <NavLink
                  fn={setActiveCategories}
                  href="/deals"
                  text="Sign Up"
                  styles={
                    'w-full text-neutral-50 animate-fade hover:text-red-400 '
                  }
                />
              </ul>
            </div>
            <NavLink href="/products" text="Products" />
            <NavLink href="/deals" text="Deals" />
            <NavLink href="/deals" text="About Us" />
            <NavLink href="/deals" text="Contacts" />
            <NavLink
              href="/deals"
              text="Login"
              styles={
                'bg-neutral-50 text-red-400 px-4 py-1 rounded-full hover:text-red-400 font-bold hover:bg-slate-700'
              }
            />
            <NavLink
              href="/deals"
              text="Sign Up"
              styles={
                'bg-red-400 text-neutral-50 px-4 py-1 rounded-full hover:text-red-400 font-bold hover:bg-slate-700'
              }
            />
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
          <NavLink fn={setMobileNavState} href="/deals" text="Login" isMobile />
          <NavLink
            fn={setMobileNavState}
            href="/deals"
            text="Sign Up"
            isMobile
          />
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
