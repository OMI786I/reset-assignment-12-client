import { useLoaderData } from "react-router-dom";

const MyDonationDetails = () => {
  const data = useLoaderData();
  console.log(data);

  return <div>Thisis my donation details page</div>;
};

export default MyDonationDetails;
