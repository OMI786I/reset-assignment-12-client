import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:5000/donor").then((res) => res.json()),
  });
  console.log(data);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return <div>This is all users</div>;
};

export default AllUsers;
