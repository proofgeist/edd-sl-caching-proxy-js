import axios, { AxiosResponse, AxiosPromise } from "axios";

export default class EDDSL {
  private proxyURL: string;

  /**
   * 
   * @param proxyURL the url to the proxy server
   */
  constructor(proxyURL: string) {
    this.proxyURL = proxyURL;
  }
  /**
   * checks a license to see if it is still valid
   * 
   * async and cached
   * 
   * @param license the EDD License
   * @param itemId  the item ID that the license belongs too
   * @param activationId a string representing a unique install or device. EDD uses url
   */
  async licenseCheck(
    license: string,
    itemId: string,
    activationId: string
  ): Promise<AxiosResponse> {
    return this.licenseRequest(license, itemId, activationId, "check");
  }

  /**
   * activate a license
   * 
   * async
   * 
   * @param license edd license
   * @param itemId the itemId of the license to activate
   * @param activationId a string that uniqiely IDs the device
   */
  async licenseActivate(
    license: string,
    itemId: string,
    activationId: string
  ): Promise<AxiosResponse> {
    return this.licenseRequest(license, itemId, activationId, "activate");
  }

  /**
   * deactivate a license
   * 
   * async
   * 
   * @param license edd license
   * @param itemId the itemId of the license to deactivate
   * @param activationId a string that uniqiely IDs the device
   */
  async liceseDeactivate(
    license: string,
    itemId: string,
    activationId: string
  ): Promise<AxiosResponse> {
    return this.licenseRequest(license, itemId, activationId, "deactivate");
  }

  /**
   * requires that the user is loggedIn already
   * 
   * async
   * 
   * @param productName this is the Item Name, NOT the Item Id that is used on the license methods
   * @returns an array of licenses with sales data
   */
  async userLicenses(productName: string = ""): Promise<Array<Object>> {
    const token = this.getStoredToken();
    const query = productName ? { productName } : {};
    if (!token) throw Error("No Token. Login first");
    const opts = {
      method: "GET",
      url: `${this.proxyURL}/user/licenses`,
      params: query,
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token
      }
    };
    const result = await axios(opts);
    return result.data;
  }

  /**
   * login to EDD/Wordpress
   * @param username the username or email address for the wordpress account
   * @param password the password
   */
  async login(username: string, password: string): Promise<AxiosResponse> {
    const opts = {
      method: "POST",
      url: `${this.proxyURL}/wp/login`,
      headers: { "Content-Type": "application/json" },
      data: {
        username,
        password
      }
    };
    const result = await axios(opts);
    const data = result.data;
    const userData: any = Object.assign({}, data);

    delete userData.token;
    this.storeUserData(data);
    return userData;
  }
  /**
   * gets the user data from storage
   * 
   * not async
   */
  user() {
    const userData = this.getUserDataFromStorage();
    if (userData) {
      delete userData.token;
      return userData;
    }
    return null;
  }

  /**
   * log the currently logged in user out
   * 
   * removes token and user data, but does not revoke the token
   */
  logout() {
    this.deleteStoredUserData();
    return true;
  }

  /**
   * is the user logged in or not
   * 
   * async
   * 
   * @returns {boolean} if the user is logged in
   */
  async isLoggedIn(): Promise<boolean> {
    const userData = this.getUserDataFromStorage();
    let token;
    if (userData) {
      token = userData.token;
    } else {
      token = ""; // maybe a better way to do this ??
    }

    const opts = {
      method: "POST",
      url: `${this.proxyURL}/wp/validate`,
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token
      }
    };

    try {
      const result = await axios(opts);
      const data = result.data;
      const valid = data.code === "jwt_auth_valid_token";

      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 
   * @param license the license to work with
   * @param itemId the item id for the product
   * @param activationId the unique id for this activation
   * @param action what action to take
   */
  private async licenseRequest(
    license: string,
    itemId: string,
    activationId: string,
    action: string
  ) {
    const opts = {
      method: "get",
      url: `${this.proxyURL}/license/${license}/${action}`,
      params: {
        itemId,
        activationId
      }
    };

    const r = await axios(opts);
    return r.data;
  }

  private getUserDataFromStorage(): any {
    const s = localStorage.getItem("wp-user-data");
    if (!s) return null;
    const userData = JSON.parse(s);
    return userData;
  }

  private deleteStoredUserData() {
    localStorage.removeItem("wp-user-data");
  }

  private storeUserData(data: object) {
    const json = JSON.stringify(data);
    localStorage.setItem("wp-user-data", json);
  }

  private getStoredToken(): string {
    const userData = this.getUserDataFromStorage();
    let token;
    if (userData) {
      token = userData.token;
    } else {
      token = "";
    }
    return token;
  }
}
