import http from "../http";
import {getOrder, pay, sendOrder} from '../apis/order'

export default {
    sendOrder(arg) {
        return http.post(sendOrder, {...arg})
    },
    getOrder(arg) {
        return http.get(getOrder, {params: arg})
    },
    pay(arg) {
        return http.post(pay, {...arg})
    },

}
