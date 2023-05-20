import React, {useEffect} from "react";
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';

import {useDispatch} from "../../services/hooks";
import {ProvideAuth} from "../../utils/auth";
import {MainPage} from "../../pages/main-page";
import {LoginPage} from "../../pages/login-page";
import {RegisterPage} from "../../pages/register-page";
import {ForgotPasswordPage} from "../../pages/forgot-password";
import {ResetPasswordPage} from "../../pages/reset-password";
import {ProfilePage} from "../../pages/profile-page";
import {NotFoundPage} from "../../pages/not-found-page";
import {ProtectedRoute} from "../protected-route/protected-route";
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import FeedOrdersPage from "../../pages/feed-orders";
import FeedOrderPage from "../../pages/feed-order";
import {loadIngredients} from "../../services/thunks";

export default function App() {
    const location = useLocation();
    const state = location.state;
    const background = state?.background;

    const navigate = useNavigate();
    const closeModal = () => {
        navigate(-1);
    };

    const dispatch = useDispatch();
    useEffect(() => {
            dispatch(loadIngredients());
        },
        [dispatch]
    );

    return (
        <ProvideAuth>
            <AppHeader/>
            <Routes location={background || location}>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<ProtectedRoute anonymous={true}><LoginPage/></ProtectedRoute>}/>
                <Route path="/register"
                       element={<ProtectedRoute anonymous={true}><RegisterPage/></ProtectedRoute>}/>
                <Route path="/forgot-password"
                       element={<ProtectedRoute anonymous={true}><ForgotPasswordPage/></ProtectedRoute>}/>
                <Route path="/reset-password"
                       element={<ProtectedRoute anonymous={true}><ResetPasswordPage/></ProtectedRoute>}/>
                <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
                <Route path="/ingredients/:id" element={<IngredientDetails/>}/>
                <Route path="/feed" element={<FeedOrdersPage/>}/>
                <Route path="/feed/:id" element={<FeedOrderPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
            {background && (
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal title="Детали заказа" onClose={closeModal}>
                            <IngredientDetails/>
                        </Modal>
                    }/>
                </Routes>
            )}
        </ProvideAuth>
    );
}