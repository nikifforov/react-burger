import { useState, useCallback } from "react";
import { useDispatch} from "react-redux";
import { orderClear } from "../services/actions/order-details-actions";
import { removeIngredientDetails } from "../services/actions/ingredient-details-actions";
import { burgerConstructorAllClear } from "../services/actions/burget-constructor-actions";

export const useModal = () => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const dispatch = useDispatch();

  const openModal = useCallback(
    () => {
      setIsModalOpen(true);
    },
    [],
  );

  const closeModalDetails = useCallback(
    () => {
      setIsModalOpen(false);
      dispatch(removeIngredientDetails())
    },
    [ dispatch ],
  );

  const closeModalOrder = useCallback(
    () => {
      dispatch(orderClear());
      dispatch(burgerConstructorAllClear())
    },
    [ dispatch ],
  );


  return {
    isModalOpen,
    openModal,
    closeModalDetails,
    closeModalOrder
  }

}