import checkoutNodeJssdk from "@paypal/checkout-server-sdk";

const configureEnvironment = function () {
  const clientId =
    "AWmrRArA7rinSbfBZZUyPpA7kJvbPcFrLDOUSnJew67hp_SAEm9JswWQJilb0Fo02nzi_J7m9UYIOlcd";
  const clientSecret =
    "EEMLwEQ3nz31JWWqsoHXxWQ67ft5JBIG_opxEA0Ob1DIkceC8E6Ru1JMt4b3UFHPFfhRTOveKdaYLUMq";

  return process.env.NODE_ENV === "production"
    ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
    : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
};

const client = function () {
  return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment());
};

export default client;
