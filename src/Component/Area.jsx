import { useEffect, useState } from "react";
import axios from "axios";

const Area = () => {
  const [loading, setLoading] = useState(true);
  const [district, setDistrict] = useState([]);
  const [upazilla, setUpazilla] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilla, setFilteredUpazilla] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios
      .get("district.json")
      .then((value) => {
        setDistrict(value.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    setLoading(true);

    axios
      .get("upazilla.json")
      .then((value) => {
        setUpazilla(value.data);
        console.log(value.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return <div></div>;
};

export default Area;
