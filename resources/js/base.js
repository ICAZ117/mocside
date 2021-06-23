import { WS } from "../../config/service/websocket.config";

const install = function (Vue) {
    const base = {
        // Parameters & methods 
        WS({ url, openFn, messageFn, errorFn, isInit = false } = {}) {
            return new WS({ url, openFn, messageFn, errorFn, isInit });
        },
    };
    Vue.prototype.base = base;
};

const base = {
     // Parameters & methods 
     WS({ url, openFn, messageFn, errorFn, isInit = false } = {}) {
        return new WS({ url, openFn, messageFn, errorFn, isInit });
    },
}

export default {
    install, base,
};


