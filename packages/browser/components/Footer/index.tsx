import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faAddressBook,
  faCreditCard,
  faEnvelope,
  faPhone,
  faTruck,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import NavLink from '../NavLink';

const Footer: FC = () => (
  <footer className="bg-neutral-900 w-full">
    <div className="w-full flex p-10 px-24 border-b-4 border-red-400 flex-col space-y-5 md:space-y-0 justify-between md:flex-row">
      <div className="flex space-x-4 ">
        <FontAwesomeIcon
          className=" hidden md:block m-auto text-red-400 hover:text-neutral-50 "
          height={30}
          icon={faTruck}
        />
        <div>
          <p className="text-neutral-50   m-auto">Free Delivery</p>
          <p className="text-neutral-400 text-sm m-auto">
            For Items over 50 dollars
          </p>
        </div>
      </div>

      <div className="flex  space-x-4">
        <FontAwesomeIcon
          className=" hidden md:block m-auto text-red-400 hover:text-neutral-50 "
          height={30}
          icon={faUser}
        />
        <div>
          <p className="text-neutral-50  m-auto">24/7 HELP CENTER</p>
          <p className="text-neutral-400 text-sm m-auto">
            For all of our clients
          </p>
        </div>
      </div>

      <div className="flex space-x-4">
        <FontAwesomeIcon
          className=" hidden md:block  m-auto text-red-400 hover:text-neutral-50 "
          height={30}
          icon={faCreditCard}
        />
        <div>
          <p className="text-neutral-50  m-auto">SAFE PAYMENT</p>
          <p className="text-neutral-400 text-sm m-auto">
            Safe payment with reputable vendors
          </p>
        </div>
      </div>
    </div>
    <div className="flex py-4 px-10 md:px-20 md:space-x-20 flex-col md:flex-row space-y-5 md:space-y-0">
      <div>
        <h3 className="text-neutral-50 ml-6 font-bold text-2xl">Information</h3>
        <nav className="flex flex-col space-y-3 p-3">
          <NavLink
            href="/"
            text="Home"
            styles={'text-neutral-400 hover:text-red-400'}
          />
          <NavLink
            href="/products"
            text="Products"
            styles={'text-neutral-400 hover:text-red-400'}
          />
          <NavLink
            href="/deals"
            text="Deals"
            styles={'text-neutral-400 hover:text-red-400'}
          />
          <NavLink
            href="/deals"
            text="About Us"
            styles={'text-neutral-400 hover:text-red-400'}
          />
          <NavLink
            href="/deals"
            text="Contacts"
            styles={'text-neutral-400 hover:text-red-400'}
          />
        </nav>
      </div>
      <div>
        <h3 className="text-neutral-50 ml-6 font-bold text-2xl">Contacts</h3>
        <nav className="flex flex-col space-y-3 p-3  ">
          <p className=" text-neutral-400 px-5 mb-3">
            Address:New York NY 998 Bell Street 10005
          </p>

          <p className=" text-neutral-400 px-5 mb-3">
            Phone Number:New York NY 998 Bell Street 10005
          </p>

          <p className=" text-neutral-400 px-5 mb-3">
            Address:New York NY 998 Bell Street 10005
          </p>

          <div className="px-5 grid justify-items-start  grid-flow-col w-52">
            <FontAwesomeIcon
              className="m-auto text-red-400 hover:animate-scale hover:text-neutral-50"
              height={25}
              icon={faTwitter}
            />
            <FontAwesomeIcon
              className="m-auto text-red-400 hover:animate-scale hover:text-neutral-50"
              height={25}
              icon={faFacebook}
            />
            <FontAwesomeIcon
              className="m-auto text-red-400 hover:animate-scale hover:text-neutral-50"
              height={25}
              icon={faYoutube}
            />
            <FontAwesomeIcon
              className="m-auto text-red-400 hover:animate-scale hover:text-neutral-50"
              height={25}
              icon={faInstagram}
            />
          </div>
        </nav>
      </div>
      <div>
        <div className="flex flex-col space-y-5">
          <h3 className="text-neutral-50 text-2xl font-bold">
            Sign Up For Our Newsletter
          </h3>
          <p className="text-neutral-400">
            You may unsubscribe at any moment. For that purpose, please find our
            contact info in the legal notice.
          </p>
          <form className="w-full max-w-sm">
            <div className="flex items-center border-b border-red-400 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-neutral-400 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Email address"
              />
              <button
                className="flex-shrink-0 bg-red-400 hover:bg-red-700 border-red-400 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="button"
              >
                Sign Up
              </button>
              <button
                className="flex-shrink-0 border-transparent border-4 text-red-400 hover:text-red-700 text-sm py-1 px-2 rounded"
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
