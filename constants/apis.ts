const baseUrl ="https://capstone24.sit.kmutt.ac.th/sy1/apis"

export const MEMO_API = {
    studentRegister : {baseUrl}+"/register/student",
    studentOtp: {baseUrl}+"/student/verify/otp",

    teacherRegister : {baseUrl}+"/register/teacher",
    teacherOtp : {baseUrl}+"/teacher/verify/otp",

    adminRegister : {baseUrl}+"/register/admin",
    adminLogin : {baseUrl}+"/login/admin",
    adminOtp : {baseUrl}+"/admin/verify/otp",
}

