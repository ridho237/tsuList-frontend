const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

/**
 * Register a new user with profile image
 */
export async function registerUser(
	username: string,
	email: string,
	password: string,
	imageFile?: File
) {
	const formData = new FormData();
	formData.append('username', username);
	formData.append('email', email);
	formData.append('password', password);

	if (imageFile) {
		formData.append('profileImage', imageFile);
	}

	const response = await fetch(`${API_URL}/signup`, {
		method: 'POST',
		body: formData,
	});

	let data;
	try {
		data = await response.json();
	} catch {
		throw new Error('Invalid server response');
	}

	if (!response.ok) {
		throw new Error(data.message || 'Registration failed');
	}

	return data;
}

/**
 * Login user
 */
export async function loginUser(username: string, password: string) {
	const response = await fetch(`${API_URL}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify({ username, password }),
	});

	let data;

	try {
		data = await response.json();
	} catch {
		throw new Error('Invalid server response');
	}

	if (!response.ok) {
		throw new Error(data.message || 'Login failed');
	}

	return data;
}

/**
 * Logout user
 */
export async function logoutUser() {
	const response = await fetch(`${API_URL}/logout`, {
		method: 'POST',
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Failed to logout');
	}

	localStorage.removeItem('user');
	sessionStorage.removeItem('user');
}

/**
 * Check if user is authenticated
 */
export async function checkAuth() {
	try {
		const response = await fetch(`${API_URL}/profile`, {
			method: 'GET',
			credentials: 'include',
		});

		if (!response.ok) return false;

		const data = await response.json();
		return data;
	} catch {
		return false;
	}
}

/**
 * Upload image and return URL
 */
export async function uploadImage(file: File): Promise<string> {
	const formData = new FormData();
	formData.append('file', file);

	const response = await fetch(`${API_URL}/upload`, {
		method: 'POST',
		body: formData,
	});

	let data;
	try {
		data = await response.json();
	} catch {
		throw new Error('Invalid server response');
	}

	if (!response.ok) {
		throw new Error(data.message || 'Failed to upload image');
	}

	return data.imageUrl;
}

/**
 * Fetch user profile
 */
export async function getProfile() {
	try {
		const response = await fetch(`${API_URL}/profile`, {
			method: 'GET',
			credentials: 'include',
		});

		if (!response.ok) {
			throw new Error('Failed to fetch profile');
		}

		const data = await response.json();
		return data;
	} catch {
		return null;
	}
}
