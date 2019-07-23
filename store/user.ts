import Api from '~/api';

export interface IUserProfile {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    login: string;
}

export interface IUserStore {
    loaded: boolean;
    person: IUserProfile | null;
}

const user = {
    namespaced: true,

    state: (): IUserStore => ({
        loaded: false,
        person: null
    }),

    mutations: {
        setPerson(state: IUserStore, data) {
            if (data) {
                const { _id, email, firstname, lastname, login } = data;
                state.person =
                    (_id && { _id, email, firstname, lastname, login }) || null;
            } else {
                state.person = null;
            }
        },
        loaded(state: IUserStore, data = false) {
            state.loaded = data;
        }
    },

    getters: {
        loaded: state => state.loaded,
        is_auth: state => state.loaded && state.person && !!state.person._id,
        user_id: state => state.person && state.person._id,
        user: state => state.person
    },

    actions: {
        GET_USER(context, action) {
            return Api.user
                .get()
                .then(data => {
                    context.commit('setPerson', data);
                    context.commit('loaded', true);
                })
                .catch(e => {
                    context.commit('setPerson');
                    context.commit('loaded', true);
                });
        }
    }
};

export default user;
