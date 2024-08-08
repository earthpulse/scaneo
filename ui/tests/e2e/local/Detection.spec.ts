import { AnnotationLayerKeys, GeojsonPropertiesKeys } from '$lib/types/types';
import { frontRouteUtils } from '$lib/utils/routeUtils/frontRoute';
import { imageNames, type TestImageNames } from '$tests/mockValues';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto(frontRouteUtils.home);
});

const detectionImage1 = (imageNames as TestImageNames).detection[0]!;
const { tasks: tasksKey } = GeojsonPropertiesKeys;

test.describe('Given an undetected image "detection1.tif" and a label "Glacier" are present to be loaded', () => {
	test.describe('When the Home page is open', () => {
		test('When we save a defined area, it persists, and when we delete it, that persists too', async ({
			page
		}) => {
			const imageButton = page.getByRole('button', { name: detectionImage1 });
			await imageButton.click();

			const detectionToolButton = page.getByLabel('Detection', { exact: true });
			await detectionToolButton.click();

			const drawStart = await page.$('#map > .map-viewport');
			const drawEnd = await page.$('#map');
			const startBoundingBox = await drawStart?.boundingBox();
			const endBoundingBox = await drawEnd?.boundingBox();

			const numberOfRectangles = 1;

			if (startBoundingBox && endBoundingBox) {
				await page.mouse.move(
					startBoundingBox.x - 100 + startBoundingBox.width / 2,
					startBoundingBox.y - 100 + startBoundingBox.height / 2,
					{ steps: numberOfRectangles }
				);
				await page.mouse.down();
				await page.mouse.move(
					endBoundingBox.x + endBoundingBox.width / 2,
					endBoundingBox.y + endBoundingBox.height / 2,
					{ steps: numberOfRectangles }
				);
				await page.mouse.up();
			}

			const saveButton = page.getByRole('button', { name: 'Save' });
			await saveButton.click();

			const userFeedback = page.getByText('Saved!');
			await expect(userFeedback).toBeVisible();

			await page.reload({ waitUntil: 'load' });

			const responsePromise = page.waitForResponse(
				`http://localhost:8000/geojson/${detectionImage1}`
			);
			await imageButton.click();
			await detectionToolButton.click();

			const response = await responsePromise;
			const body = await response.json();
			const tasks = body.features.filter((feature: any) =>
				feature.properties?.[tasksKey].includes(AnnotationLayerKeys.detection)
			);
			expect(tasks.length).toBe(numberOfRectangles);

			const trashButton = page.locator('.leaflet-draw-edit-remove');
			await trashButton.click();

			const clearButton = page.getByRole('link', { name: 'Clear All' });
			await clearButton.click();

			await saveButton.click();
			await expect(userFeedback).toBeVisible();
			await page.reload({ waitUntil: 'load' });

			const secondResponsePromise = page.waitForResponse(
				`http://localhost:8000/geojson/${detectionImage1}`
			);
			await imageButton.click();

			const secondResponse = await secondResponsePromise;
			const secondBody = await secondResponse.json();
			const secondTasks = secondBody.features.filter((feature: any) =>
				feature.properties?.[tasksKey].includes(AnnotationLayerKeys.detection)
			);
			expect(secondTasks.length).toBe(0);
		});
	});
});
