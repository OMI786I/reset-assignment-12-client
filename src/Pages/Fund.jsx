import { loadStripe } from "@stripe/stripe-js";

const Fund = () => {
  const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
  return <div>This is fund</div>;
};

export default Fund;
