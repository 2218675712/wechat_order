import http from "../http";
import {changeUser, evaluate, getOrder} from '../apis/pc'

export default {
    changeUser(arg) {
        return http.post(changeUser, {...arg})
    },
    getOrder(arg) {
        return http.get(getOrder, {params: arg})
    },
    evaluate(arg) {
        return http.post(evaluate, {...arg})
    },
}
