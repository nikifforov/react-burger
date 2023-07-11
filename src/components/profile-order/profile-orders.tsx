import { useEffect } from 'react';
import styles from "./profile-orders.module.sass"
import OrderInfo from "../order-info/order-info";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  WS_CONNECTION_ORDERS_START,
  WS_CONNECTION_ORDERS_END
} from "../../services/actions/socket-actions"
import { WS_URL } from "../../utils/api"
import Preloader from "../preloader/preloader";



function ProfileOrders () {
  const dispatch = useAppDispatch();

  const { orders } = useAppSelector((store) => store.socketOrders);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const accessToken = token?.split("Bearer ")[1];
    dispatch({
      type: WS_CONNECTION_ORDERS_START,
      payload: `${WS_URL}?token=${accessToken}`,
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_ORDERS_END,
        payload: "disconnect",
      });
    };
  }, [dispatch]);



  return (
    <div className={`${styles.history} custom-scroll`}>
      { orders.length > 0 ? (
        orders.map((item) => {
          return (
            <OrderInfo order={item} key={item._id}/>
          )
        })
      ) : (
        <Preloader/>
      ) }

    </div>
  );
}

export default ProfileOrders;