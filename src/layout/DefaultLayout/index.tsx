import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";

export function DefaultLayout() {
    return (
        <div className="flex flex-col w-full h-[screen] bg-bg-00">
            <Header />
            <div className="mx-auto w-full max-w-[74rem]">
                <Outlet />
            </div>
        </div>
    )
}