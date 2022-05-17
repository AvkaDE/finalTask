import { observer } from 'mobx-react-lite';
import { React } from 'react';
import Header from '../header/header';
import Login from '../loginForm/login';

const Loginpage = observer(() => {

    return (
        <>
            <Header />
            <Login />
        </>
    )
})
export default Loginpage;