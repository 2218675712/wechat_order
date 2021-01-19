import http from "../http";
import {getMenuList,callOut} from '../apis/project'

export default {
    getMenuList(arg) {
        return http.get(getMenuList,{
            params:arg
        })
    },
    callOut(arg) {
        return http.post(callOut,{
            params:{callOut,...arg}
        })
    }
}
