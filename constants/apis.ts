const baseUrl = "https://capstone24.sit.kmutt.ac.th/sy1/apis"

export const MEMO_API = {
    studentRegister: baseUrl + "/v1/student/register",
    studentOtp: baseUrl + "/v1/student/otp/verify",

    teacherRegister: baseUrl + "/v1/teacher/register",
    teacherOtp: baseUrl + "/v1/teacher/otp/verify",

    adminRegister: baseUrl + "/v1/admin/register",
    adminLogin: baseUrl + "/v1/admin/login",
    adminOtp: baseUrl + "/v1/admin/password/verify",
    adminResetPassword: baseUrl + "/v1/admin/password/reset",

    studentsList : baseUrl + "/v1/students",
    parentsList : baseUrl + "/v1/parents",
    teachersList : baseUrl + "/v1/teachers",

    studentDelete : baseUrl + "/v1/student/{studentIds}",
    teacherDelete : baseUrl + "/v1/teacher/{teacherIds}",

    studentAddForm : baseUrl + "/v1/student/form",
    teacherAddForm : baseUrl + "/v1/teacher/form",
    studentAddExcel : baseUrl + "/v1/student/excel",
    teacherAddExcel : baseUrl + "/v1/teacher/excel",

}