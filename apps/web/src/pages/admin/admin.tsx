import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Setting from "./components/Setting";

export default function admin() {
    return(
        <>
            <div className="flex flex-row bg-[#1E293B] ">
                <Sidebar />
                <main className="flex-1 bg-[#1E293B] p-6">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    {/* <Route path="/setting" element={<Setting />} /> */}
                    {/* Các router khác */}
                </Routes>
                </main>
            </div>
        </>
    )
}