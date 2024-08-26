import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResult = ({ searchData }) => {
  const [data, setData] = useState();

  const [loading, setLoading] = useState(true);
  const { blood, district, upazilla } = searchData;
  const getData = searchData;

  console.log(getData);

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `http://localhost:5000/donor?district=${getData.district}&upazilla=${getData.upazilla}&blood=${getData.blood}`
      )
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  console.log(data);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else return <div></div>;
};

export default SearchResult;
