import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ProvideAuth} from "../../utils/auth";
import {MainPage} from "../../pages/main-page";
import {LoginPage} from "../../pages/login-page";
import {RegisterPage} from "../../pages/register-page";
import {ForgotPasswordPage} from "../../pages/forgot-password";
import {ResetPasswordPage} from "../../pages/reset-password";
import {ProfilePage} from "../../pages/profile-page";
import {NotFoundPage} from "../../pages/not-found-page";
import {useDispatch} from "react-redux";
import {loadIngredients} from "../../services/actions/ingredients-actions";
import {ProtectedRoute} from "../protected-route/protected-route";
import AppHeader from "../app-header/app-header";

export default function App() {
    const dispatch = useDispatch();

    React.useEffect(() => {
            dispatch(loadIngredients());
        },
        [dispatch]
    );

    return (
        <ProvideAuth>
            <AppHeader/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<ProtectedRoute anonymous={true}><LoginPage/></ProtectedRoute>}/>
                    <Route path="/register"
                           element={<ProtectedRoute anonymous={true}><RegisterPage/></ProtectedRoute>}/>
                    <Route path="/forgot-password"
                           element={<ProtectedRoute anonymous={true}><ForgotPasswordPage/></ProtectedRoute>}/>
                    <Route path="/reset-password"
                           element={<ProtectedRoute anonymous={true}><ResetPasswordPage/></ProtectedRoute>}/>
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
                    <Route path="/ingredients/:id" element={<MainPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
        </ProvideAuth>
    );
}