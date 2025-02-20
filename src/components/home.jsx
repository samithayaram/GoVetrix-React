import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/img4.jpg';
import Services from './services';
import About from './about';
import Safety from './safety';
import Team from './team';
import Banner from './banner';

function Home() {
  return (
    <>
      <motion.div 
        className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 bg-black overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left Content Section */}
        <motion.div 
          className="flex flex-col justify-center items-start p-4 sm:p-8 md:w-1/2"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold text-white">
            Data to enrich your online business
          </h1>
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate tempora harum. Voluptas quis accusamus, consequatur fugit voluptates amet unde nulla animi excepturi laboriosam, deserunt quod officia mollitia. 
          </p>
          <motion.div 
            className="mt-4 flex gap-x-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link to="/register" className="bg-[#4dfad4] px-4 py-2 text-black rounded-md hover:bg-[#22f0c3] transition font-bold">
              Register
            </Link>
            <Link to="/login" className="bg-[#4dfad4] px-4 py-2 text-black rounded-md hover:bg-[#22f0c3] transition font-bold">
              Login
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Image Section */}
        <motion.div 
          className="w-full md:w-1/2 flex justify-center p-4"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="relative w-full h-auto sm:h-80 md:h-auto lg:h-auto">
            <motion.img 
              src={backgroundImage}
              alt="Background"
              className="w-full h-full object-cover rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </motion.div>

      <About/>
      <Services />
      <Safety/>
      <Banner/>
      <Team/>
    </>
  );
}

export default Home;
