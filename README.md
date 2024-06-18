## KryptonimSDk

A simple library to help builing [Kryptonim](https://www.kryptonim.com/) redirect form URLs.

## Initialization

To create an instance of `KryptonimSdk`, you can optionally pass an `api` argument. The `api` argument determines the environment to use and can be either `'integration'` or `'production'`. If no value is provided, `'integration'` is used as the default.

## Parameters

- `api` (optional): A string that specifies the environment to use. Acceptable values are:
  - `'integration'`: Use the integration environment (default).
  - `'production'`: Use the production environment.

## Example usage

```typescript
import { KryptonimSdk, ApiType } from "@kryptonim-sdk";

new KryptonimSdk().getRedirectFormUrl({
  exchangeOptions: {
    address: "0x3D7cc84710728EB39aA4d460418816C3FfD28954",
    blockchain: "Polygon",
    amount: "0.5",
    currency: "EUR",
  },
});

// with this configuration the the following URL will be generated:
// https://intg-kryptonim.devone.cc/redirect-form?amount=0.5&currency=EUR&blockchain=Polygon&address=0x3D7cc84710728EB39aA4d460418816C3FfD28954
```

## KryptonimSDK methods

### getRedirectFormUrl

The `getRedirectFormUrl` method takes optional configuration object

Arguments:

- config `Object`: Optional configuration for a generated redirect form url.

#### `config`

| property        | type   | optional | description                                          | example                     | notes                                                      |
| --------------- | ------ | -------- | ---------------------------------------------------- | --------------------------- | ---------------------------------------------------------- |
| merchantId      | string | yes      | Merchant identificator                               | c5s8                        | Merchant identifier, created during onboarding.            |
| customerMail    | string | yes      | Customer’s e-mail address                            | john@krypotnim.com          |                                                            |
| paymentMethod   | string | yes      | The selected payment method ('card', 'bank')         | card                        | Option 'bank' only available for EUR, skips the third step |
| exchangeOptions | object | yes      | Exchange options                                     | see `exchangeOptions`       | -                                                          |
| cardOptions     | object | yes      | Card options                                         | see `cardOptions`           | -                                                          |
| billingOptions  | object | yes      | Billing options                                      | see `billingOptions`        | -                                                          |
| successUrl      | string | yes      | URL to redirect the user upon successful transaction | https://example.com/success | -                                                          |
| failureUrl      | string | yes      | URL to redirect the user upon failed transaction     | https://example.com/error   | -                                                          |

- #### `exchangeOptions`

| property          | type   | optional | description                   | example                                    | notes                                                      |
| ----------------- | ------ | -------- | ----------------------------- | ------------------------------------------ | ---------------------------------------------------------- |
| amount            | string | yes      | Amount in the Fiat currency   | 0.5                                        | The value of how much we want to spent.                    |
| currency          | string | yes      | Fiat currency                 | EUR                                        | In capital letters.                                        |
| convertedAmount   | string | yes      | Amount in the Crypto currency | 0.5                                        | The value of how much crypto we want to buy.               |
| convertedCurrency | string | yes      | Crypto currency               | USDC                                       | In capital letters. Check available currencies             |
| blockchain        | string | yes      | Wallet's Network              | Polygon                                    | Required if convertedCurrency is specified. Case sensitive |
| address           | string | yes      | Customer's wallet address     | 0x3D7cc84710728EB39aA4d460418816C3FfD28954 |                                                            |

- #### `cardOptions`

| property        | type   | optional | description                               | example          | notes                                             |
| --------------- | ------ | -------- | ----------------------------------------- | ---------------- | ------------------------------------------------- |
| cardNumber      | string | yes      | Customer’s credit card number             | 0000000000000000 | -                                                 |
| cvv             | string | yes      | Customer's credit card CVV number         | 123              | -                                                 |
| holder          | string | yes      | Customers full name                       | John Doe         | -                                                 |
| expirationMonth | string | yes      | Customer’s credit card expiry month (MM)  | 11               | -                                                 |
| expirationYear  | string | yes      | Customer’s credit card expiry year (YYYY) | 2025             | Should be specified together with expirationMonth |

- #### `billingOptions`

| property      | type   | optional | description               | example        | notes                                           |
| ------------- | ------ | -------- | ------------------------- | -------------- | ----------------------------------------------- |
| firstName     | string | yes      | Customer's first name     | John           | Merchant identifier, created during onboarding. |
| lastName      | string | yes      | Customer's surname        | Doe            | -                                               |
| city          | string | yes      | Customer's city           | NY             | -                                               |
| streetAddress | string | yes      | Customer's street address | 2 Pacific Rd.  | exchange options                                |
| postalCode    | string | yes      | Customer's postal code    | 10460          | card options                                    |
| country       | string | yes      | Customer's country        | USA            | -                                               |
| countryCode   | string | yes      | Customer's country code   | US             | ISO country code in capital letters             |
| state         | string | yes      | Customer's state          | New York State | -                                               |
