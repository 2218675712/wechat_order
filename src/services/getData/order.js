import http from "../http";
import {sendOrder} from '../apis/order'

export default {
    sendOrder(arg) {
        return http.post(sendOrder, {...arg})
    }

}
