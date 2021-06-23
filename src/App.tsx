import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				{/* DEFINING THE ROUTES */}
				{/* The "exact" prop means that the route only will be displayed if the route is exact "/" */}
				<Route path="/" exact component={Home} /> 
				<Route path="/rooms/new" component={NewRoom} />
			</AuthContextProvider>
		</BrowserRouter>
  	);
}

export default App;