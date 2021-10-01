// imports all API files and re-exports them under a single `api`
// this is don so we can simply do `import api from "./api"`
import userApi from "./user.api";

const api = {
    ...userApi
}

export default api;