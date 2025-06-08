import Navbar from "./Navbar";


export default function DashboardLayout({ children }) {
    return (
        <div className="flex flex-col bg-primary min-h-screen">
            <Navbar />
            {children}
        </div>
    );
}
