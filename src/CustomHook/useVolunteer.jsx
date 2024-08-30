import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useVolunteer = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData", email],
    queryFn: () =>
      fetch(
        `https://b9a12-server-side-omi-786-i.vercel.app/donor?email=${email}`
      ).then((res) => res.json()),
    enabled: !!email,
  });

  if (isLoading) return { isVolunteer: false, isLoading: true };

  if (error) return { isVolunteer: false, error: error.message };

  const isVolunteer = data[0]?.role === "volunteer";

  return { isVolunteer, isLoading: false, error: null };
};

export default useVolunteer;
