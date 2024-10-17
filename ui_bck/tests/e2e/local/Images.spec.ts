import { backRouteUtils } from '$lib/utils/routeUtils/backRoute';
import { frontRouteUtils } from '$lib/utils/routeUtils/frontRoute';
import { imageNames } from '$tests/mockValues';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto(frontRouteUtils.home);
});

const { defaultUrl: url, imagesEndpoint } = backRouteUtils;
const backendImageEndpoint = `${url}${imagesEndpoint}`;
const image1 = imageNames.images[0]!;
const image2 = imageNames.images[1]!;

test.describe('Given an "Image Selector" section of the "Side Pannel" overlay', () => {
	test.describe('When there is an n number of images to be loaded', () => {
		test('Then its Pagination should read "1-n of n"', async ({ page }) => {
			const responsePromise = page.waitForResponse(backendImageEndpoint);
			const response = await responsePromise;
			const body = await response.json();
			const n = body.length;

			const expectedText = `1-${n} of ${n}`;

			const expectedPagination = page.getByText(expectedText);

			await expect(expectedPagination).toBeVisible();
		});

		test('Then it should display the loaded images as buttons', async ({ page }) => {
			const responsePromise = page.waitForResponse(backendImageEndpoint);
			const response = await responsePromise;
			const body = await response.json();

			const expectedImages = body.map((image: any) => image.name);

			for (const image of expectedImages) {
				const imageButton = page.getByRole('button', { name: image });

				await expect(imageButton).toBeVisible();
			}
		});
	});

	test.describe('When its "images1.tif" button is clicked', () => {
		test('Then the image should be requested to the backend', async ({ page }) => {
			const imagePromise = page.waitForRequest(`**/${image1}`);

			const expectedImage = page.getByRole('button', { name: image1 });
			expectedImage.click();
			const imageRequest = await imagePromise;

			expect(imageRequest.url()).toContain(image1);
		});

		test('Then the image tile should be added to the DOM', async ({ page }) => {
			const imageTile = page.getByLabel(`${image1} image layer`);

			const expectedImage = page.getByRole('button', { name: image1 });
			expectedImage.click();

			await imageTile.waitFor({ state: 'attached' });
		});
	});
});

test.describe("Given a loaded 'images2.tif', an 'Image Selector' section with too many images to show said image, and a filter input", () => {
	test.describe('When we type "images2" in the filter input', () => {
		test('Then "images2.tif" should show up as a button', async ({ page }) => {
			const filterInput = page.getByPlaceholder('Filter...');
			const expectedImage = page.getByRole('button', { name: image2 });

			await filterInput.fill(image2);

			await expect(expectedImage).toBeVisible();
		});
	});
});
