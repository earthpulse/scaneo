import { frontRouteUtils } from '$lib/utils/routeUtils/frontRoute';
import { imageNames, labelNames } from '$tests/mockValues';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto(frontRouteUtils.home);
});

const classificationImage1 = imageNames.classification[0]!;

test.describe('Given an unclassified image "classification1.tif" and a label "Glacier" are present to be loaded', () => {
	test.describe('When the Home page is open', () => {
		test('Then the image should be selectable, classified with persistance, the user should be notified, the classification undone, and that persist too', async ({
			page
		}) => {
			const classificationTag = page.getByLabel(`${labelNames.existing} classification tag`);
			await expect(classificationTag).not.toBeVisible();

			const imageButton = page.getByRole('button', { name: classificationImage1 });
			await imageButton.click();

			const classificationToolButton = page.getByLabel('Classification', { exact: true });
			await classificationToolButton.click();

			const glacierButton = page.getByRole('button', { name: 'Glacier' });
			await glacierButton.click();

			await expect(classificationTag).toBeVisible();

			const saveButton = page.getByRole('button', { name: 'Save' });
			await saveButton.click();

			const userFeedback = page.getByText('Saved!');
			await expect(userFeedback).toBeVisible();

			await page.reload({ waitUntil: 'networkidle' });

			await imageButton.click();
			await classificationTag.waitFor({ state: 'attached' });

			await classificationToolButton.click();
			await glacierButton.click();
			await saveButton.click();

			await expect(classificationTag).not.toBeVisible();

			await expect(userFeedback).toBeVisible();
		});
	});
});
