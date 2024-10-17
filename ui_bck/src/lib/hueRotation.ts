import type { ColorValueHex } from './types/types';
import * as convert from 'color-convert';

const hueRotation = (hexadecimalColor: ColorValueHex) => {
	const [h, s, l] = convert.hex.hsl(hexadecimalColor);

	const hBlueLeafletMarker = 206;
	let resultingH = h - hBlueLeafletMarker;

	if (resultingH < 0) resultingH += 360;

	return [resultingH, s, l];
};

export default hueRotation;
