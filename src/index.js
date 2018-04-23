import './style';
import { Provider } from 'preact-redux';

import './assets/propeller';
import './assets/polyfills';

import store from './redux/store';

import App from './components/app';

export default () => (

	<div id="outer">
		<Provider store={store}>
			<App />
		</Provider>
	</div>
);