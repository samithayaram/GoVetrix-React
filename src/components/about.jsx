import { Link } from 'react-router-dom';
import aboutImage from '../assets/img6.jpg';

export default function About() {
  return (
    <section className="bg-black py-16 px-6 md:py-24 md:px-12 lg:px-24 flex flex-col md:flex-row items-center md:items-start">    
      
      {/* Left Image Section */}
      <div className="md:w-1/2 mt-6 md:mt-0 p-6">
        <img src={aboutImage} alt="About" className="w-auto h-auto rounded-lg shadow-lg" />
      </div>

      {/* Right Content Section */}
      <div className="md:w-1/2 text-center md:text-left p-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">About Us</h2>
        <p className="mt-4 text-white text-base md:text-lg text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium placeat ducimus laudantium consectetur aspernatur. Dolores, dolorum quisquam. Facere nemo ut atque eveniet mollitia distinctio repudiandae in placeat, aut voluptas reiciendis?
          Quidem, expedita sequi dolorum soluta ducimus in nostrum atque excepturi!
        </p>
        
        <div className="mt-6 flex justify-center">
          <Link to="/safety" className="bg-[#4dfad4] px-6 py-3 text-black rounded-md hover:bg-[#22f0c3] transition font-bold text-center w-full md:w-auto">
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
}