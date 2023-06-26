import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import { getBurgerIngredients } from "../../services/actions/get-burger-ingredients-actions";
import Main from "../../pages/main/main";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import ProfileForm from "../profile-form/profile-form";
import { checkUserAuth } from "../../services/actions/auth-actions";
import Preloader from "../preloader/preloader";
import { OnlyAuth, OnlyNotAuth } from "../protected-route/protected-route";
import IngredientsDetails from "../burger-ingredients/ingredients-details/ingredients-details";
import Modal from "../modal/modal";
import Ingredients from "../../pages/ingredients/ingredients";
import ProfileOrderHistory from "../profile-order-history/profile-order-history"
import OrderFeed from "../../pages/order-feed/order-feed";
import { removeIngredientDetails } from "../../services/actions/ingredient-details-actions";
import {IIngredients} from "../../utils/types";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";


function App() {
  const dispatch = useAppDispatch();
  const isLoading  = useAppSelector(store => store.burgerIngredients.isLoading);
  const ingredients: IIngredients[]  = useAppSelector(store => store.burgerIngredients.ingredients);
  const navigate = useNavigate();

  useEffect( () => {
    dispatch(getBurgerIngredients())
    dispatch(checkUserAuth())
  }, [dispatch] );

  const closeModalIngredient = () => {
    dispatch(removeIngredientDetails())
    navigate("/", { replace: true });
  }

  const location = useLocation();
  const state = location.state?.backgroundLocation;

  return (

    <>
      {isLoading && <Preloader/>}

      {!isLoading && (
        <>
          <AppHeader/>

          <Routes location={state || location}>
            <Route
              path="/"
              element={<Main/>}
            />

            <Route
              path="/login"
              element={<OnlyNotAuth component={<Login/>}/>}
            />

            <Route
              path="/register"
              element={<OnlyNotAuth component={<Register/>}/>}
            />

            <Route
              path="/forgot-password"
              element={<OnlyNotAuth component={<ForgotPassword/>}/>}
            />

            <Route
              path="/reset-password"
              element={<OnlyNotAuth component={<ResetPassword/>}/>}
            />

            <Route
              path="/profile"
              element={<OnlyAuth component={<Profile/>}/>}>
              <Route
                index
                element={<ProfileForm/>}
              />
              <Route
                path="/profile/orders"
                element={<ProfileOrderHistory/>}
              />
            </Route>

            <Route
              path="/order-feed"
              element={<OrderFeed/>}
            />

            <Route
              path="/ingredients/:id"
              element={<Ingredients ingredients={ingredients} isLoading={isLoading}/>}
            />

          </Routes>


        </>
      )}

      {state && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title={"Детали ингредиента"} closeModal={closeModalIngredient}>
                <IngredientsDetails ingredients={ingredients} isLoading={isLoading}/>
              </Modal>
            }
          />
        </Routes>
      )}

    </>


  );
}

export default App;
