import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Questionario } from "../pages/Questionario";
import { Resultado } from "../pages/Resultado";

function RouteApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/questionario" element={<Questionario />} />
                <Route path="/resultado" element={<Resultado />} />
            </Routes>
        </BrowserRouter>
    )
}

export {RouteApp}
