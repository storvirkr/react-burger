import { useRef } from "react";
import burgerConstructorItemStyles from "./burger-constructor-items.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { DELETE_ITEM_FROM_CONSTRUCTOR } from "../../../services/actions/burger-constructor";

const BurgerConstructorItems = ({ items, index, moveItem }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop({
    accept: "ingredient",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  const opacity = isDragging ? 0 : 1;
  const ref = useRef(null);
  drag(drop(ref));

  return (
    <div
      className={burgerConstructorItemStyles.constructorItem}
      style={{ opacity }}
      ref={ref}
    >
      <DragIcon type="main" />
      <ConstructorElement
        text={items.name}
        price={items.price}
        thumbnail={items.image}
        handleClose={() => {
          dispatch({
            type: DELETE_ITEM_FROM_CONSTRUCTOR,
            payload: items,
          });
        }}
      />
    </div>
  );
};

export default BurgerConstructorItems;
