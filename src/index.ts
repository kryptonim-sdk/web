import {
  ApiType,
  KryptonimApiQueryParams,
  KryptonimSdkConfig,
  UrlBuildConfig,
} from "./types";

const buildQueryCompatibileObject = (
  config: UrlBuildConfig
): KryptonimApiQueryParams => {
  return {
    m: config.merchantId,
    amount: config.exchangeOptions?.amount,
    currency: config.exchangeOptions?.currency,
    convertedAmount: config.exchangeOptions?.convertedAmount,
    convertedCurrency: config.exchangeOptions?.convertedCurrency,
    blockchain: config.exchangeOptions?.blockchain,
    address: config.exchangeOptions?.address,
    paymentMethod: config.paymentMethod,
    customerMail: config.customerMail,
    cardNumber: config.cardOptions?.cardNumber,
    cardCVV: config.cardOptions?.cvv,
    cardHolder: config.cardOptions?.holder,
    cardExpMM: config.cardOptions?.expirationMonth,
    cardExpYY: config.cardOptions?.expirationYear,
    firstName: config.billingOptions?.firstName,
    lastName: config.billingOptions?.lastName,
    billingCity: config.billingOptions?.city,
    billingStreetAddress: config.billingOptions?.streetAddress,
    billingPostalCode: config.billingOptions?.postalCode,
    billingCountry: config.billingOptions?.country,
    billingCountryCode: config.billingOptions?.countryCode,
    billingState: config.billingOptions?.state,
    successUrl: config.successUrl,
    failureUrl: config.failureUrl,
  };
};

export const INTEGRATION_REDIRECT_FORM_API_URL =
  "https://intg-kryptonim.devone.cc/redirect-form";
export const PRODUCTION_REDIRECT_FORM_API_URL =
  "https://buy.kryptonim.com/redirect-form";

export class KryptonimSdk {
  public readonly apiType: ApiType;
  private readonly _apiUrl: string;

  constructor(api?: ApiType) {
    this.apiType = api ?? ApiType.Integration;

    if (this.apiType === ApiType.Production)
      this._apiUrl = PRODUCTION_REDIRECT_FORM_API_URL;
    else this._apiUrl = INTEGRATION_REDIRECT_FORM_API_URL;
  }

  private _buildUrl(config: UrlBuildConfig) {
    const urlElements = [config.apiUrl];
    const queryCompatibileObject = buildQueryCompatibileObject(config);
    const filteredQueryParams: Record<string, string> = {};

    const getKeyValue =
      <T extends object, U extends keyof T>(key: U) =>
      (obj: T) =>
        obj[key];

    for (const key of Object.keys(queryCompatibileObject)) {
      const value = getKeyValue<
        KryptonimApiQueryParams,
        keyof KryptonimApiQueryParams
      >(<keyof KryptonimApiQueryParams>key)(queryCompatibileObject);

      if (value) filteredQueryParams[key] = value;
    }

    const params = new URLSearchParams(filteredQueryParams);
    const queryParamsString = params.toString();

    if (queryParamsString !== "") {
      urlElements.push("?");
      urlElements.push(queryParamsString);
    }

    return urlElements.join("");
  }

  public getRedirectFormUrl(config?: KryptonimSdkConfig): string {
    return this._buildUrl({ apiUrl: this._apiUrl, ...config });
  }
}
