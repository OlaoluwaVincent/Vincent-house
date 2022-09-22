import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import IndexPage from './pages/IndexPage';
function App() {
	return (
		<>
			<BrowserRouter>
				<IndexPage />
			</BrowserRouter>
			<ToastContainer autoClose={3000} />
		</>
	);
}

export default App;
