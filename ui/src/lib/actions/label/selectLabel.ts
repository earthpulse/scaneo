import type { Label } from '$lib/types/types';
import { currentLabelStore } from '$stores/Overlay/label';
import showSamPromptsOnlyForCurrentLabel from '../sam/showSamPromptsOnlyForCurrentLabel';

export const selectLabel = (label: Label) => {
	const currentLabelName = currentLabelStore.retrieve().name;
	if (currentLabelName === label.name) return;

	currentLabelStore.store(label);

	showSamPromptsOnlyForCurrentLabel();
};
