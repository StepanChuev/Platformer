'use strict';

const cameraShiftX = (x, shiftFromCenter, displayWidth, fieldWidth) => {
	const center = displayWidth / 2;

	return center - x + shiftFromCenter;
};