import { h, Component } from 'preact';

import style from './style';

class Info extends Component {

	render() {
		return (
			<div class={`oir_route_content`}>
				<h1>Why Irish?</h1>
				<p>
					For many, learning Irish comes from an interest in their history or heritage, but may stumble across the language independently. 
					Irish boasts the oldest non-Latin literature in all of Western Europe and has fascinated historians by providing a direct link to antiquity. 
					The rich history, literature, and poetry produced in Irish is the source of Ireland’s nickname “the Island of Saints & Scholars”.
					<br />
					<br />
					Fallen far from its status as the primary language of Ireland in the 18th century, it lost a lot of ground from English repression, emigration, and famine and dwindled to the point of near-extinction. 
					Interest in reviving the use of the language peaked in the beginning of the 20th century, coinciding with a growing drive for independence – all the main political parties and offices in Ireland carry an Irish name. 
					Currently the language is the de facto first language of the Republic and various efforts to bolster speaking numbers have been underway since independence with mixed success.
				</p>
			</div>
		);
	}
}

export default Info;