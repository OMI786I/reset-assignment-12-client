import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../Component/CheckOutForm";

const Fund = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
  console.log(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckOutForm></CheckOutForm>
      </Elements>
    </div>
  );
};

export default Fund;
