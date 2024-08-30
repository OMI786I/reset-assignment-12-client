import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCross, FaSearch } from "react-icons/fa";
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
        `https://b9a12-server-side-omi-786-i.vercel.app/donor?district=${district}&upazilla=${upazilla}&blood=${blood}`
      )
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [getData]);
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
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>image</th>
                <th>Name</th>
                <th>District</th>
                <th>Upazilla</th>
                <th>email</th>
                <th>Blood</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data && data.length > 0 ? (
                data.map((res, index) => (
                  <tr key={res._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={res.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {res.name}
                      <br />
                    </td>
                    <td>{res.district}</td>
                    <td>{res.upazilla}</td>
                    <td>{res.email}</td>
                    <td>{res.blood}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                ))
              ) : (
                <tr>
                  <p className="text-red-600 text-center text-5xl flex items-center">
                    <FaSearch></FaSearch>Not found
                  </p>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default SearchResult;
