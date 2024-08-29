import { useQuery } from "@tanstack/react-query";

const FeaturedSection = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch("/Feature.json").then((res) => res.json()),
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
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-700">
          Why Donate Blood?
        </h2>
        <p className="text-lg mb-12 text-black">
          Every donation helps save lives. Here are a few reasons why donating
          blood is so important.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}

          {data.map((res) => (
            <div key={res.title} className="card bg-base-100 w-96 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={res.image}
                  alt="Shoes"
                  className="rounded-xl w-52 h-40"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-blue-600">{res.title}</h2>
                <p>{res.description}</p>
                <div className="card-actions"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
