import { Link, useRouteError } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';

function Error() {
    const error = useRouteError();
    const errorMessage = (error as Error)?.message || "An unexpected error occurred.";
    const errorStatus = (error as any)?.status || 500;
    const errorTitle = (errorStatus === 404) ? "Page not found" : "Something went wrong";

    return (
        <div className="py-10 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="text-center bg-white p-6 rounded-lg shadow-lg">
                <p className="text-base font-semibold text-red-600">{errorStatus}</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-webcolor sm:text-5xl">
                    {errorTitle}
                </h1>
                <p className="mt-4 text-base leading-7 text-gray-600">
                    {errorMessage}
                </p>
                <div className="mt-4 flex items-center justify-center gap-x-3">
                    <Link to="/" className="inline-flex items-center btn btn-sm btn-secondary text-sm font-semibold bg-webcolor border-none">
                        <ArrowLeft size={16} className="mr-2" /> Go back Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Error;
