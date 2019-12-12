import React from "react";
import "./scss/tabs.scss";

/**
 * @description TabsContainer permite generar un sistmea de tabs que puede
 * ser usado como un wizard.
 * @props jsx children
 * @props boolean hidden, define si las tabs son visibles o no.
 */
/* eslint eqeqeq: 0*/
export class TabsContainer extends React.Component {
    constructor() {
        super();
        this.state = { currentState: null };
        const epoc = new Date().getTime();
        this.id = "tab" + epoc;
    }
    storeCurrentTab(key) {
        this.focusAtIndex(key);
        this.setState({ currentState: key });
    }
    goToLast() {
        const key = this.props.children.length - 1;
        this.focusAtIndex(key);
        this.setState({ currentState: key });
    }
    goNext() {
        let key = this.state.currentState + 1;
        this.focusAtIndex(key);
        this.setState({ currentState: key });
    }
    goPrev() {
        let key = this.state.currentState - 1;
        this.focusAtIndex(key);
        this.setState({ currentState: key });
    }
    focusAtIndex(key) {
        let target = document.querySelectorAll(`#${this.id} li`);
        target[key].scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        });
        this.setActive(target, key);
    }
    setActive(tabs, key) {
        for (let index = 0; index < tabs.length; ++index) {
            tabs[index].classList.remove("active");
        }
        tabs[key].classList.add("active");
    }
    renderTab() {
        let currentState = this.state.currentState;
        for (let key in this.props.children) {
            let item = this.props.children[key];
            if (this.state.currentState == null) {
                if (item.props.active) return item;
            }
            if (currentState == key) {
                return item;
            }
        }
    }
    render() {
        const hidden = this.props.hidden ? "hidden" : "";
        let className = this.props.className;
        return (
            <div className={`tabsContainer ${className}`} id={this.id}>
                <ul className={`nav nav-tabs ${hidden}`}>
                    {this.props.children.map((item, key) => (
                        <li
                            key={key}
                            className={item.props.active ? "active" : ""}
                        >
                            <a
                                data-toggle="tab"
                                onClick={ev => this.storeCurrentTab(key)}
                                href={"#" + item.props.title}
                            >
                                {this.props.numeric === true ? (
                                    <span className="number">{key + 1}</span>
                                ) : (
                                    ""
                                )}
                                <span className="tabTitle">
                                    {item.props.title}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="tab-content">{this.renderTab()}</div>
            </div>
        );
    }
}
