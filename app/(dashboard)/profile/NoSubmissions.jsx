export default function NoSubmissions() {
    return (
        <div className="flex flex-col items-center justify-center p-16 text-gray-500">
            <div className="mb-6">
                <svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
                    <path d="M40 120L80 80M80 80L120 40M80 80L120 120M120 120L160 160M120 120L160 80" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <p className="text-lg">No recent submissions</p>
        </div>
    );
}