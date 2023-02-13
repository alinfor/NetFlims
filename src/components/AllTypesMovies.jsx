import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTypes } from "../actions/actionsAllTypes";
import Card from "./Card";
import Loader from "./Loader";

const AllTypesMovies = () => {
  const allTypes = useSelector((store) => store.reducerAllTypes);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchAllTypes());
  }, []);
  
  return (
    <section className="types">
      <h2 className="title">Recommand</h2>
      <div className="card-container">
        {allTypes.length == 0 || undefined ? (
          <Loader />
        ) : (
          allTypes.map((type) => {
            return <Card data={type} key={type.id} />;
          })
        )}
      </div>
    </section>
  );
};
 
export default AllTypesMovies;