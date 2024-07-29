import { MeasurementPayloadType } from '@/types';
import { HTTP_METHODS } from '@/utils/constants';
import { apiRequest } from '@/utils/helper/apiHelper';

const API_REQUESTS = {
  GET_MEAUREMENTS: {
    path: '/measurements/geocode',
    method: HTTP_METHODS.POST,
  },
  CREATE_MEAUREMENTS: {
    path: '/measurements',
    method: HTTP_METHODS.POST,
  },
  GET_ALL_MEAUREMENTS: {
    path: '/measurements',
    method: HTTP_METHODS.GET,
  }
};

const MeasurementApi = {
  getMeaurements: (body: MeasurementPayloadType): Promise<any> => {
    return apiRequest('POST', API_REQUESTS.GET_MEAUREMENTS.path, body);
  },
  addMeaurements: (body: MeasurementPayloadType): Promise<any> => {
    return apiRequest('POST', API_REQUESTS.CREATE_MEAUREMENTS.path, body);
  },
  getAllMeaurements: (): Promise<any> => {
    return apiRequest('GET', API_REQUESTS.GET_ALL_MEAUREMENTS.path);
  },
};

export { MeasurementApi };
