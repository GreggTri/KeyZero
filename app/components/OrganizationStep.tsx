import { CreateOrgForm } from "./CreateOrgForm"
import { JoinOrgStep } from "./joinOrgStep"

//figure out how to deal with props in this sense
export function OrganizationStep() {

    return (
        <>
            {OrgExists === true ? <JoinOrgStep /> : <CreateOrgForm />}
        </>
    )
}