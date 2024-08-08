import type { Label, Labels } from '$lib/types/types';
import { labelsStore } from '$stores/Overlay/label';
import { labelNoColor, labelWithColor } from '$tests/mockValues';
import { get, type Readable } from 'svelte/store';
import { describe, expect } from 'vitest';

describe('Given a labels store', () => {
	describe('When we call its method addLabel with a label with name and color properties', () => {
		test('Then it should contain said label', () => {
			labelsStore.add(labelWithColor);

			expect(get(labelsStore as Readable<Labels>)).toContainEqual(labelWithColor);
		});

		test('Then it should produce the label it stores when its method retrieve is called', () => {
			expect(labelsStore.retrieve()).toContainEqual(labelWithColor);
		});
	});

	describe('When we call its method addLabel with a label with only a name property', () => {
		test('Then it should assign a random hexadecimal color to the label', () => {
			labelsStore.add(labelNoColor);

			const randomHexadecimalColor = labelsStore
				.retrieve()
				.find((label) => label.name === labelNoColor.name)?.color;

			expect(randomHexadecimalColor).toMatch(/^#[0-9a-f]{6}$/i);
		});
	});

	describe('When we add a thousand labels with only name properties', () => {
		test('Then it should assign unique colors to each label', () => {
			for (let i = 0; i < 1000; i++) {
				labelsStore.add({ name: `label ${i}` });
			}

			const randomColors = labelsStore.retrieve().map((label) => label.color);
			const uniqueRandomColors = [...new Set(randomColors)];

			expect(randomColors).toEqual(uniqueRandomColors);
		});
	});
});
