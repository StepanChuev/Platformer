'use strict';

const animation = ({render = () => {}, update = () => {}}) => {

	const tick = (timestamp) => {
		render(timestamp);
		update(timestamp);
		requestAnimationFrame(tick);
	};
	
	requestAnimationFrame(tick);
};