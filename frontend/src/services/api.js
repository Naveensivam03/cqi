export const API_BASE_URL = 'http://localhost:5000/api';

export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        return await response.json();
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: "Network error" };
    }
};

export const fetchCourseStructure = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/structure`);
        return await response.json();
    } catch (error) {
        console.error("Fetch structure error:", error);
        return {};
    }
};

export const fetchCourseDetails = async (filename) => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/${filename}`);
        return await response.json();
    } catch (error) {
        console.error("Fetch details error:", error);
        return null;
    }
};
