const baseUrl = "https://capstone24.sit.kmutt.ac.th/sy1/apis"

export const MEMO_API = {
    studentRegister: baseUrl + "/v1/student/register",
    studentOtp: baseUrl + "/v1/student/otp/verify",

    teacherRegister: baseUrl + "/v1/teacher/register",
    teacherOtp: baseUrl + "/v1/teacher/otp/verify",

    adminRegister: baseUrl + "/v1/admin/register",
    adminLogin: baseUrl + "/v1/admin/login",
    adminOtp: baseUrl + "/v1/admin/otp/verify",
}