import type { Label } from '$lib/types/types';

export const labelWithColor: Label = {
	name: 'swamp',
	color: '#748500'
};

export const labelNoColor: Label = {
	name: 'mud'
};

export const imageNames = {
	classification: ['classification1.tif'],
	detection: ['detection1.tif'],
	images: ['images1.tif', 'images2.tif'],
	sam: ['sam1.tif', 'sam2.tif'],
	segmentation: ['segmentation1.tif', 'segmentation2.tif', 'segmentation3.tif']
};

export interface TestImageNames {
	existing: string;
	classification: string[];
	detection: string[];
	images: string[];
	sam: string[];
	segmentation: string[];
}

export const labelNames = {
	existing: 'Glacier',
	new: 'Martian'
};
