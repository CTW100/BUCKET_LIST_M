import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Main from './pages/Main';
import Bucket from './pages/Bucket';
import Detail from './pages/Detail';
import Register from './pages/Register';
import Login from './pages/Login';
import Auth from './hoc/auth';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import reducer from './_reducers';
const createStoreWithMiddleware = applyMiddleware(
	promiseMiddleware,
	ReduxThunk
)(createStore);

function App() {
	return (
		<Provider store={createStoreWithMiddleware(reducer)}>
			<Router>
				<Navigation />
				<Routes>
					<Route path='/' exact element={Auth(Main, null)} />
					<Route path='/new' exact element={Auth(Bucket, true)} />
					<Route
						path='/buckets/:bucketID'
						exact
						element={Auth(Detail, true)}
					/>
					<Route
						path='/user/register'
						exact
						element={Auth(Register, false)}
					/>
					<Route
						path='/user/login'
						exact
						element={Auth(Login, false)}
					/>
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
