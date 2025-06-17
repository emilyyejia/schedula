const BASE_URL = '/api/teachers';

export async function getTeachers() {
    const res = await fetch(BASE_URL);
    if(res.ok) {
        return res.json();
    }
}