import { CreateOrgForm } from "./CreateOrgForm"
import { JoinOrgStep } from "./JoinOrgStep"

interface OrganizationStepProp {
    OrgExists: boolean;
    OrgName: string
}

export function OrganizationStep(prop: OrganizationStepProp) {


    return (
        <>
            {prop.OrgExists === true ? <JoinOrgStep OrgName={prop.OrgName} /> : <CreateOrgForm />}
        </>
    )
}