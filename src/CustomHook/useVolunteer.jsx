import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useVolunteer = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email; // Ensure user is defined

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData", email],
    queryFn: () =>
      fetch(`http://localhost:5000/donor?email=${email}`).then((res) =>
        res.json()
      ),
    enabled: !!email, // Only run query if email exists
  });

  if (isLoading) return { isVolunteer: false, isLoading: true };

  if (error) return { isVolunteer: false, error: error.message };

  const isVolunteer = data[0]?.role === "volunteer";

  return { isVolunteer, isLoading: false, error: null };
};

export default useVolunteer;
