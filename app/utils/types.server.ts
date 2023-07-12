export interface RegisterForm {
    email: string
    password: string
}

export interface createAccountResponse {
    success: Boolean,
    preexistingOrg?: Boolean
    orgName?: String
    error: String
    fields?: any
    status: number
    
}