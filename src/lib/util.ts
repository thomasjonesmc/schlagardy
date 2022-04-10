export async function post(endpoint: string, data: unknown = {}) {
	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
}

export async function get(endpoint: string) {
	return fetch(endpoint, {
		method: 'GET',
		credentials: 'include'
	}).then((r) => r.json());
}

export function date(dateString: string): string {
	return new Date(dateString).toLocaleDateString();
}

export function time(dateString: string): string {
	return new Date(dateString).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}

export function dateTime(dateString: string): string {
	return new Date(dateString).toLocaleDateString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}

export function capitalize(str: string): string {
	const [ first, ...rest ] = str;

	return first.toUpperCase() + rest.join("");
}