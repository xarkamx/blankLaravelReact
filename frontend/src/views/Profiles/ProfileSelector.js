import React, { Component } from "react";
import { GenericSelector } from "../../components/CustomInput/GenericSelector";
import { AuthFetch } from "../../utils/AuthFetch";
import { Translator } from "../../utils/Translator";
import { optionalFn } from "../../core/helpers";
/* eslint eqeqeq: 0*/
export class ProfileSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      value: props.value
    };
  }
  componentWillReceiveProps(next) {
    if (next.value != this.state.value) {
      this.setState({ value: next.value });
    }
  }
  componentDidMount() {
    this.loadProfiles();
  }
  /**
   * LoadProfiles
   */
  async loadProfiles() {
    let fetch = new AuthFetch("api/profiles");
    let response = await fetch.get();
    this.setState({ profiles: response.data });
  }
  /**
   * Imprime los perfiles como options de un select
   * @param {} profiles
   */
  printProfiles(profiles) {
    return profiles.map((option, key) => {
      return (
        <option value={option.id} key={key}>
          {option.name}
        </option>
      );
    });
  }
  render() {
    return (
      <GenericSelector
        name="profileID"
        value={this.state.value}
        onChange={ev => {
          optionalFn(this.props.onChange)(ev);
        }}
      >
        {this.printProfiles(this.state.profiles)}
        <option value="new">{new Translator("new").get()}</option>
      </GenericSelector>
    );
  }
}
