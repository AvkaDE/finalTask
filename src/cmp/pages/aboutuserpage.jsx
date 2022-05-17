import { React } from 'react';
import Aboutuser from '../profile/aboutuser';
import Header from '../header/header';
import { useParams } from 'react-router';

const Aboutuserpage = () => {

    const params = useParams()

    return (
        <>
            <Header />
            <Aboutuser id={params.id}/>
        </>
    )
}
export default Aboutuserpage;