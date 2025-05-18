import { useEffect } from "react";

type NuiEvent<T = any> = {
	type: string;
} & T;

/**
 * useNuiEvent - Listens for a NUI message and triggers a callback
 * @param eventName - The event name to listen for
 * @param callback - The function to call when the event is received
 */
export const useNuiEvent = <T = any>(
	eventName: string,
	callback: (data: T) => void
) => {
	useEffect(() => {
		const handleMessage = (event: MessageEvent<NuiEvent<T>>) => {
			if (event.data?.type === eventName) {
				// Directly pass the full data object
				callback(event.data);
			}
		};

		window.addEventListener("message", handleMessage);
		return () => {
			window.removeEventListener("message", handleMessage);
		};
	}, [eventName, callback]);
};



//end nui event

// fetch nui
export async function fetchNui<T = unknown>(
	eventName: string,
	data?: unknown,
	mockData?: T
): Promise<T> {
	const options = {
		method: "post",
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		},
		body: JSON.stringify(data),
	};

	const resourceName = (window as any).GetParentResourceName
		? (window as any).GetParentResourceName()
		: "nui-frame-app";

	const resp = await fetch(`https://${resourceName}/${eventName}`, options);

	const respFormatted = await resp.json();

	return respFormatted;
}

//  end fetch nui