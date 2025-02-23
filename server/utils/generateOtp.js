
const generateOtp = () => {
    return Math.floor(Math.random() * 900000) + 100000 // 6 digit otp
}

export default generateOtp