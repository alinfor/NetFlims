import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../actions/actionPerson';
import Loader from '../components/Loader';

const Person = () => {
    const [data, SetData] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        const loadPerson = async () => {
            await dispatch(fetchData());
        };
        loadPerson();
    }, [dispatch]);
    const Person = useSelector(store => store.reducerPerson);
    // console.log(Person)
    useEffect(() => {
        SetData(Person.data)
    }, [Person]);
    console.log(data);
    return (
        //style a mettre plus tard dans le style
        <div style={{position:"relative"}}>
            {data.length ==0 || undefined ? <Loader/>:
            data.map((Person)=>{
                return <div key={Person.id}> 
                {Person.name}
                </div>
            })
            }
          
        </div>
    )
}
export default Person;