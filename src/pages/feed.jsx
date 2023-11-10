import styles from "./pages.module.css";

export const FeedPage = () => {
  return (
    <>
      <p className="text text_type_main-large">Лента заказов</p>
      <div className={styles.feed}>
        <section className={styles.orders}>
        <div className={styles.ordersList}>
            <ul>
                <li className={styles.ordersListElement}>
                    
                </li>
            </ul>
        </div>
        </section>
        
        <section className={styles.stats}>

        </section>
      </div>
    </>
  );
};
