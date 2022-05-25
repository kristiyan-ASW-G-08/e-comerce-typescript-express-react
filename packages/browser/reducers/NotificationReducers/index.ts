export interface NotificationState {
  content: string;
  type: 'message' | 'alert';
  isActive: boolean;
}

const initialNotificationState: NotificationState = {
  content: '',
  type: 'alert',
  isActive: false,
};

export interface Action {
  type: 'SET' | 'REMOVE';
  payload?: NotificationState;
}
export const notificationReducer = (
  state = initialNotificationState,
  { type, payload }: Action,
) => {
  switch (type) {
    case 'SET':
      return payload;
    case 'REMOVE':
      return initialNotificationState;
    default:
      return state;
  }
};
