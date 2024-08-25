import { useEffect, useState } from "react";
import axios from "axios";

const Area = () => {
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

  return (
    <div>
      <form>
        {" "}
        <div className="form-control">
          {" "}
          <label htmlFor="district">district:</label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option disabled selected>
              Select district
            </option>
            {district.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          {" "}
          <label htmlFor="upazilla">upazilla:</label>
          <select id="upazilla" disabled={!selectedDistrict}>
            <option disabled selected>
              Select upazilla
            </option>
            {filteredUpazilla.map((upazilla) => (
              <option key={upazilla.id} value={upazilla.id}>
                {upazilla.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Area;
