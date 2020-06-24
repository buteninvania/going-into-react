import {instance} from "./api";

export const securityhAPI = {
    getCaptchaUrl() {
        return instance.post(`security/get-captcha-url`)
    },
}