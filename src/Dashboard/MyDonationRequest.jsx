import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MyDonationRequest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  console.log(data);
  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5000/requestDonor?requesterEmail=${user.email}`)
      .then((assignment) => {
        setData(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [user.email]);

  return <div>This is my donation request page</div>;
};

export default MyDonationRequest;
