import React, { useEffect } from "react";
import styles from "./pages.module.css";
import OrdersQueue from "../components/orders-queue/orders-queue";
import {
  useAppDispatch,
  useAppSelector,
} from "../components/hooks/custom-hook";
import { wsFeedInit, wsFeedClose } from "../services/actions/ws-actions";
import { WSURL } from "../utils/api-request";
import { TOrder } from "../utils/types";
import { Outlet } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Loader from "../components/loading/loading";

export const FeedPage = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((store) => store.webSocket.feedMessages);
  const length = messages.length;

  useEffect(() => {
    dispatch(wsFeedInit(`${WSURL}/all`));
    return () => {
      dispatch(wsFeedClose());
    };
  }, [dispatch]);

  return (
    <>
      {length > 0 ? (
        <section className={`${styles.feed} mt-10`}>
          <div className={styles.orders}>
            <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
            <div className={styles.ordersContainer}>
              {length > 0 &&
                messages[length - 1].orders.map((order: TOrder) => (
                  <OrdersQueue type="feed" order={order} key={uuid()} />
                ))}
            </div>
          </div>

          <div>
            <div className={styles.info}>
              <div className={styles.stats}>
                <div className={styles.statsCard}>
                  <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
                  <div className={styles.statsQueue}>
                    <div>
                      {length > 0 &&
                        messages[length - 1].orders.map(
                          (order: TOrder) =>
                            order.status === "done" && (
                              <p
                                className={`${styles.statsQueueReady} text text_type_digits-default`}
                                key={uuid()}
                              >
                                {order.number}
                              </p>
                            )
                        )}
                    </div>
                  </div>
                </div>

                <div className={styles.statsCard}>
                  <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                  <div className={styles.statsQueue}>
                    {length > 0 &&
                      messages[length - 1].orders.map(
                        (order: TOrder) =>
                          order.status === "pending" && (
                            <p
                              className="text text_type_digits-default"
                              key={uuid()}
                            >
                              {order.number}
                            </p>
                          )
                      )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text text_type_main-medium">
                  Выполнено за все время:
                </h3>
                {length > 0 && (
                  <h1
                    className={`${styles.statsCount} text text_type_digits-large`}
                  >
                    {messages[length - 1].total}
                  </h1>
                )}
              </div>

              <div>
                <h3 className="text text_type_main-medium">
                  Выполнено за сегодня:
                </h3>
                {length > 0 && (
                  <h1
                    className={`${styles.statsCount} text text_type_digits-large`}
                  >
                    {messages[length - 1].totalToday}
                  </h1>
                )}
              </div>
            </div>
          </div>

          <Outlet />
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};
