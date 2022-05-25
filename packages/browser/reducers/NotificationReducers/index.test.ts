import { notificationReducer, NotificationState } from './index';

describe('notificationReducers', () => {
  const initialNotificationState: NotificationState = {
    content: '',
    type: 'alert',
    isActive: false,
  };

  const notification: NotificationState = {
    content: 'someContent',
    type: 'alert',
    isActive: false,
  };
  it('SET', () => {
    expect(
      notificationReducer(initialNotificationState, {
        type: 'SET',
        payload: notification,
      }),
    ).toMatchObject(notification);
  });
  it('REMOVE', () => {
    expect(
      notificationReducer(initialNotificationState, {
        type: 'REMOVE',
        payload: notification,
      }),
    ).toMatchObject(initialNotificationState);
  });
});
