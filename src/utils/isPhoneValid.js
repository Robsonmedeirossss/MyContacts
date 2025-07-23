export default function isPhoneValid(phone){
    const phoneRegex = /^\(?\d{2}\)?\s?(9?\d{4})-?\d{4}$/;
    return phoneRegex.test(phone);
}