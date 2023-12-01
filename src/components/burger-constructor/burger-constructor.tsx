import React, { useState, useMemo, useCallback, useEffect, FormEvent } from "react";
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
import { useAppSelector } from "../hooks/custom-hook";

interface IPopupMessage {
  isVisible: boolean;
  text: string;
}

const BurgerConstructor = () => {
  const [, dropTarget] = useDrop({
    accept: "item",
    //@ts-ignore
    drop( {item}) {
      const ingredientID =  uuid();
      console.log(ingredientID)
      dispatch(addItem(item, ingredientID))
    },
  });

  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  const [popupMessage, setPopupMessage] = useState<IPopupMessage>({
    isVisible: false,
    text: 'Нельзя оформить заказ без булки'
});

  const buns = useSelector((state: any) => state.burgerConstructorReducer.bun);
  const fillings = useSelector(
    (state: any) => state.burgerConstructorReducer.ingredients
  );

  useMemo(() => {
    let sumFillings = fillings.reduce((acc: number, item: TItem) => acc + item.price, 0);
    let sumBuns = buns.price ? buns.price * 2 : 0;
    setTotalPrice(sumFillings + sumBuns);
  }, [fillings, buns]);

  

  useEffect(() => {
    let cartId = [];
    fillings.forEach((ingredient: TItem) => {
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

  const data = useAppSelector((store: any) => store.burgerConstructorReducer);
  const isAuth = useSelector((store: any) => store.authReducer.isAuth);
  const orderModal = useSelector((store: any) => store.modalReducer.orderModal);
  const navigate = useNavigate();

  const moveItem = (dragIndex: number, hoverIndex: number): void => {
    const dragCard = data.ingredients[dragIndex]
    const newCart = [...data.ingredients];
    newCart.splice(dragIndex, 1);
    newCart.splice(hoverIndex, 0, dragCard);

    dispatch(setCart(newCart));
};
const handleSubmit = (): void => {

  if (data.bun.type && data.ingredients.length === 0) {
      setPopupMessage({
          isVisible: true,
          text: 'Нельзя заказать только булки, необходимо добавить ингредиентов'
      })
      setTimeout(() => {
          setPopupMessage({
              isVisible: false,
              text: ''
          })
      }, 6000)
      return;
  }

  if (!data.bun.type || data.ingredients.length === 0) {
      setPopupMessage({
          isVisible: true,
          text: 'Нельзя оформить заказ без булки'
      })
      setTimeout(() => {
          setPopupMessage({
              isVisible: false,
              text: ''
          })
      }, 6000)
      return;
  }

  if (!isAuth) {
      navigate('/login');
      return;
  }

  const body: {'ingredients': Array<string>} = {
      'ingredients': orderModal.cartId
  };
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
              //@ts-ignore
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
