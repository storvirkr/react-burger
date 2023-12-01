import React, { useEffect } from 'react';
import styles from './pages.module.css';
import { useParams } from 'react-router';
import {useAppDispatch, useAppSelector} from "../components/hooks/custom-hook";
import { wsFeedClose, wsFeedInit } from '../services/actions/ws-actions';
import { WSURL } from '../utils/api-request';
import { TOrder } from '../utils/types';
import { selectFeedIngredient } from '../services/actions/modal';
import FeedConstructor from '../components/feed-constructor-element/feed-constructor';

export const OrderPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const feedMessages = useAppSelector((store) => store.webSocket.feedMessages);
  const length = feedMessages.length;

  useEffect(() => {
    dispatch(wsFeedInit(`${WSURL}/all`));
    return () => {
      dispatch(wsFeedClose());
    }
  }, [dispatch]);

  useEffect(() => {
    if (length > 0 && length < 2) {
      const orderObj = feedMessages[length - 1].orders.filter((order: TOrder) => order._id === params.id);
      dispatch(selectFeedIngredient(orderObj[0]))
    }
  }, [length])

  return (
    <section className={styles.order}>
      <FeedConstructor type='page' />
    </section>
  )
};