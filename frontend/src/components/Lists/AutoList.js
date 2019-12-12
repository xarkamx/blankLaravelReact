import React, { Component } from "react";
import { Translator } from "./../../utils/Translator";
export class AutoList extends Component {
    printList(args) {
        let list = [];
        for (let key in args) {
            list.push(
                <div key={Math.random() + key}>
                    <h5>
                        <strong>{new Translator(key).get()}:</strong>
                    </h5>
                    <div className="content">{args[key]}</div>
                </div>
            );
        }
        return list;
    }
    render() {
        return <div>{this.printList(this.props.list)}</div>;
    }
}
