import {
  errorLoginUser,
  loginUser,
  successfulLoginUser,
  registerUser,
  errorRegisterUser,
  successfulRegisterUser,
} from './user/user.actions';
import { userReducer, UserState } from './user/user.reducer';
import { UserEffects } from './user/user.effects';
import {
  selectError,
  selectLoading,
  selectUsername,
} from './user/user.selectors';
import { PostState } from './post/post.reducer';

export interface AppState {
  userState: UserState;
  postState: PostState;
}

export const fromUser = {
  errorLoginUser,
  loginUser,
  successfulLoginUser,
  registerUser,
  errorRegisterUser,
  successfulRegisterUser,
  userReducer,
  UserEffects,
  getStateError: selectError,
  getStateLoading: selectLoading,
  getStateUsername: selectUsername,
};
