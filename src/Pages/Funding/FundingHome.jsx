import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const FundingHome = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://b9a12-server-side-omi-786-i.vercel.app/donor").then(
        (res) => res.json()
      ),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // Filter the data to only include those with a donation
  const filteredData = data.filter((res) => res.donation);

  return (
    <div>
      <h1 className="text-3xl text-center"> Fund Donors List</h1>
      <div className="flex justify-end">
        <Link to={"/fundForm"}>
          <button className="btn btn-neutral">Give Donation</button>
        </Link>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((res, index) => (
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
                      <div>
                        <div className="font-bold">{res.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {res.donation}
                    </span>
                  </td>
                  <td>{res.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FundingHome;
