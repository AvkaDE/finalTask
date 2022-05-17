import { React, useState } from 'react';
import { events } from '../../store';

const Login = () => {
    
    const [data, setData] = useState({
        login: '',
        password: ''
    })

    const handleSubmit = (evt) => {
        evt.preventDefault()
        events.fetchLogin(data).then((password) => {
            if (events.logindata.id) {
                localStorage.setItem('isAuth', true);
                localStorage.setItem('userData', JSON.stringify({...events.loginData, password}))
                window.location.reload()
            }
            else {
                alert(events.logindata.message)
            }
        })
    }   

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setData({...data, [name]: value})
    }

    return (
        <div className='login__wrapper'>
            <form action="" className='board login__form'>
                <h1>Авторизация</h1>
                <div className='input__container'>
                    <div className='input'>
                        <label htmlFor="login">Логин</label>
                        <input onChange={handleChange} className='form__item' type="email" name="login" required />
                    </div>
                    <div className='input'>
                        <label htmlFor="password">Пароль</label>
                        <input onChange={handleChange} className='form__item' type="password" name="password" required />
                    </div>
                </div>
                <button type="submit" onClick={handleSubmit} className='success__button'>Вход</button>
            </form>
        </div>
    )
}
export default Login;