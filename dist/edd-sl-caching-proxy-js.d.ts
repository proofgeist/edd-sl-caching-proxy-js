import { AxiosResponse } from "axios";
export default class EDDSL {
    private proxyURL;
    constructor(proxyURL: string);
    /**
     *
     * @param license the EDD License
     * @param itemId  the item ID that the license belongs too
     * @param activationId a string representing a unique install or device. EDD uses url
     */
    check(license: string, itemId: string, activationId: string): Promise<AxiosResponse>;
    activate(license: string, itemId: string, activationId: string): Promise<AxiosResponse>;
    deactivate(license: string, itemId: string, activationId: string): Promise<AxiosResponse>;
    private rq(license, itemId, activationId, action);
}
