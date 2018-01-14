import axios, { AxiosResponse, AxiosPromise } from "axios";

export default class EDDSL {
  private proxyURL: string;
  constructor(proxyURL: string) {
    this.proxyURL = proxyURL;
  }

  /**
   * 
   * @param license the EDD License
   * @param itemId  the item ID that the license belongs too
   * @param activationId a string representing a unique install or device. EDD uses url
   */
  async check(
    license: string,
    itemId: string,
    activationId: string
  ): Promise<AxiosResponse> {
    try {
      return await this.rq(license, itemId, activationId, "check");
    } catch (e) {
      throw e;
    }
  }

  async activate(
    license: string,
    itemId: string,
    activationId: string
  ): Promise<AxiosResponse> {
    try {
      return await this.rq(license, itemId, activationId, "activate");
    } catch (e) {
      throw e;
    }
  }

  async deactivate(
    license: string,
    itemId: string,
    activationId: string
  ): Promise<AxiosResponse> {
    try {
      return await this.rq(license, itemId, activationId, "deactivate");
    } catch (e) {
      throw e;
    }
  }

  private async rq(
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
}
