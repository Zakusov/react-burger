import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ProvideAuth} from "../../utils/auth";
import {ProtectedRouteElement} from "../protected-route/protected-route";
import {MainPage} from "../../pages/main-page";
import {LoginPage} from "../../pages/login-page";
import {RegisterPage} from "../../pages/register-page";
import {ForgotPasswordPage} from "../../pages/forgot-password";
import {ResetPasswordPage} from "../../pages/reset-password";
import {ProfilePage} from "../../pages/profile-page";
import {NotFoundPage} from "../../pages/not-found-page";

export default function App() {
    return (
        <ProvideAuth>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                    <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                    <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage/>}/>}/>
                    <Route path="/ingredients/:id" element={<MainPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
        </ProvideAuth>
    );
}