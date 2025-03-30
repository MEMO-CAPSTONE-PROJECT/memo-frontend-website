const baseUrl = "https://capstone24.sit.kmutt.ac.th/sy1/apis"

export const MEMO_API = {
    //Register
    studentRegister: baseUrl + "/v1/register/student/otp",
    studentOtp: baseUrl + "/v1/register/student/verify",

    teacherRegister: baseUrl + "/v1/register/teacher/otp",
    teacherOtp: baseUrl + "/v1/register/teacher/verify",

    adminRegister: baseUrl + "/v1/admin/register",
    adminLogin: baseUrl + "/v1/admin/login",
    adminOtp: baseUrl + "/v1/admin/password/verify",
    adminResetPassword: baseUrl + "/v1/admin/password/reset",

    //User-managment
    studentsList : baseUrl + "/v1/students",
    parentsList : baseUrl + "/v1/parents",
    teachersList : baseUrl + "/v1/teachers",

    studentDelete : baseUrl + "/v1/student",
    teacherDelete : baseUrl + "/v1/teacher",

    studentAddForm : baseUrl + "/v1/student/form",
    teacherAddForm : baseUrl + "/v1/teacher/form",
    studentAddExcel : baseUrl + "/v1/student/excel",
    teacherAddExcel : baseUrl + "/v1/teacher/excel",

    parentEdit :baseUrl + "/v1/parent",
    studentEdit :baseUrl + "/v1/student",
    teacherEdit :baseUrl + "/v1/teacher",

    //Approve user
    allUserRequests : baseUrl +"/v1/registers",
    teacherApprove : baseUrl +"/v1/register/teacher/approve",
    studentApprove : baseUrl +"/v1/register/student/approve",
    allUserDecline : baseUrl + "/v1/register/decline",

    //Trash
    studentTrashes : baseUrl + "/v1/trash/student",
    teacherTrashes : baseUrl + "/v1/trash/teacher",
    allDeleteTrashes : baseUrl + "/v1/trash",

    //Admin-Management
    adminList: baseUrl + "/v1/admins?role=Teacher%20Staff",
    adminDeleteList: baseUrl + "/v1/admin",
    adminAddForm: baseUrl + "/v1/admin",
    adminEdit: baseUrl + "/v1/admin/"




}
