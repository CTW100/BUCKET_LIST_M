/* 
(2) Action Creator
: Dispatch라는 열차에 Action을 태워서 보내줄 때 
  Dispatch에 inline으로 action을 넣는 것이 불편하기 때문에 action객체를 return 해주는 함수를 만들어놓는 것 (즉, Action을 return 해주는 함수)
*/
import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';

export function loginUser(dataToSubmit) {}

export function registerUser(dataToSubmit) {
	const request = axios
		.post(
			'https://bucket-list-api.run.goorm.io/api/users/register',
			dataToSubmit,
			{ withCredentials: true }
		)
		.then((response) => response.data);

	return {
		type: REGISTER_USER,
		payload: request, // {registerSuccess: true}
	};
}

export function authUser(dataToSubmit) {}
