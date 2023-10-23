export const ROOT = 'http://185.244.172.108:8081';
export const CREATE_ENTITY = '/v1/outlay-rows/entity/create';

const getEID = fetch(ROOT+CREATE_ENTITY);
const eID = 113726;
export const GET_ROWS = `/v1/outlay-rows/entity/${eID}/row/list`;
export const CREATY_ROW = `/v1/outlay-rows/entity/${eID}/row/create`;
export const UPDATE_ROW = (rID:number) => `/v1/outlay-rows/entity/${eID}/row/${rID}/update`;
export const DELETE_ROW = (rID:number) => `/v1/outlay-rows/entity/${eID}/row/${rID}/delete`;