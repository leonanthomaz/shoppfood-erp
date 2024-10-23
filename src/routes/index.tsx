import React from "react";
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from "../pages/NotFoundPage";
import DashboardPage from "../pages/Dashboard";
import Login from "../pages/Login";
import PrivateRoute from './PrivateRoute';
import ProductPage from "../pages/Product";
import User from "../pages/User";
import StoreAdminForm from "../pages/Store/StoreAdminForm";
import StoreEditForm from "../pages/Store/StoreEditForm";
import DeliveryMap from "../pages/Delivery/DeliveryMap";
import Settings from "../pages/Settings";
import AdminPage from "../pages/Admin";
import RecoveryRequest from "../pages/RecoveryRequest";
import ResetPassword from "../pages/ResetPassword";
import WelcomeNewStore from "../pages/ResetPassword/WelcomeNewStore";
import ClientsPage from "../pages/Client";
import FinancePage from "../pages/Finance";
import StorePage from "../pages/Store";
import OrdersPage from "../pages/Order";

const AppRoute: React.FC = () => {
    return (
        <>
        <Routes>
            {/* ROTA COMUM */}
            <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/welcome" element={<PrivateRoute><WelcomeNewStore /></PrivateRoute>} />

            {/* ROTA LOGIN */}
            <Route path="/login" element={<Login />} />

            {/* REDEFINIÇÃO DE SENHA */}
            <Route path="/recover-password" element={<RecoveryRequest />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* ROTA USUÁRIO */}
            <Route path="/users" element={<PrivateRoute><User/></PrivateRoute>} />

            {/* ROTA LOJA */}
            <Route path="/create-store" element={<PrivateRoute><StoreAdminForm/></PrivateRoute>} />
            <Route path="/edit-store" element={<PrivateRoute><StoreEditForm/></PrivateRoute>} />

            {/* ROTA ENTREGA */}
            <Route path="/delivery" element={<PrivateRoute><DeliveryMap/></PrivateRoute>} />

            {/* ROTA ADMINISTRADOR */}
            <Route path="/admin" element={<PrivateRoute><AdminPage/></PrivateRoute>} />

            {/* ROTA CONFIGURAÇÃO */}
            <Route path="/settings" element={<PrivateRoute><Settings/></PrivateRoute>} />

            {/* ROTA PRODUTOS */}
            <Route path="/products" element={<PrivateRoute><ProductPage /></PrivateRoute>} />

             {/* ROTA CLIENTES */}
             <Route path="/clients" element={<PrivateRoute><ClientsPage /></PrivateRoute>} />

            {/* ROTA FINANCEIRO */}
            <Route path="/finance" element={<PrivateRoute><FinancePage /></PrivateRoute>} />

            {/* ROTA ENTREGA */}
            <Route path="/store" element={<PrivateRoute><StorePage/></PrivateRoute>} />

            {/* ROTA ENTREGA */}
            <Route path="/orders" element={<PrivateRoute><OrdersPage/></PrivateRoute>} />
           
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </>
    );
}

export default AppRoute;
