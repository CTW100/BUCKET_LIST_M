import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Main from './pages/Main';
import Bucket from './pages/Bucket';

function App() {
	return (
		<Router>
			<Navigation />
			<Routes>
				<Route path='/' exact element={<Main />} />
				<Route path='/new' exact element={<Bucket />} />
			</Routes>
		</Router>
	);
}

export default App;
