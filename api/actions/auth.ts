import { AxiosInstance } from 'axios';
import myCookie from '~/utils/my-cookie';

export interface ILoginData {
    email: string;
    password: string;
}

const auth = (instance: AxiosInstance) => {
    return {
        login: (data: ILoginData) =>
            instance
                .post('signin', data)
                .then(response => response.data)
                .then((res: any) => {
                    if (res.success && res.token) {
                        myCookie('_tkn_', res.token);
                    }
                    return res;
                }),

        register: (data: ILoginData) =>
            instance
                .post('signup', data)
                .then(response => response.data)
                .then((res: any) => {
                    if (res.success && res.token) {
                        myCookie('_tkn_', res.token);
                    }
                    return res;
                })
        // resetEmail: (data) =>
        //     instance.post('password/email', data).then(response => response.data),
        // resetPassword: (data) =>
        //     instance.post('password/reset', data).then(response => response.data),
    };
};

export default auth;
