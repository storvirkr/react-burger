import React, { useState, useMemo, useCallback, useEffect } from "react";
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
  addItem,
  SORT_ITEMS,
} from "../../services/actions/burger-constructor";
import BurgerConstructorItems from "./burger-constructor-items/burger-constructor-items";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import {
  closeModal,
  getOrderId,
  updateOrderModal,
} from "../../services/actions/modal";
import {v4 as uuidv4} from 'uuid';


const BurgerConstructor = () => {
  const [, dropTarget] = useDrop({
    accept: "item",
    drop({ item }) {
      const ingredientID =  uuidv4();
      dispatch(addItem(item, ingredientID))
    },
  });

  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  const buns = useSelector((state) => state.burgerConstructorReducer.bun);
  const fillings = useSelector(
    (state) => state.burgerConstructorReducer.ingredients
  );

  useMemo(() => {
    let sumFillings = fillings.reduce((acc, item) => acc + item.price, 0);
    let sumBuns = buns.price ? buns.price * 2 : 0;
    setTotalPrice(sumFillings + sumBuns);
  }, [fillings, buns]);


  useEffect(() => {
    let cartId = [];
    fillings.forEach((ingredient) => {
      cartId.push(ingredient._id);
    });

    if (buns.type) {
      cartId.push(buns._id, buns._id);
    }

    dispatch(updateOrderModal(cartId));
  }, [buns, fillings]);

  const closeOrderModal = () => {
    dispatch(closeModal());
  };

  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const orderModal = useSelector((store) => store.modalReducer.orderModal);
  const navigate = useNavigate();

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
  const handleSubmit = (e, cartId) => {
    e.preventDefault();

    if (!buns.type || fillings.length === 0) {
      alert("добавьте ингредиенты");
      return;
    }

    if (!isAuth) {
      navigate("/login");
      return;
    }

    const body = {
      ingredients: cartId,
    };

    dispatch(getOrderId(body));
  };

  

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
          type="primary"
          size="large"
          onClick={(e) => handleSubmit(e, orderModal.cartId[0])}
          htmlType="button"
        >
          Оформить заказ
        </Button>
      </div>
      {orderModal.isVisible && (
        <Modal title="" closeHandler={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
export default BurgerConstructor;