import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import isBrowser from '~/utils/is-browser';
import myCookie from '~/utils/my-cookie';

import * as apiActions from './actions';


const instance: AxiosInstance = axios.create({
    baseURL: '/api',
    maxRedirects: 1,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

let list_of_requests = 0;

function loaderStart() {
    if (isBrowser()) {
        (window as any).$nuxt && (window as any).$nuxt.$loading.start();
        list_of_requests++;
    }
}
function loaderFinish() {
    if (isBrowser()) {
        list_of_requests--;
        if (list_of_requests < 1) {
            (window as any).$nuxt && (window as any).$nuxt.$loading.finish();
            list_of_requests = 0;
        }
    }
}

let _token = '';

instance.interceptors.request.use(config => {
    if (!_token) {
        _token = myCookie('_tkn_') || '';
    }
    if (_token) {
        const method = config.method as any;
        config.headers[method]['Authorization'] = _token;
    }
    loaderStart();

    return config;
});

instance.interceptors.response.use(
    (response): AxiosResponse | Promise<AxiosResponse['data']> => {
        loaderFinish();
        return response;
    },
    error => {
        loaderFinish();

        // Do something with response error
        if (
            error.response &&
            error.response.data &&
            error.response.data.location
        ) {
            window.location = error.response.data.location;
        }

        // const request = error.request;
        const response = error.response;
        const no_warning = error.config.headers._no_warning_;

        // show error message
        if (!(response.status < 300) && !no_warning) {
            let text = '';
            // const contentType = response.headers['content-type'];

            // contentType && contentType.includes('application/json') &&
            if (response.data.message) {
                text = response.data.message;

                if (response.data.errors) {
                    text += '<br>';
                    for (const k in response.data.errors) {
                        if (response.data.errors.hasOwnProperty(k)) {
                            const arr = response.data.errors[k];
                            text += '<br>' + arr.join('<br>');
                        }
                    }
                }
            }

            // swal(response.statusText, text, 'error');
        }

        // return error;
        return Promise.reject(error);
    }
);

/**
 * Api object
 */
export default {
    ...apiActions.auth(instance),
    ...apiActions.user(instance),
    ...apiActions.posts(instance)
};
