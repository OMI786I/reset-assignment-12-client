import Banner from "../Component/Banner";
import ContactSection from "../Component/Dashboard/ContactSection";
import FeaturedSection from "../Component/FeaturedSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedSection></FeaturedSection>
      <ContactSection></ContactSection>
    </div>
  );
};

export default Home;
