import axios from 'axios';
import axiosHook, { configure } from 'axios-hooks';

import * as config from './config';

configure({ axios: axios.create({ baseURL: config.baseURL }) });

export const useAxios = axiosHook;
