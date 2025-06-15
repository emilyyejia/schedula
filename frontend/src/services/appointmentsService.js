import sendRequest from "./sendRequest";

const BASE_URL = '/api/appointments';

export async function index(startDate, teacherId) {
const params = new URLSearchParams({ date: startDate});
  return sendRequest(`${BASE_URL}/${teacherId}?${params.toString()}`, 'GET');
}

export async function create(appointmentData) {
  return sendRequest(BASE_URL, 'POST', appointmentData );

}

export async function remove(appointmentId) {
  return sendRequest(BASE_URL, 'DELETE', {appointmentId});
}

export async function update(appointmentData) {
  return sendRequest(BASE_URL, 'PUT', appointmentData);
}

export async function getTeachers () {
  return sendRequest(BASE_URL, 'GET');
}

export async function allAppointments (today) {
  const params = new URLSearchParams({date: today});
  return sendRequest(`${BASE_URL}/all?${params.toString()}`, 'GET');
}