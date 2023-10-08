import React from "react";
import pagesStyles from "./pages.module.css";


export const NotFoundPage = () => {
    return (
        <main className={pagesStyles.main}>
            <div className={pagesStyles.container}>
                <div className={pagesStyles.info}>
                    <p className="text text_type_main-large">Страница не найдена. Ошибка 404</p>
                </div>
            </div>
        </main>
    );
};