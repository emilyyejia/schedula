import sendRequest from "./sendRequest";

const BASE_URL = '/api/sessions';

export async function index() {
  return sendRequest(BASE_URL, 'GET');
}
