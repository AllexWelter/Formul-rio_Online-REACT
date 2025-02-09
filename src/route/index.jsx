import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Questionario } from "../pages/Questionario";

function RouteApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/questionario" element={<Questionario />} />
            </Routes>
        </BrowserRouter>
    )
}

export {RouteApp}
