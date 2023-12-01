import React, { useEffect } from 'react';
import styles from './pages.module.css';
import {useAppDispatch, useAppSelector} from "../components/hooks/custom-hook";
import { wsFeedClose, wsFeedInit } from '../services/actions/ws-actions';
import { TOrder } from '../utils/types';
import { WSURL } from '../utils/api-request';
import { getCookie } from '../services/cookie';
import { Outlet } from 'react-router';
import { v4 as uuid } from 'uuid';
import OrdersQueue from '../components/orders-queue/orders-queue';
import Loader from '../components/loading/loading';

export const ProfileFeedPage = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((store) => store.webSocket.feedMessages);
  const length = messages.length;

  useEffect(() => {
    dispatch(wsFeedInit(`${WSURL}?token=${getCookie('token')}`));
    return () => {
      dispatch(wsFeedClose());
    }
  }, [dispatch]);

  return (
    <>
      {length > 0
        ? (
          <>
            {messages[length - 1].orders.length > 0
              ?(<div className={`${styles.profile_feed_container} mr-2`}>
                {messages[length - 1].orders.map((order: TOrder) => (
                  <OrdersQueue type='profile' order={order} key={uuid()} />
                ))}
                <Outlet />
              </div>)
              : <h1 className={`${styles.profile_feed_loading} text text_type_main-medium text_color_inactive`}>Вы еще не сделали заказов</h1>
            }
          </>
        )
        : <Loader/>
      }
    </>
  )
}