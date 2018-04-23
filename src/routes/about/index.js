import { h, Component } from 'preact';

import style from './style';

class About extends Component {

	render() {
		return (
			<div class={`oir_route_content`}>
				<h1>About Us</h1>
				<p>
					We are proud to offer tutoring in the Irish language to areas which have been sparsely served in the past. 
					Our aim is to treat every learner as an individual and to adjust to different styles of learning in a way that Duolingo, forums, and language books cannot do. 
					We also hope to connect learners with the broader Irish language community, whether it’s at home or abroad. 
					<br />
					<br />
					We are currently based out of Calgary, Alberta (Canada) and have all fostered a strong interest in the Irish language. 
					We have learned the language through years of self-driven study, the aid of resources such as Duolingo 
					and books such as Mícheál Ó Siadhail’s Learning Irish (which we highly recommend). 
					We hope to save our learners this monumental effort by teaching them what we’ve already learned ourselves.
				</p>
			</div>
		);
	}
}

export default About;