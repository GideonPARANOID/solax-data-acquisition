import Axios from 'axios';
import axiosHook, { configure } from 'axios-hooks';

import * as config from './config';

export const axios = Axios.create({
  baseURL: config.baseURL,
})

configure({ axios });

export const useAxios = axiosHook;
