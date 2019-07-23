import { AxiosInstance } from 'axios';
import myCookie from '~/utils/my-cookie';

export interface ILoginData {
    email: string;
    password: string;
}

const user = (instance: AxiosInstance) => {
    return {
        user: {
            get: (id?: string) =>
                instance
                    .get(`user${id ? '/' + id : ''}`)
                    .then(response => response.data)
                    .then(res => res.success && res.user)
        }
    };
};

export default user;
