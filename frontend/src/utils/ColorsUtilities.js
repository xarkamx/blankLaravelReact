import { AuthFetch } from "./AuthFetch";
import colors from "../assets/store/colors.json";
export class ColorsUtilities {
  constructor() {
    this.fetch = new AuthFetch("api/colors");
  }
  /**
   * Obtiene lo colores del servidor y los almacena localmente.
   * @return void
   */
  async getRemoteColors() {
    const fetch = this.fetch;
    const colors = (await fetch.get()).data;
    localStorage.setItem("colors", JSON.stringify(this._formatColors(colors)));
  }
  /**
   * Obtiene colores locales
   * @return {*}
   */
  getLocalColors() {
    let colorsCollection = {
      ...colors,
      ...JSON.parse(localStorage.getItem("colors"))
    };
    return colorsCollection;
  }
  /**
   * Define colores del sistema.
   */
  setColors({ colorName, hex }) {
    this.fetch.post({ colorName, hex });
    let colors = this.getLocalColors();
    colors[colorName] = hex;
    localStorage.setItem("colors", JSON.stringify(colors));
  }
  _formatColors(items) {
    let object = colors;
    for (let color of items) {
      object[color.colorName] = color.hex;
    }
    return object;
  }
}
