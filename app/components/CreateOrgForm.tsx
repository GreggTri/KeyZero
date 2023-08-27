export function CreateOrgForm() {
    return (
        <>
            <label htmlFor="">Organization's Name</label>
            <input id="orgName" type="text" className="rounded-sm shadow-sm"/>

            <label htmlFor="">Organization's Phone Number</label>
            <input id="orgPhoneNumber" type="text" className="rounded-sm shadow-sm"/>

            <label htmlFor="">Organization's Email</label>
            <input id="orgEmail" type="text" />
        </>
    )
}