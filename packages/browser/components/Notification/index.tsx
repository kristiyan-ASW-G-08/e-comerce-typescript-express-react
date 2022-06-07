import { removeAction } from '@/actions/notificationActions';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeNotification } from 'slices/NotificationSlice';

interface NotificationProps {
  content: string;
  type: 'message' | 'alert';
}
const Notification: FC<NotificationProps> = ({ content, type }) => {
  const dispatch = useDispatch();
  const background: { [key: string]: string } = {
    message: 'bg-blue-400',
    alert: 'bg-red-400',
  };
  useEffect(() => {
    setTimeout(() => {
      //@ts-ignore
      dispatch(removeNotification());
      console.log('Timer');
    }, 5000);
  }, []);

  return (
    <div className="absolute top-10 z-50  h-16 w-full flex justify-center">
      <p
        className={`${background[type]} text-neutral-50 p-6 px-16 rounded
      `}
      >
        {content}
      </p>
    </div>
  );
};

export default Notification;
