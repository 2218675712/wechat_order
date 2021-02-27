import {action, makeObservable, observable} from 'mobx'

class Control {
   data={}
    // time=1000
    change = action((arg)=>{
        this.data=arg
    })

    constructor() {
        makeObservable(this, {
            data:observable
        });
    }
}

export default new Control()
