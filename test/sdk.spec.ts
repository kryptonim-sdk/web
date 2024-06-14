import { describe, expect, it } from "vitest";
import {
  INTEGRATION_REDIRECT_FORM_API_URL,
  KryptonimSdk,
  PRODUCTION_REDIRECT_FORM_API_URL,
} from "../src/sdk";
import { ApiType, KryptonimSdkConfig, PaymentMethod } from "../src/types";

describe("KryptonimSDK", () => {
  const baseConfig: KryptonimSdkConfig = {
    paymentMethod: PaymentMethod.Bank,
    merchantId: "1234",
    customerMail: "user@example.com",
    billingOptions: {
      city: "Warsaw",
      country: "Poland",
      countryCode: "PL",
      firstName: "Mark",
      lastName: "Kram",
      postalCode: "00-844",
      state: "Mazovian",
      streetAddress: "Plac Europejski 1",
    },
    cardOptions: {
      cardNumber: "4929111260419572",
      cvv: "111",
      expirationMonth: "12",
      expirationYear: "2024",
      holder: "Mark Kram",
    },
    exchangeOptions: {
      address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
      blockchain: "Polygon",
      amount: "0.5",
      currency: "EUR",
      convertedAmount: "32",
      convertedCurrency: "USDC",
    },
  };

  it("should create sdk instance", () => {
    expect(() => new KryptonimSdk()).not.toThrow();
  });

  it("should create sdk instance for integration when api type is not specified", () => {
    const sdk = new KryptonimSdk();

    expect(sdk.apiType).toBe(ApiType.Integration);
  });

  it("should create valid empty url for integration redirect form", () => {
    const sdk = new KryptonimSdk();
    expect(sdk.getRedirectFormUrl()).toBe(
      `${INTEGRATION_REDIRECT_FORM_API_URL}`
    );
  });

  it("should create valid complete url for integration redirect form", () => {
    const sdk = new KryptonimSdk();
    const config = {
      ...baseConfig,
      failureUrl: "https://example.com/failure",
      successUrl: "https://example.com/success",
    };

    expect(sdk.getRedirectFormUrl(config)).toBe(
      "https://intg-kryptonim.devone.cc/redirect-form?m=1234&amount=0.5&currency=EUR&convertedAmount=32&convertedCurrency=USDC&blockchain=Polygon&address=0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359&paymentMethod=bank&customerMail=user%40example.com&cardNumber=4929111260419572&cardCVV=111&cardHolder=Mark+Kram&cardExpMM=12&cardExpYY=2024&firstName=Mark&lastName=Kram&billingCity=Warsaw&billingStreetAddress=Plac+Europejski+1&billingPostalCode=00-844&billingCountry=Poland&billingCountryCode=PL&billingState=Mazovian&successUrl=https%3A%2F%2Fexample.com%2Fsuccess&failureUrl=https%3A%2F%2Fexample.com%2Ffailure"
    );
  });

  it("should create valid empty url for production redirect form", () => {
    const sdk = new KryptonimSdk(ApiType.Production);
    expect(sdk.getRedirectFormUrl()).toBe(
      `${PRODUCTION_REDIRECT_FORM_API_URL}`
    );
  });

  it("should create valid complete url for production redirect form", () => {
    const sdk = new KryptonimSdk(ApiType.Production);
    const config = {
      ...baseConfig,
      failureUrl: "https://example.com/failure",
      successUrl: "https://example.com/success",
    };

    expect(sdk.getRedirectFormUrl(config)).toBe(
      "https://buy.kryptonim.com/redirect-form?m=1234&amount=0.5&currency=EUR&convertedAmount=32&convertedCurrency=USDC&blockchain=Polygon&address=0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359&paymentMethod=bank&customerMail=user%40example.com&cardNumber=4929111260419572&cardCVV=111&cardHolder=Mark+Kram&cardExpMM=12&cardExpYY=2024&firstName=Mark&lastName=Kram&billingCity=Warsaw&billingStreetAddress=Plac+Europejski+1&billingPostalCode=00-844&billingCountry=Poland&billingCountryCode=PL&billingState=Mazovian&successUrl=https%3A%2F%2Fexample.com%2Fsuccess&failureUrl=https%3A%2F%2Fexample.com%2Ffailure"
    );
  });
});
