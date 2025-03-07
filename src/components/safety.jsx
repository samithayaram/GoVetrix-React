import { Link } from "react-router-dom";
import safety1 from "../assets/safety1.jpg";
import safety2 from "../assets/safety2.jpg";
import safety3 from "../assets/safety3.jpg";
import safety4 from "../assets/safety4.jpg";
import safety5 from "../assets/safety5.jpg";
import safety6 from "../assets/safety6.jpg";

const Safety = () => {
  const safetyImages = [safety1, safety2, safety3, safety4, safety5, safety6];

  return (
    <div className="bg-black text-white flex flex-col items-center p-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Safety for All
      </h2>
      <p className="text-base md:text-lg leading-relaxed text-center mb-6 max-w-3xl">
        Safety in ride-sharing apps is a top priority to protect both passengers and drivers. Modern ride-sharing platforms incorporate multiple safety features such as background checks, real-time tracking, and emergency assistance.
      </p>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
        {safetyImages.map((img, index) => (
          <div 
            key={index} 
            className="group relative rounded-lg overflow-hidden bg-gray-100 shadow-lg flex justify-center items-center h-40 sm:h-64"
          >
            <img
              src={img}
              alt={`Safety ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          to="/safety"
          className="bg-[#4dfad4] px-6 py-3 text-black rounded-md hover:bg-[#22f0c3] transition font-bold text-center"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default Safety;
