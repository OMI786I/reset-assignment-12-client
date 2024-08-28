import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

const ContentManagement = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:5000/blog").then((res) => res.json()),
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
    <div className="p-2">
      <h1 className="text-3xl text-center">Blogs Page</h1>
      <div className="flex justify-end">
        <Link to={"/dashboard/blogForm"}>
          {" "}
          <button className="btn btn-neutral">Add Blogs</button>
        </Link>
      </div>

      <div className="grid md:grid-cols-1 gap-4 p-2">
        {data.map((res) => (
          <div
            key={res._id}
            className="card w-[90%] bg-base-100 shadow-2xl rounded-lg overflow-hidden transform "
          >
            <figure className="relative">
              <img
                src={res.image}
                alt="Blog Thumbnail"
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h2 className="text-white text-2xl font-semibold">
                  {res.title}
                </h2>
              </div>
            </figure>
            <div className="card-body p-6">
              <p className="text-gray-700 text-base leading-relaxed">
                {res.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
