import { frontRouteUtils } from '$lib/utils/routeUtils/frontRoute';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto(frontRouteUtils.home);
});

test.describe('Given a "Tool Selector" bar', () => {
	test.describe('When its buttons are clicked', () => {
		test('Then the appropiate tool should be selected', async ({ page }) => {
			const modeButtonLabels = [
				'Quick Selection',
				'Classification',
				'Segmentation',
				'Detection',
				'SAM'
			];

			for (const label of modeButtonLabels) {
				const toolHeading = page.getByRole('heading', { name: label });
				await page.getByLabel(label, { exact: true }).click();

				await expect(toolHeading).toBeInViewport();
			}
		});
	});
});
