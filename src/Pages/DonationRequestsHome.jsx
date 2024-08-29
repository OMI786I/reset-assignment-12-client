import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const DonationRequestsHome = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:5000/requestDonor").then((res) => res.json()),
  });
  console.log(data);
  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1 className="text-3xl text-center">All Blood Donation Requests</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Recipient Name</th>
                <th>Recipient location</th>
                <th>Donation Date</th>
                <th>Donation Time</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data.map((res, index) => (
                <tr key={res._id} className="bg-base-200">
                  <th>{index + 1}</th>
                  <td>{res.recipientName}</td>
                  <td>
                    {res.district} , {res.upazilla}
                  </td>
                  <td>{res.donationDate}</td>
                  <td>{res.donationTime}</td>

                  {res.donationStatus === "pending" ? (
                    <td className="text-red-600">{res.donationStatus}</td>
                  ) : (
                    <td className="text-yellow-500 ">{res.donationStatus}</td>
                  )}

                  <td>
                    <Link to={`/donationRequestDetails/${res._id}`}>
                      <button className="btn btn-neutral">
                        <FaSearch />
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonationRequestsHome;
