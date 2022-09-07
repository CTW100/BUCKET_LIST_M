import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Main from './pages/Main';
import Bucket from './pages/Bucket';
import Detail from './pages/Detail';

function App() {
	return (
		<Router>
			<Navigation />
			<Routes>
				<Route path='/' exact element={<Main />} />
				<Route path='/new' exact element={<Bucket />} />
				<Route path='/buckets/:bucketID' exact element={<Detail />} />
			</Routes>
		</Router>
	);
}

export default App;
