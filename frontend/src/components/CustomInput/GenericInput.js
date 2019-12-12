import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import './scss/inputs.scss';

export class GenericInput extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value, error: false }
    }

    onBlur(ev) {
        ev.target.value = ev.target.value.toLowerCase();
        let value = ev.target.value;
        const { onBlur } = this.props;
        if (typeof onBlur === "function") {
            let result = onBlur(ev);
            ev.target.value = result;
            value = result;
        }
        const validity = ev.target.checkValidity();
        if (this.props.readOnly === true) {
            return false;
        }
        let result;
        if (!validity) {
            this.setState({ value: "", error: true });
            ev.target.focus();
            return "";
        }

        value = (typeof result !== "undefined") ? result : value;
        this.setState({ value, error: false });
    }
    onChange(ev) {
        let value = ev.target.value;
        if (this.props.readOnly === true) {
            return false;
        }
        let result;
        const { onChange } = this.props;
        if (typeof onChange === "function") {
            result = onChange(ev);
        }
        value = (typeof result === "string") ? result : value;
        this.setState({ value });
    }
    onClick(ev) {
        ev.stopPropagation();
    }
    setValueOnProgramaticallyChange() {
        let name = this.props.name;
        const input = this.refs.input.querySelector(`[name="${name}"]`);
        input.addEventListener('change', (ev) => {
            this.onChange(ev);
        })
    }
    componentDidMount() {
        this.setValueOnProgramaticallyChange();
    }
    render() {
        const {
            name,
            type,
            placeholder,
            mask,
            title,
            max,
            min,
            required,
            pattern,
            step,
            lang
        } = this.props;
        let propVal = (this.props.value) ? this.props.value : "";

        let value = (
            typeof this.state.value === "undefined" || this.state.value === ""
        ) ? propVal : this.state.value;

        const className = (this.props.className) ? this.props.className : 'col-sm-12';
        const epoc = new Date().getTime();
        const id = name + epoc;
        let asterisk = (required === true || required === undefined) ? "*" : "";
        let label = title + asterisk;
        return (
            <div
                className={"form-group genericInput  " + className}
                onClick={this.onClick.bind(this)}
                ref="input"
            >

                <InputMask
                    id={id}
                    name={name}
                    placeholder={(placeholder === undefined) ? title : placeholder}
                    pattern={pattern}
                    required={(required === undefined) ? true : required}
                    className="form-control input-md"
                    type={type}
                    onChange={this.onChange.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    value={value}
                    max={max}
                    min={min}
                    mask={mask}
                    step={step}
                    lang={lang}
                    onClick={this.onClick.bind(this)}
                />
                <label className=" control-label" htmlFor={id}>{label}</label>
            </div>
        );
    }
}