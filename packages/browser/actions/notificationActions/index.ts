import { Action, NotificationState } from '@/reducers/NotificationReducers';
export const setAction =
  (payload: NotificationState) => (dispatch: (action: Action) => void) => {
    dispatch({ type: 'SET', payload });
  };
export const removeAction = () => (dispatch: (action: Action) => void) => {
  dispatch({ type: 'REMOVE' });
};
