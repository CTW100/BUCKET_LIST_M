/* hoc에 컴포넌트를 넣어주어 새로운 컴포넌트를 만들어서 인증 체크를 해줌
   const EnhancedComponent = higherOrderComponent(WrappedComponent);
 -HOC------------
 |   component  |
  ---------------
-> 감싸주는 것은 App.js에서 
*/

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../_actions/userAction';

export default function (SpecificComponent, option) {
	// option - null, true, false
	// null - 아무나 출입이 가능한 페이지
	// true - 로그인한 유저만 출입이 가능한 페이지
	// false - 로그인한 유저는 출입 불가능한 페이지

	function AuthenticationCheck(props) {
		// 백엔드에 request 를 날려서 현재 상태를 가져옴(로그인을 했는지, 아닌지)
		const dispatch = useDispatch();
		const navigate = useNavigate();

		useEffect(() => {
			dispatch(authUser()).then((response) => {
				console.log(response);
				console.log(response.payload.isAuth);

				// 로그인하지 않은 상태
				if (!response.payload.isAuth) {
					// 로그인 하지 않은 상태에서 로그인한 유저만 출입 가능한 페이지로 들어가려고 할 때

					if (option) {
						navigate('/');
					}
				} else {
					// 로그인한 유저가 출입 불가능한 페이지에 들어가려고 할 때
					if (option === false) navigate('/');
				}
			});
		}, []);

		return <SpecificComponent />;
	}

	return AuthenticationCheck;
}
