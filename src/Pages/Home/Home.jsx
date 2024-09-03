import {
  Hero,
  Featured,
  Explore,
  Ratings,
  Blogs,
  Video,
} from "../../Components";
import PageLoadingSpinner from "../../Components/Common/PageLoading";

const Home = () => {
  return (
    <>
      <Hero />
      <Explore />
      <Featured />
      <Ratings />
      <Blogs />
      <Video />
    </>
  );
};

export default Home;
