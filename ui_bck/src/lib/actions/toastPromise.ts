import type { ToastMessages } from '$lib/types/types';
import toast from 'svelte-french-toast';

const toastPromise = (
	promise: Promise<unknown>,
	errorMessage: string,
	toastMessages: ToastMessages
) => {
	const { loading, success } = toastMessages;

	toast.promise(promise, {
		loading,
		success,
		error: () => errorMessage
	});
};

export default toastPromise;
