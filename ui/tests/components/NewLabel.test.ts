import NewLabel from '$components/Overlay/NewLabel.svelte';
import { addLabel } from '$lib/actions/label/addLabel';
import { newLabelColorDefault, newLabelNameDefault } from '$lib/utils/hardcodedValues';
import { labelWithColor } from '$tests/mockValues';
import { fireEvent, render, screen } from '@testing-library/svelte';
import { expect, vi } from 'vitest';

vi.mock('$lib/actions/label/addLabel', () => {
	return {
		addLabel: vi.fn()
	};
});

let addNewLabelButton: HTMLElement;
let nameInput: HTMLInputElement;
let colorInput: HTMLInputElement;

beforeEach(() => {
	render(NewLabel);

	addNewLabelButton = screen.getByRole('button');
	nameInput = screen.getByRole('textbox');
	colorInput = screen.getByDisplayValue(newLabelColorDefault);
});

afterEach(() => {
	vi.clearAllMocks();
});

describe('Given a NewLabel component', () => {
	describe('When instantiated', () => {
		test('Then it mounts', () => {
			const { container } = render(NewLabel);
			expect(container).toBeTruthy();
		});
	});

	describe('When the form is submitted without a name for the new label', () => {
		test('Then it should not call the addLabel function', async () => {
			await fireEvent.click(addNewLabelButton);
			expect(addLabel).toHaveBeenCalledTimes(1);
			expect(addLabel).toHaveBeenCalledWith(newLabelNameDefault, newLabelColorDefault);
		});
	});

	describe('When the form is submitted with a new label name and a new color', () => {
		test('Then it should call the addLabel function with the new label name and a new color', async () => {
			await fireEvent.input(nameInput, { target: { value: labelWithColor.name } });
			await fireEvent.input(colorInput, { target: { value: labelWithColor.color } });

			expect(nameInput.value).toBe(labelWithColor.name);
			expect(colorInput.value).toBe(labelWithColor.color);

			await fireEvent.click(addNewLabelButton);

			expect(addLabel).toHaveBeenCalledTimes(1);
			expect(addLabel).toHaveBeenCalledWith(labelWithColor.name, labelWithColor.color);
		});
	});
});
