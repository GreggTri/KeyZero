export function JoinOrgStep() {
    return (
        <>
            <div> 
                <span>We found your organization from your email.</span>
                <span><b>Organization's Domain:</b> Spinsci.com</span>
            </div>
            <input 
            type="hidden"
            id="actionType" 
            name="actionType" 
            defaultValue="JOIN_ORG"
            />
        </>
    )
}