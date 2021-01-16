import {action, makeObservable, observable} from 'mobx'

class Control {
    msg = "操作成功"
    type = "success"
    show = false
    // time=1000
    change = action(({msg, type = 'success', show}) => {
        this.msg = msg
        this.type = type
        this.show = show

    })

    constructor() {
        makeObservable(this, {
            msg: observable,
            type: observable,
            show: observable,
            // time:observable
        });
    }
}

export default new Control()