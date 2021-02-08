import http from "../http";
import {callOut, getMenuDetail, getMenuList} from '../apis/project'

export default {
    getMenuList(arg) {
        return http.get(getMenuList, {
            params: arg
        })
    },
    callOut(arg) {
        return http.post(callOut, {
            params: {callOut, ...arg}
        })
    },
    getMenuDetail(arg) {
        return http.get(getMenuDetail, {
            params: arg
        })
    }
}
