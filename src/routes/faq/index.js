import { h, Component } from 'preact';

import style from './style';

class Faq extends Component {

	render() {
		return (
			<div class={`oir_route_content`}>
				<h1>Faq</h1>
				<h2>Do I learn online?</h2>
				<p>
					No, our learning is done mostly via email one-on-one with a tutor. We have a series of worksheets that adapt to our learner’s needs.
				</p>
				<h2>Why don't I just learn on an app like DuoLingo?</h2>
				<p>
					Online apps are a great supplementary resource for learning and we strongly suggest using them, but can be unhelpful if any difficulties are encountered. 
					Through tutoring we can adapt to compensate for this and provide a deeper understanding of the language.
				</p>
				<h2>How often will I recieve personalized lessons?</h2>
				<p>
					We find lessons on a weekly basis work the best, but different arrangements can be established based on your availability and that of our tutors.
				</p>
				<h2>Will I have a tutor I can contact?</h2>
				<p>
					Yes, your tutor should be available via email to answer any and all questions you might have.
				</p>
				<h2>How much does it cost?</h2>
				<p>
					Our primary goal is to help foster interest in Irish and keep the language alive, all payment is appreciated but we ask only that you pay what you can on a per lesson or weekly basis.
				</p>
				<h2>Are your lessons only available in English?</h2>
				<p>
					Currently English is our only language offered (aside from Irish, of course). Our aim is to be able to teach as many interested as possible, and if there is enough demand we would be happy to expand and offer tutoring in other languages.
				</p>
				<h2>Where are you located?</h2>
				<p>
					We are based out of Calgary, AB, Canada, but have students from around the world.
				</p>
			</div>
		);
	}
}

export default Faq;