const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PHONE_REGEX =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

const ZIPCODE_REGEX = /^\d{5}(?:[-\s]\d{4})?$/;

const TAG_URL_REGEX = /^\/tag\/[a-zA-Z0-9]{6}((\/(profile\/?)?)?)?$/;

export const Patterns = { EMAIL_REGEX, PHONE_REGEX, PASSWORD_REGEX, ZIPCODE_REGEX, TAG_URL_REGEX };
