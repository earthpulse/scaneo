import { AnnotationLayerKeys, GeojsonPropertiesKeys } from '$lib/types/types';
import { backRouteUtils } from '$lib/utils/routeUtils/backRoute';
import { frontRouteUtils } from '$lib/utils/routeUtils/frontRoute';
import { imageNames } from '$tests/mockValues';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto(frontRouteUtils.home);
});

const segmentationImage1 = imageNames.segmentation[0]!;
const segmentationImage2 = imageNames.segmentation[1]!;
const segmentationImage3 = imageNames.segmentation[2]!;

const { defaultUrl, geojsonEndpoint } = backRouteUtils;
const backendGeojsonEndpoint = `${defaultUrl}${geojsonEndpoint}`;
const { tasks: tasksKey } = GeojsonPropertiesKeys;

test.describe('Given an unsegmented image "segmentation1.tif" and a label "Glacier" are present to be loaded', () => {
	test.describe('When the Home page is open', () => {
		test('Then the segmentation can`t be saved until an area has been defined', async ({
			page
		}) => {
			const imageButton = page.getByRole('button', { name: segmentationImage1 });
			await imageButton.click();

			const segmentationToolButton = page.getByLabel('Segmentation', { exact: true });
			await segmentationToolButton.click();

			const saveButton = page.getByRole('button', { name: 'Save' });
			expect(saveButton).toBeDisabled();

			const drawStart = await page.$('#map > .map-viewport');
			const drawEnd = await page.$('#map');
			const startBoundingBox = await drawStart?.boundingBox();
			const endBoundingBox = await drawEnd?.boundingBox();

			if (startBoundingBox && endBoundingBox) {
				await page.mouse.move(
					startBoundingBox.x + startBoundingBox.width / 2,
					startBoundingBox.y + startBoundingBox.height / 2,
					{ steps: 5 }
				);
				await page.mouse.down();
				await page.mouse.move(
					endBoundingBox.x + endBoundingBox.width / 2,
					endBoundingBox.y + endBoundingBox.height / 2,
					{ steps: 5 }
				);
				await page.mouse.up();
			}

			await expect(saveButton).toBeEnabled();
		});

		test('When an area has been defined and we change tools, we are prompted to save', async ({
			page
		}) => {
			const imageButton = page.getByRole('button', { name: segmentationImage2 });
			await imageButton.click();

			const segmentationToolButton = page.getByLabel('Segmentation', { exact: true });
			await segmentationToolButton.click();

			const drawStart = await page.$('#map > .map-viewport');
			const drawEnd = await page.$('#map');
			const startBoundingBox = await drawStart?.boundingBox();
			const endBoundingBox = await drawEnd?.boundingBox();

			if (startBoundingBox && endBoundingBox) {
				await page.mouse.move(
					startBoundingBox.x + startBoundingBox.width / 2,
					startBoundingBox.y + startBoundingBox.height / 2,
					{ steps: 5 }
				);
				await page.mouse.down();
				await page.mouse.move(
					endBoundingBox.x + endBoundingBox.width / 2,
					endBoundingBox.y + endBoundingBox.height / 2,
					{ steps: 5 }
				);
				await page.mouse.up();
			}

			let promptedToSave = false;
			page.on('dialog', (dialog) => {
				dialog.dismiss();
				promptedToSave = true;
			});

			const detectionToolButton = page.getByLabel('Detection');
			await detectionToolButton.click();

			expect(promptedToSave).toBe(true);
		});

		test('When we save a defined area, it persists, and when we delete it, that persists too', async ({
			page
		}) => {
			const imageButton = page.getByRole('button', { name: segmentationImage3 });
			await imageButton.click();

			const segmentationToolButton = page.getByLabel('Segmentation', { exact: true });
			await segmentationToolButton.click();

			const drawStart = await page.$('#map > .map-viewport');
			const drawEnd = await page.$('#map');
			const startBoundingBox = await drawStart?.boundingBox();
			const endBoundingBox = await drawEnd?.boundingBox();

			if (startBoundingBox && endBoundingBox) {
				await page.mouse.move(
					startBoundingBox.x + startBoundingBox.width / 2,
					startBoundingBox.y + startBoundingBox.height / 2,
					{ steps: 5 }
				);
				await page.mouse.down();
				await page.mouse.move(
					endBoundingBox.x + endBoundingBox.width / 2,
					endBoundingBox.y + endBoundingBox.height / 2,
					{ steps: 5 }
				);
				await page.mouse.up();
			}

			const saveButton = page.getByRole('button', { name: 'Save' });
			await saveButton.click();

			const userFeedback = page.getByText('Saved!');
			await expect(userFeedback).toBeVisible();

			await page.reload({ waitUntil: 'load' });

			const responsePromise = page.waitForResponse(
				`${backendGeojsonEndpoint}/${segmentationImage3}`
			);
			await imageButton.click();
			await segmentationToolButton.click();

			const response = await responsePromise;
			const body = await response.json();
			const tasks = body.features.filter((feature: any) =>
				feature.properties?.[tasksKey].includes(AnnotationLayerKeys.segmentation)
			);
			expect(tasks.length).toBe(1);

			const trashButton = page.locator('.leaflet-control-paintpolygon-icon-trash');

			await trashButton.click();

			await saveButton.click();
			await expect(userFeedback).toBeVisible();
			await page.reload({ waitUntil: 'load' });

			const secondResponsePromise = page.waitForResponse(
				`${backendGeojsonEndpoint}/${segmentationImage3}`
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
