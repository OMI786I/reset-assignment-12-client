import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useDonor = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        `https://b9a12-server-side-omi-786-i.vercel.app/donor?email=${email}`
      ).then((res) => res.json()),
    enabled: !!email,
  });

  if (isPending) return "Loading";

  if (error) return "An error has occurred: " + error.message;

  return data;
};

export default useDonor;
