import { Helmet } from "react-helmet-async";
import banner from "../../assets/banner.jpg";
import { Link } from "react-router-dom";
import "./Home.css"

const Home = () => {
  return (
    <div
      className="body flex justify-center "
      // style={{
      //   backgroundImage: `url(${banner})`,
      //   backgroundSize: "contain",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div
        className="image"
        style={{
          flex: "2",
        }}
      >
        <img src={banner} className="" alt="image" />
      </div>

      <div
        className="flex content-center items-center"
        style={{
          flex: "1",
        }}
      >
        <div className=" title flex flex-col gap-10 max-w-[500px] mx-auto">
          <h1 className="title-header text-primary">
            ECOSYNC WASTE MANAGEMENT
          </h1>
          <p className="title-desc text-center text-secondary">
            Efficiently coordinating landfill operations and transfer stations
            for a cleaner tomorrow.
          </p>
          <div className="login">
            <Link
              to="/login"
              className="btn btn-info btn-wide  rounded-full text-white"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
