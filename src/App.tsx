import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/Room';

function App() {
	return (
		// DEFINING THE ROUTES
		<BrowserRouter>
			<AuthContextProvider>
				{/* The Switch component show only one route */}
				<Switch>
					{/* The "exact" prop means that the route only will be displayed if the route is exact "/" */}
					<Route path="/" exact component={Home} /> 
					<Route path="/rooms/new" component={NewRoom} />
					{/* Route w/ param */}
					<Route path="/rooms/:id" component={Room} />
				</Switch>
			</AuthContextProvider>
		</BrowserRouter>
  	);
}

export default App;