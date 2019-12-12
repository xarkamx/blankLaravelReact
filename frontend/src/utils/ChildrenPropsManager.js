import React from 'react';
export class ChildrenPropsManager {
    constructor(children) {
        this.children = children;
    }
    get() {
        return this._clone();
    }
    setProps([{ propName, ...props }]) {
        return this;
    }
    _clone() {
        return React.Children.map(this.children, child => {
            return React.cloneElement(child);
        });
    }
}