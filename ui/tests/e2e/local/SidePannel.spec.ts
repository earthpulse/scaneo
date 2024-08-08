import { frontRouteUtils } from '$lib/utils/routeUtils/frontRoute';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto(frontRouteUtils.home);
});

test.describe('Given a "Side Pannel" overlay', () => {
	test.describe('When has been loaded', () => {
		test('Then the "Quick Selection" heading should be seen', async ({ page }) => {
			const quickSelectionHeading = page.getByRole('heading', { name: 'Quick Selection' });

			await expect(quickSelectionHeading).toBeInViewport();
		});

		test('Then the "New Label" component should be seen', async ({ page }) => {
			const newLabelComponent = page.getByPlaceholder('New label');

			await expect(newLabelComponent).toBeInViewport();
		});

		test('Then the "Label Selector" component should be seen', async ({ page }) => {
			const labelSelectorlComponent = page.getByLabel('Label Selector');

			await expect(labelSelectorlComponent).toBeInViewport();
		});

		test('Then "Quick Selection", "Classification", "Segmentation", "Detection", "SAM" and "Options" tool buttons should be seen', async ({
			page
		}) => {
			const modeButtonLabels = [
				'Quick Selection',
				'Classification',
				'Segmentation',
				'Detection',
				'SAM',
				'Options'
			];

			for (const label of modeButtonLabels) {
				const button = page.getByLabel(label, { exact: true });
				await expect(button).toBeVisible();
			}
		});

		test('Then a disabled "Save" button should be seen', async ({ page }) => {
			const saveButton = page.getByRole('button', { name: 'Save' });

			await expect(saveButton).toBeDisabled();
		});

		test('Then an "Image Selector" component should be present', async ({ page }) => {
			const imageSelector = page.getByLabel('Image Selector');

			await expect(imageSelector).toBeVisible();
		});
	});
});
