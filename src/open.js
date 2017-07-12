import Vue from 'vue';

export function mount(Component) {
    const elem = document.createElement("div");
    document.body.insertBefore(elem, document.body.childNodes[0]);

    const component = new Vue(Component).$mount(elem);
    return component;
}

/**
 * @param component Must be mounted component which emits "ok" and "cancel" events
 */
export function wait_for_result(component) {
    return new Promise((resolve, reject) => {
        component.$on('ok', (res) => {
            resolve(res);
        });
        component.$on('cancel', (err) => {
            reject(err);
        });
    });
}

export function unmount(component) {
    const elem = component.$el;

    component.$destroy();
    elem.parentNode.removeChild(elem);
}

export function open(Component) {
    const comp = mount(Component);
    const promise = wait_for_result(comp);
    return promise.then(function(val) {
        unmount(comp);
        return val;
    }, function(err) {
        unmount(comp);
        throw err;
    });
}
