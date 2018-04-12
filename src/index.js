import './style';
import { Provider } from 'preact-redux';
import './propeller';

import store from './store';

import App from './components/app';

export default () => (
	<div id="outer">
		<Provider store={store}>
			<App />
		</Provider>
	</div>
);