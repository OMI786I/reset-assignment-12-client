import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import UpdateProfile from "../Component/Dashboard/UpdateProfile";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [isDisable, setIsDisable] = useState(true);
  console.log(user);

  const enableButton = () => {
    setIsDisable(false);
  };

  const fetchData = useCallback(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/donor?email=${user.email}`)
      .then((assignment) => {
        setData(assignment.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [user.email]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(data);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else
    return (
      <div>
        {data.map((res) => (
          <div
            key={res._id}
            className="card my-5 card-side bg-base-100 shadow-xl"
          >
            <figure>
              <img src={res.image} className="w-52" alt="Movie" />
            </figure>
            <div className="card-body">
              <h2 className="">
                <span className="font-bold">User Name: </span>
                {res.name}
              </h2>
              <h2 className="">
                <span className="font-bold">User Email: </span>
                {res.email}
              </h2>
              <h2 className="">
                <span className="font-bold">User Address: </span>
                {res.district}, {res.upazilla}
              </h2>
              <h2 className="">
                <span className="font-bold">Blood Group: </span>
                <div className="badge badge-error gap-2 text-white">
                  {res.blood}
                </div>
              </h2>
              <button onClick={enableButton} className="btn btn-neutral">
                edit
              </button>
            </div>
          </div>
        ))}
        <div className="w-full ">
          <UpdateProfile
            isDisable={isDisable}
            data={data}
            onUpdate={fetchData}
            setIsDisable={setIsDisable}
          ></UpdateProfile>
        </div>
      </div>
    );
};

export default Profile;
