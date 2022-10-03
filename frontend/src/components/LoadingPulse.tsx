export const LoadingPulse = () => {
    return (
        <div className="flex flex-column">
            <div className="bg-feather-primary m-4 h-5 rounded-full w-5 animate-ping"></div>
            <div className="bg-feather-primary m-4 h-5 rounded-full w-5 animate-ping"></div>
            <div className="bg-feather-primary m-4 h-5 rounded-full w-5 animate-ping"></div>
        </div>
    )
}
