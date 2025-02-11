let intersectionObserver;

function initializeIntersectionObserver() {
	intersectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const eventName = entry.isIntersecting ? 'enterViewport' : 'exitViewport';
			entry.target.dispatchEvent(new CustomEvent(eventName));
		});
	});
}

export default function viewport(element) {
	if (!intersectionObserver) initializeIntersectionObserver();

	intersectionObserver.observe(element);

	return {
		destroy() {
			intersectionObserver.unobserve(element);
		}
	};
}
