import { Link } from "react-router-dom";
import middleImage from "../assets/middle-image.jpg";

const Banner = () => {
  return (
    <div className="bg-black text-white flex flex-col md:flex-row items-center p-10 space-y-6 md:space-y-0 md:space-x-10">
      {/* Image Box */}
      <div className="md:w-1/2 lg:w-4/12 w-full flex justify-center">
        <img
          className="w-full h-auto object-cover rounded-lg"
          src={middleImage}
          alt="Generic placeholder"
        />
      </div>
      
      {/* Content Box */}
      <div className="md:w-7/12 lg:w-8/12 w-full text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Know Us Better<br />
          {/* <span className="text-gray-400">See for yourself.</span> */}
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi qui quia quidem exercitationem dolorem libero placeat possimus vitae laudantium asperiores ea nam quos illum, ab harum neque fugiat veritatis est!
          Pariatur voluptatibus quae vel assumenda. Id quidem corporis laudantium repellendus quaerat est ipsum nemo accusantium, officiis delectus neque aliquid magni culpa nulla! Quisquam quasi, asperiores corrupti sint labore molestiae modi!
        </p>
        <div className="mt-6 flex justify-center">
          <Link to="/about" className="bg-[#4dfad4] px-6 py-3 text-black rounded-md hover:bg-[#22f0c3] transition font-bold text-center w-full md:w-auto">
            Read More here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
