import { AxiosInstance } from 'axios';

export interface IPostResp {
    docs: any[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}

export interface IGetPosts {
    id?: string; // user id
    page?: number;
}

export default (instance: AxiosInstance) => {
    const path = 'posts';
    return {
        posts: {
            get(param: IGetPosts = {}): Promise<IPostResp> {
                let _path = path;

                if (param.page) {
                    _path += '/' + param.page;
                }
                if (param.id) {
                    _path += '?id=' + param.id;
                }

                return instance
                    .get(_path)
                    .then(response => response.data as IPostResp);
            }
        }
    };
};
