import sendRequest from "./sendRequest";

const BASE_URL = '/api/appointments';

export async function index(startDate, teacherId) {
const params = new URLSearchParams({ date: startDate, teacherId });
  return sendRequest(`${BASE_URL}?${params.toString()}`, 'GET');
}

export async function create(appointmentData) {
  return sendRequest(BASE_URL, 'POST', appointmentData );

}

export async function remove(appointmentId) {
  return sendRequest(BASE_URL, 'DELETE', {appointmentId});
}