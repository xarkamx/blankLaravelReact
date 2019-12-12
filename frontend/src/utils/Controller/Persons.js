import { AuthFetch } from "../AuthFetch";
export class Persons {
  id = "";
  PATH = "api/persons";
  constructor(id = "") {
    this.id = id;
  }
  /**
   * Setea si el usuario tiene acceso o no.
   * @param boolean access
   */
  setAccess(access = true, extra = {}) {
    const tomorrow = new Date();
    let data = {
      hasAccess: +access,
      limitedAccess: tomorrow.toISOString().substring(0, 10),
      ...extra
    };
    return this.setRequest().put(data);
  }
  /**
   * @description obtiene informacion de personas de manera asincrona
   * @param {} filter
   */
  async get(filter) {
    const resp = this.setRequest().get(filter);
    return (await resp).data;
  }
  /**
   * @description obtiene de manera asyncronca las personas que cumplan con el filtro.
   * @param {*} filter
   */
  async by(filter) {
    const fetch = new AuthFetch(`${this.PATH}`);
    return (await fetch.get(filter)).data;
  }
  /**
   * Settea valor/es enviados en la persona.
   * @param {*} values
   */
  async set(values) {
    const resp = this.setRequest().put(values);
    return (await resp).data;
  }
  /**
   * Prepara la ruta para ser consumida
   */
  setRequest() {
    const fetch = new AuthFetch(`${this.PATH}/${this.id}`);
    return fetch;
  }
}
