import React, { useState, useMemo, useCallback } from "react";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import OrderDetails from "./order-detail/order-detail";
import Modal from "../modal/modal";
import {
  ADD_ITEM_TO_CONSTRUCTOR,
  SORT_ITEMS,
} from "../../services/actions/burger-constructor";
import BurgerConstructorItems from "./burger-constructor-items/burger-constructor-items";
import { useDrop } from "react-dnd";
import { createOrderList } from "../../services/actions/order";

const BurgerConstructor = () => {
  const [, dropTarget] = useDrop({
    accept: "item",
    drop({ item }) {
      dispatch({
        type: ADD_ITEM_TO_CONSTRUCTOR,
        payload: { ...item },
      });
    },
  });

  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  const isLoading = useSelector(
    (state) => state.orderReducer.orderLoading
  );
  
  const buns = useSelector((state) => state.burgerConstructorReducer.bun);
  const fillings = useSelector(
    (state) => state.burgerConstructorReducer.ingredients
  );

  useMemo(() => {
    let sumFillings = fillings.reduce((acc, item) => acc + item.price, 0);
    let sumBuns = buns.price ? buns.price * 2 : 0;
    setTotalPrice(sumFillings + sumBuns);
  }, [fillings, buns]);

  const postOrder = () => {
    if (fillings.length && buns.price > 0) {
      const orderArrIdAll = [...fillings, buns, buns];
      dispatch(createOrderList(orderArrIdAll));
    } else {
      alert("добавьте ингредиенты");
    }
  };

  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch({
        type: SORT_ITEMS,
        dragIndex,
        hoverIndex,
      });
    },
    [dispatch]
  );

  const isOrderDetailsOpened = useSelector(
    (state) => state.orderReducer.isOrderDetailsOpened
  );

  return (
    <section className={burgerConstructorStyle.container} ref={dropTarget}>
      <div className={burgerConstructorStyle.items_container}>
        <div
          className={burgerConstructorStyle.items_fixed_top}
          ref={dropTarget}
        >
          {buns.type && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${buns.name} (верх)`}
              price={buns.price}
              thumbnail={buns.image}
            />
          )}
        </div>
        <div
          className={`${burgerConstructorStyle.items_dinamyc_container} custom-scroll`}
          ref={dropTarget}
        >
          {fillings.map((item, index) => (
            <BurgerConstructorItems
              items={item}
              index={index}
              moveItem={moveItem}
              key={item.ingredientID}
            />
          ))}
        </div>
        <div
          className={burgerConstructorStyle.items_fixed_bot}
          ref={dropTarget}
        >
          {buns.type && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${buns.name} (верх)`}
              price={buns.price}
              thumbnail={buns.image}
            />
          )}
        </div>
      </div>
      <div className={`${burgerConstructorStyle.make_order} pt-10 pl-10`}>
        <p className="text text_type_main-large">{totalPrice}</p>
        <span className={`pr-10 pl-3`}>
          <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => postOrder()}
        >
          Оформить заказ
        </Button>
      </div>
      {isOrderDetailsOpened && (
        <Modal title="">
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
export default BurgerConstructor;
