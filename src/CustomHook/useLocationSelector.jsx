import axios from "axios";
import { useEffect, useState } from "react";

const useLocationSelector = () => {
  const [loading, setLoading] = useState(true);
  const [district, setDistrict] = useState([]);
  const [upazilla, setUpazilla] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilla, setFilteredUpazilla] = useState([]);
  console.log(filteredUpazilla);
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

  useEffect(() => {
    if (selectedDistrict) {
      const filtered = upazilla.filter(
        (data) => data.district_id === selectedDistrict
      );
      setFilteredUpazilla(filtered);
    } else {
      setFilteredUpazilla([]);
    }
  }, [selectedDistrict, upazilla]);

  return {
    loading,
    district,
    selectedDistrict,
    setSelectedDistrict,
    filteredUpazilla,
  };
};

export default useLocationSelector;
