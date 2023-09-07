interface JoinOrgStepProp {
    OrgName: string
}

export function JoinOrgStep(prop: JoinOrgStepProp) {
    return (
        <>
            <div> 
                <span>We found your organization from your email.</span>
                <span><b>Organization's Domain:</b>{prop.OrgName}</span>
            </div>
            <button
            className="bg-primary rounded-md shadow-md my-4 py-1 px-2 text-white font-semibold"
            type="submit"
            name="_action"
            value="JOIN_ORG"
            >
                Join Organization
            </button>
        </>
    )
}