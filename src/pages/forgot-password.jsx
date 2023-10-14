import React, {useEffect, useState} from "react";
import styles from './pages.module.css';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {requestRecovery} from "../services/actions/auth";

export const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector(store => store.authReducer);
    const [inputs, setInputs] = useState({
        email: ''
    })
    const inputRef = React.useRef(null)

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const body = {
            "email": inputs.email
        }
        
        dispatch(requestRecovery(body));
        navigate(`/reset-password`);
    };

    useEffect(() => {
        if (!data.isForgot) {
            data.isAuth === true ? navigate('/profile') : navigate('/login')
        }
    }, [data.isForgot, data.isAuth]);

    useEffect(() => {
        if (data.recoveryRequest) {
            navigate(`/reset-password`);
        }
    }, [data.recoveryRequest])

    return (
        <section className={styles.login}>
            <form className={styles.loginForm} onSubmit={onSubmitHandler}>
                <h1 className="text text_type_main-medium">Восстановление пароля</h1>

                <Input
                    type={'email'}
                    placeholder={'Укажите ваш e-mail'}
                    onChange={e => setInputs({
                        ...inputs,
                        email: e.target.value
                    })}
                    error={false}
                    value={inputs.email}
                    ref={inputRef}
                    errorText={'Ошибка'}
                />

                <Button
                    type="primary"
                    size="large"
                >
                    Восстановить
                </Button>
            </form>

            <div className={`${styles.loginService} mt-20`}>
                <p className="text text_type_main-default text_color_inactive mb-4">
                    Вспоинили пароль?
                    <Link
                        className={styles.loginLink}
                        to='/login'
                    > Войти</Link>
                </p>
            </div>
        </section>
    );
};