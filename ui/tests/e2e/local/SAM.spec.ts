import { AnnotationLayerKeys, GeojsonPropertiesKeys } from '$lib/types/types';
import { frontRouteUtils } from '$lib/utils/routeUtils/frontRoute';
import { imageNames } from '$tests/mockValues';
import { expect, test } from '@playwright/test';
import { map } from 'leaflet';

test.beforeEach(async ({ page }) => {
	await page.goto(frontRouteUtils.home);
});

const samImage1 = imageNames.sam[0]!;
const samImage2 = imageNames.sam[1]!;
const { tasks: tasksKey } = GeojsonPropertiesKeys;

test.describe('Given an unprompted image "sam1.tif" and a label "Glacier" are present to be loaded', () => {
	test.describe('When the Home page is open', () => {
		test('When we save a prompt, it persists, and when we delete it, that persists too', async ({
			page
		}) => {
			const imageButton = page.getByRole('button', { name: samImage1 });
			await imageButton.click();

			const samToolButton = page.getByLabel('SAM', { exact: true });
			await samToolButton.click();

			const mapCenter = await page.$('#map > .map-viewport');
			const mapBoundingBox = await mapCenter?.boundingBox();
			if (mapBoundingBox) {
				await page.mouse.move(mapBoundingBox.x, mapBoundingBox.y, { steps: 1 });
				await page.mouse.down();
				await page.mouse.up();
			}

			const saveButton = page.getByRole('button', { name: 'Save' });
			await saveButton.click();

			const userFeedback = page.getByText('Saved!');
			await expect(userFeedback).toBeVisible();

			await page.reload({ waitUntil: 'load' });

			const responsePromise = page.waitForResponse(`http://localhost:8000/geojson/${samImage1}`);
			await imageButton.click();
			await samToolButton.click();

			const response = await responsePromise;
			const body = await response.json();
			const tasks = body.features.filter((feature: any) =>
				feature.properties?.[tasksKey].includes(AnnotationLayerKeys.prompts)
			);
			expect(tasks.length).toBe(1);

			const trashButton = page.getByRole('link', { name: 'Delete layers' });
			await trashButton.click();

			const clearButton = page.getByRole('link', { name: 'Clear All' });
			await clearButton.click();

			await saveButton.click();
			await expect(userFeedback).toBeVisible();
			await page.reload({ waitUntil: 'load' });

			const secondResponsePromise = page.waitForResponse(
				`http://localhost:8000/geojson/${samImage1}`
			);
			await imageButton.click();

			const secondResponse = await secondResponsePromise;
			const secondBody = await secondResponse.json();
			const secondTasks = secondBody.features.filter((feature: any) =>
				feature.properties?.[tasksKey].includes(AnnotationLayerKeys.prompts)
			);

			expect(secondTasks.length).toBe(0);
		});

		test('When we add a background marker, it shows as background, and it persists as background too', async ({
			page
		}) => {
			const imageButton = page.getByRole('button', { name: samImage2 });
			await imageButton.click();

			const samToolButton = page.getByLabel('SAM', { exact: true });
			await samToolButton.click();

			const backgroundMarker = page.locator('.background-marker');

			await page.keyboard.down('Control');

			const mapCenter = await page.$('#map > .map-viewport');
			const mapBoundingBox = await mapCenter?.boundingBox();
			if (mapBoundingBox) {
				await page.mouse.move(mapBoundingBox.x, mapBoundingBox.y, { steps: 1 });
				await page.mouse.down();
				await page.mouse.up();
			}

			await page.keyboard.up('Control');

			await expect(backgroundMarker).toBeVisible();

			const saveButton = page.getByRole('button', { name: 'Save' });
			await saveButton.click();

			const userFeedback = page.getByText('Saved!');
			await expect(userFeedback).toBeVisible();

			await page.reload({ waitUntil: 'load' });

			const responsePromise = page.waitForResponse(`http://localhost:8000/geojson/${samImage2}`);
			await imageButton.click();
			await samToolButton.click();

			const response = await responsePromise;
			const body = await response.json();
			const tasks = body.features.filter((feature: any) =>
				feature.properties?.[tasksKey].includes(AnnotationLayerKeys.prompts)
			);
			expect(tasks.length).toBe(1);
			await expect(backgroundMarker).toBeVisible();

			const trashButton = page.getByRole('link', { name: 'Delete layers' });
			await trashButton.click();

			const clearButton = page.getByRole('link', { name: 'Clear All' });
			await clearButton.click();

			await saveButton.click();
			await expect(userFeedback).toBeVisible();
			await page.reload({ waitUntil: 'load' });

			const secondResponsePromise = page.waitForResponse(
				`http://localhost:8000/geojson/${samImage2}`
			);
			await imageButton.click();

			const secondResponse = await secondResponsePromise;
			const secondBody = await secondResponse.json();
			const secondTasks = secondBody.features.filter((feature: any) =>
				feature.properties?.[tasksKey].includes(AnnotationLayerKeys.prompts)
			);

			expect(secondTasks.length).toBe(0);
			await expect(backgroundMarker).not.toBeVisible();
		});
	});
});
