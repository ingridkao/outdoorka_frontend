export const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;

export const NAME_REGEX = /^[\u4E00-\u9FA5\w]{2,23}$/;

export const TW_PHONE_REGEX = /^(09)[0-9]{8}$/;

export const NUMBER_ONLY_REGEX = /^[0-9]*$/;

export const URL_REGEX = /^(http|https):\/\/[^ "]+$/;
