import { FC, useRef } from "react";
import burgerConstructorItemStyles from "./burger-constructor-items.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { IConstructorElements } from "../../../utils/types";
import { REMOVE_FROM_CART } from "../../../services/constants/constructor-types";
import { removeFromCart } from "../../../services/actions/burger-constructor";


declare module 'react' {
  interface FunctionComponent<P = {}> {
      (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}


const BurgerConstructorItems: FC<IConstructorElements> = ({ items, index, moveItem }) => {
  const dispatch = useDispatch();

  const id = items._id;
  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const ref = useRef<HTMLDivElement>(null);
  
  const [, drop] = useDrop({
    accept: "ingredient",
    hover: (item: {id: number; index: number}, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
 
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
    
      const clientOffset = monitor.getClientOffset();
      
      if (hoverBoundingRect && clientOffset) {
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }
    }
      moveItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const handleDelete = (index: number) => {
    dispatch(removeFromCart(index));
};


  return (
    <div
      className={burgerConstructorItemStyles.constructorItem}
      style={{ opacity }}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={items.name}
        price={items.price}
        thumbnail={items.image}
        handleClose={() => handleDelete(index)}
      />
    </div>
  );
};


export default BurgerConstructorItems;
