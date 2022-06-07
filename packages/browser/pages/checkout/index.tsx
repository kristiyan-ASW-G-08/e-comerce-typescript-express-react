import { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactInformationPage from '../../components/ContactInformation';
import { Checkout, initialState } from 'slices/CheckoutSlice';
import { BasketProduct } from 'slices/BasketSlice';
import { setNotification } from 'slices/NotificationSlice';
import ProductBasketCard from '@/components/ProductBasketCard';
import {
  PaymentMethod,
  registerPaymentMethod,
} from 'slices/PaymentMethodSlice';
import PaymentMethodForm from '@/components/PaymentMethodForm';
import PlaceOrder from '@/components/PlaceOrder';
const Checkout = () => {
  const steps = Array.from(Array(3).keys());
  const [currentStep, setCurrentStep] = useState<number>(0);
  const checkout = useSelector(
    (state: { checkout: Checkout }) => state.checkout,
  );
  const basket = useSelector(
    (state: { basket: BasketProduct[] }) => state.basket,
  );
  const dispatch = useDispatch();
  const incrementCurrentStep = () => {
    if (currentStep === steps[steps.length]) {
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };
  const componentSteps = [
    <ContactInformationPage incrementCurrentStep={incrementCurrentStep} />,
    <div className="flex flex-col items-start p-10 space-y-8">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      {basket.map(product => (
        <ProductBasketCard key={product._id} {...product} />
      ))}
      <button
        className="bg-blue-400 p-2 px-10 text-neutral-50"
        onClick={incrementCurrentStep}
      >
        Confirm Products
      </button>
    </div>,
    <PlaceOrder />,
  ];
  return (
    <section className="p-10">
      <div className="flex flex-col md:flex-row md:space-x-20 ">
        <div className="flex md:flex-col items-start md:space-y-5 p-5 space-x-5 md:space-x-0 sm:justify-center md:justify-start">
          {steps.map(step => (
            <button
              key={step}
              onClick={() => {
                if (JSON.stringify(checkout) === JSON.stringify(initialState)) {
                  dispatch(
                    setNotification({
                      content: 'Fill The Contacts Form To Proceed',
                      type: 'alert',
                      isActive: true,
                    }),
                  );
                  return;
                }
                setCurrentStep(step);
              }}
              className={`${
                step === currentStep
                  ? 'bg-blue-400 text-neutral-50'
                  : 'border border-neutral-400'
              } h-12  w-12  rounded-full`}
            >
              {step + 1}
            </button>
          ))}
        </div>
        <div className="flex-grow md:px-10 w-full">
          {componentSteps[currentStep]}
        </div>
      </div>
    </section>
  );
};

export default Checkout;
