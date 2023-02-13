import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [error, setError] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
      const fetchData = async() => {
          setLoading(true)    
          try{
              const res = await fetch(url)
              const json = await res.json()
              setData(json)
              setLoading(false)
          }
          catch(error){
              setError(error)
              setLoading(false)
          }
      };
      fetchData()
  },[])

  return {loading, error, data}

};

export default useFetch;

// Pour l'utiliser import puis    const {loading, error, data } = useFetch("http://localhost:1337/api/reviews")