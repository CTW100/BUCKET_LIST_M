/* 
(4) reducer
: dispatch열차를 타고온 action의 type을 확인해서 그에 맞는 동작을 하는 곳
  reducer은 store의 state를 변경시켜야하기 때문에 state를 파라메터로 받고,
  dispatch를 타고온 action을 파라메터로 받아서 
  action의 type을 switch case문으로 조건을 걸어 동작
*/
import { AUTH_USER, LOGIN_USER, REGISTER_USER } from '../_actions/types';

// Action의 type에 따라 변화된 state 반환
export default function (state = {}, action) {
	switch (action.type) {
		case LOGIN_USER:
			return { ...state, loginSuccess: action.payload };
			break;
		case REGISTER_USER:
			return { ...state, registerSuccess: action.payload };
			break;
		case AUTH_USER:
			return { ...state, authSuccess: action.payload };
			break;
		default:
			return { ...state };
	}
}
