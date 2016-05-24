import { IndexRoute, Router, Route } from 'react-router';
import App from 'site/app';
import Sites from 'site/sites';

export default function AppRouter(history) {
    return (
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Sites} />
            </Route>
        </Router>
    );
}
