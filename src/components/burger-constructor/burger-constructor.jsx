import React, { useState } from "react";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";
import OrderDetails from "./order-detail/order-detail";
import Modal from "../modal/modal";

const BurgerConstructor = ({ ingredients }) => {
  let constructorData = ingredients.filter((item) => item.type !== "bun");
  let fixedData = ingredients.filter(
    (item) => item.name === "Краторная булка N-200i"
  );

  const [orderDetailIsVisible, setOrderDetailIsVisible] = useState(false);

  function handleOpenModal() {
    setOrderDetailIsVisible(true);
  }
  function handleClose() {
    setOrderDetailIsVisible(false);
  }

  return (
    <div className={burgerConstructorStyle.container}>
      <div className={burgerConstructorStyle.items_container}>
        <div className={burgerConstructorStyle.items_fixed_top}>
          {fixedData.map((item) => (
            <ul>
              <li className={burgerConstructorStyle.list} key={Date.now()}>
                <ConstructorElement
                  type="top"
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  isLocked={true}
                />
              </li>
            </ul>
          ))}
        </div>
        <div
          className={`${burgerConstructorStyle.items_dinamyc_container} custom-scroll`}
        >
          {constructorData.map((item) => (
            <ul className={burgerConstructorStyle.items_dinamyc}>
              <li className={burgerConstructorStyle.list} key={Date.now()}>
                <ConstructorElement
                  isLocked={false}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            </ul>
          ))}
        </div>
        <div className={burgerConstructorStyle.items_fixed_bot}>
          {fixedData.map((item) => (
            <ul>
              <li className={burgerConstructorStyle.list} key={Date.now()}>
                <ConstructorElement
                  type="bottom"
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  isLocked={true}
                />
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div className={`${burgerConstructorStyle.make_order} pt-10 pl-10`}>
        <p className="text text_type_main-large">12000</p>
        <span className={`pr-10 pl-3`}>
          <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOpenModal}
        >
          Оформить заказ
        </Button>
      </div>
      {orderDetailIsVisible && (
        <Modal onClose={handleClose}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};
export default BurgerConstructor;
