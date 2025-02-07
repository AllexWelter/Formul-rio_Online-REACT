import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";


function RouteApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export {RouteApp}