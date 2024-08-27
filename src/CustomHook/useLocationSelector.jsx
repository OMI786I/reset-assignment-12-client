import { useEffect, useState } from "react";
import axios from "axios";

const useLocationSelector = () => {
  const [loading, setLoading] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
  const [filteredUpazillas, setFilteredUpazillas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const districtResponse = await axios.get("/district.json");
        setDistricts(districtResponse.data);
        const upazillaResponse = await axios.get("/upazilla.json");
        setUpazillas(upazillaResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterUpazillas = (districtId) => {
    if (districtId) {
      const filtered = upazillas.filter(
        (data) => data.district_id === districtId
      );
      setFilteredUpazillas(filtered);
    } else {
      setFilteredUpazillas([]);
    }
  };

  return {
    loading,
    districts,
    filteredUpazillas,
    filterUpazillas,
  };
};

export default useLocationSelector;
