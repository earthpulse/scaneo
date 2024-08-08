import { frontRouteUtils } from '$lib/utils/routeUtils/frontRoute';
import { labelNames } from '$tests/mockValues';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto(frontRouteUtils.home);
});

test.describe('Given the "New Label" and "Label Selector" components', () => {
	test.describe('When a label named "Glacier" is present to be loaded', () => {
		test('Then it is displayed by the "Label Selector" component', async ({ page }) => {
			const existingLabelButton = page.getByRole('button', { name: labelNames.existing });
			await page.goto(frontRouteUtils.home);

			await expect(existingLabelButton).toBeVisible();
		});
	});

	test.describe('When a label named "Martian" is added', () => {
		test('Then it is displayed and persists', async ({ page }) => {
			const newLabelComponent = page.getByPlaceholder('New label');
			const newLabelButton = page.getByRole('button', { name: labelNames.new });
			const loadedDataModalTitle = page.getByText('Loaded!');
			await expect(loadedDataModalTitle).toBeVisible();

			async function addNewLabel(newLabel: string) {
				await newLabelComponent.fill(newLabel);
				await page.getByPlaceholder('New label').press('Enter');
			}
			await addNewLabel(labelNames.new);
			await expect(newLabelButton).toBeVisible();

			await page.reload({ waitUntil: 'networkidle' });
			await expect(newLabelButton).toBeVisible();
		});
	});
});
