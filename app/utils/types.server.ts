export interface RegisterForm {
    email: string
    password: string
}

export interface AuthUserAndOrg {
    email: string
    password: string
    organizationDomain: string
}

export interface JoinOrgResponse {
    success: boolean;
    userId: string;
    orgDomain: string;
    errorMsg?: string;
}

export interface createAccountResponse {
    success: Boolean,
    preexistingOrg?: Boolean
    orgName?: String
    error: String
    fields?: any
    status: number
}