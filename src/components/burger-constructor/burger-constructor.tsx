import React, { useState, useMemo, useEffect } from "react";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";
import OrderDetails from "./order-detail/order-detail";
import Modal from "../modal/modal";
import {
  addBun,
  addItem,
  setCart,
} from "../../services/actions/burger-constructor";
import BurgerConstructorItems from "./burger-constructor-items/burger-constructor-items";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import {
  closeModal,
  getOrderId,
  updateOrderModal,
} from "../../services/actions/modal";
import {v4 as uuid} from "uuid";
import { TItem } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../hooks/custom-hook";



const BurgerConstructor = () => {
  const dispatch = useAppDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  
  const data = useAppSelector((store) => store.burgerConstructorReducer);
  const isAuth = useAppSelector((store) => store.authReducer.isAuth);
  const orderModal = useAppSelector((store) => store.modalReducer.orderModal);
  const navigate = useNavigate();


  const [, dropTarget] = useDrop({
    accept: "item",
    //@ts-ignore
    drop({item}) {
      if (item.type === 'bun') {
          dispatch(addBun(item));
          return
      } 
      const ingredientID =  uuid();
      dispatch(addItem(item, ingredientID))
    },
  });

  
  
  const buns = useAppSelector((state: any) => state.burgerConstructorReducer.bun);
  const fillings = useAppSelector(
    (state: any) => state.burgerConstructorReducer.ingredients
  );

  useMemo(() => {
    let sumFillings = data.ingredients.reduce((acc: number, item: TItem) => acc + item.price, 0);
    let sumBuns = data.bun.price ? data.bun.price * 2 : 0;
    setTotalPrice(sumFillings + sumBuns);
  }, [data.ingredients, data.bun]);

  

  useEffect(() => {
    let cartId: Array<string> = [];
    data.ingredients.forEach((ingredient: TItem) => {
      cartId.push(ingredient._id);
    });

    if (data.bun.type && data.bun._id) {
      cartId.push(data.bun._id, data.bun._id);
    }

    dispatch(updateOrderModal(cartId));
  }, [data.bun, data.ingredients]);

  const closeOrderModal = () => {
    dispatch(closeModal());
  };


  const moveItem = (dragIndex: number, hoverIndex: number): void => {
    const dragCard = data.ingredients[dragIndex]
    const newCart = [...data.ingredients];
    newCart.splice(dragIndex, 1);
    newCart.splice(hoverIndex, 0, dragCard);
console.log(newCart)
    dispatch(setCart(newCart));
};

const handleSubmit = (): void => {
  if (!data.bun.type || data.ingredients.length === 0) {
    alert("добавьте ингредиенты");
    return;
  }
 
  if (!isAuth) {
      navigate('/login');
      return;
  }

  const body: {'ingredients': Array<string>} = {
    'ingredients': orderModal.cartId
};
console.log(body)
//@ts-ignore
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
          {fillings.map((item: TItem, index: number) => (
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
        <p className="text text_type_main-large">{`${totalPrice}`}</p>
        <span className={`pr-10 pl-3`}>
          <CurrencyIcon type="primary" />
        </span>
        <Button
          type="primary"
          size="large"
          onClick={handleSubmit}
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