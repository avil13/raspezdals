export interface IMainStore {
    msg: string;
}

const store = {
    namespaced: true,

    state: (): IMainStore => ({
        msg: ''
    }),

    mutations: {
        showMsg(state: IMainStore, message = '') {
            state.msg = message;
        }
    }
};

export default store;
