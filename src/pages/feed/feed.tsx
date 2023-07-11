import { useEffect, useMemo } from 'react';
import styles from "./feed.module.sass";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {WS_CONNECTION_END, WS_CONNECTION_START} from "../../services/actions/socket-actions";
import {WS_URL} from "../../utils/api";
import Preloader from "../../components/preloader/preloader";
import OrderInfo from "../../components/order-info/order-info"
import {CREATED, DONE, PENDING} from "../../utils/constants";
import {IOrderInfo} from "../../utils/types";



function Feed () {
  const dispatch = useAppDispatch();
  const { orders, totalToday, total } = useAppSelector((store) => store.socketAllOrders)

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${WS_URL}/all`
    })
    return () => {
      dispatch({
        type: WS_CONNECTION_END,
        payload: "disconnect"
      })
    }
  }, [dispatch]);

  const ordersDone = useMemo(() => {
    return orders
      .filter((item: IOrderInfo) => item.status === DONE)
      .map((item) => item.number)
  }, [orders]);

  const ordersInProgress = useMemo(() => {
    return orders
      .filter((item: IOrderInfo) =>  item.status === PENDING || item.status === CREATED)
      .map((item) => item.number)
  }, [orders]);


  return (

    <>
      { orders.length > 0 ? (
        <div className={styles.feed}>
          <p className={`text text_type_main-large`}>Лента заказов</p>
          <div className={styles.feed__container}>
            <div className={`${styles.feed__block} custom-scroll`}>
              {
                orders.map((item) => {
                  return (
                    <OrderInfo order={item} key={item._id}/>
                  )
                })
              }
                </div>
                <div className={styles.feed__info}>
              <div className={styles.feed__info_status}>
                <div className={`${styles.feed__info_status__block}`}>
                  <p className={`text text_type_main-medium`}>Готовы:</p>
                  <div className={styles.feed__info_status__block_list}>
                    { ordersDone.map((item) => {
                      return (
                        <p key={item} className={`${styles.feed__info_status__done_text} text text_type_digits-default`}>{item}</p>
                      )
                    }) }
                  </div>
                </div>
                <div className={`${styles.feed__info_status__block}`}>
                  <p className={`text text_type_main-medium`}>В работе:</p>
                  <div className={styles.feed__info_status__block_list}>
                    { ordersInProgress.map((item) => {
                      return (
                        <p key={item} className={`text text_type_digits-default`}>{item}</p>
                      )
                    }) }
                  </div>
                </div>
              </div>
              <div className={styles.feed__info_quantity}>
                <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
                <p className={`${styles.feed__info_quantity__number} text text_type_digits-large`}>{total}</p>
              </div>
              <div className={styles.feed__info_quantity}>
                <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
                <p className={`${styles.feed__info_quantity__number} text text_type_digits-large`}>{totalToday}</p>
              </div>
            </div>


          </div>
        </div>
        ) : (
        <Preloader/>
        )}
    </>



  );
}

export default Feed;