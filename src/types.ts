export enum ApiType {
  Integration = "integration",
  Production = "production",
}

export enum PaymentMethod {
  Card = "card",
  Bank = "bank",
}

export type ExchangeOptions = {
  readonly amount?: string;
  readonly currency?: string;
  readonly convertedAmount?: string;
  readonly convertedCurrency?: string;
  readonly blockchain?: string;
  readonly address?: string;
};

export type CardOptions = {
  readonly cardNumber?: string;
  readonly cvv?: string;
  readonly holder?: string;
  readonly expirationMonth?: string;
  readonly expirationYear?: string;
};

export type BillingOptions = {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly city?: string;
  readonly streetAddress?: string;
  readonly postalCode?: string;
  readonly country?: string;
  readonly countryCode?: string;
  readonly state?: string;
};

export type KryptonimSdkConfig = {
  readonly merchantId?: string;
  readonly customerMail?: string;
  readonly paymentMethod?: PaymentMethod;
  readonly exchangeOptions?: ExchangeOptions;
  readonly cardOptions?: CardOptions;
  readonly billingOptions?: BillingOptions;
  readonly successUrl?: string;
  readonly failureUrl?: string;
};

export type UrlBuildBaseConfig = KryptonimSdkConfig & { apiUrl: string };

export type RedirectFormUrlBuildConfig = UrlBuildBaseConfig & {
  readonly successUrl?: string;
  readonly failureUrl?: string;
};

export type UrlBuildConfig = RedirectFormUrlBuildConfig;

export type KryptonimApiQueryParams = {
  readonly amount?: string;
  readonly currency?: string;
  readonly convertedAmount?: string;
  readonly convertedCurrency?: string;
  readonly blockchain?: string;
  readonly address?: string;
  readonly paymentMethod?: string;
  readonly customerMail?: string;
  readonly m?: string;
  // card
  readonly cardNumber?: string;
  readonly cardCVV?: string;
  readonly cardHolder?: string;
  readonly cardExpMM?: string;
  readonly cardExpYY?: string;
  // billing
  readonly firstName?: string;
  readonly lastName?: string;
  readonly billingCity?: string;
  readonly billingStreetAddress?: string;
  readonly billingPostalCode?: string;
  readonly billingCountry?: string;
  readonly billingCountryCode?: string;
  readonly billingState?: string;
  //redirect from
  readonly successUrl?: string;
  readonly failureUrl?: string;
};
