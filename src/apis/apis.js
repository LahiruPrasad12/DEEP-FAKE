import api from "./index";


// eslint-disable-next-line import/no-anonymous-default-export
export default  {
    register: (payload) => api.post(`/register`,payload),
    login: (payload) => api.post(`/login`,payload),
    get_pro: (payload) => api.put(`/get_pro`,payload),
    logout: () => api.get(`/logout`),
    all_predictions: () => api.get(`/predictions`),
    all_users: () => api.get(`/users`)
}