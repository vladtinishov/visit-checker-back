import { luxandAPI } from '../api';
import * as FormData from 'form-data';

export const faceDetectApi = {
  compareFace(formData: FormData) {
    return luxandAPI.post('/photo/similarity', formData).then(d => d.data);
  },
};
