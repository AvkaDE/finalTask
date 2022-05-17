import { React } from 'react';
import { useParams } from 'react-router';
import Create from '../createEvent/create';
import Header from '../header/header';

const Editpage = () => {
  const params = useParams()

    return (
        <>
            <Header />
            <Create id={params.id} isEdit={true}/>
        </>
    )
}
export default Editpage;