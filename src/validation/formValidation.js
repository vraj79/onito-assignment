import * as yup from "yup";

export const formValidation=yup.object().shape({
    name:yup.string().required(),
    age:yup.string().required(),
    sex:yup.string().required(),
    mobile:yup.string().min(10).max(10),
    ecMobile:yup.string().min(10).max(10),
    goiNum:yup.string().min(10).max(12),
})