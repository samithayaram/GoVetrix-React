import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import bikeImage from "../assets/bike-image.png";
import autoImage from "../assets/auto-image.webp";
import CustomCardComponent from "./customCard";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const Services = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const isInView1 = useInView(ref1, { once: true });
  const isInView2 = useInView(ref2, { once: true });
  const isInView3 = useInView(ref3, { once: true });

  return (
    <div className="text-center bg-black py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-6 text-white">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6 lg:px-20 justify-items-center">
        <motion.div
          ref={ref1}
          variants={cardVariants}
          initial="hidden"
          animate={isInView1 ? "visible" : "hidden"}
          transition={{ duration: 2 }}
          className="bg-white p-4 rounded-lg shadow-lg w-72"
        >
          <CustomCardComponent
            image={bikeImage}
            cardTitle="Bike Ride"
            text="Some quick example text to build on the card title and make up the bulk of the card's content."
          />
        </motion.div>

        <motion.div
          ref={ref2}
          variants={cardVariants}
          initial="hidden"
          animate={isInView2 ? "visible" : "hidden"}
          transition={{ duration: 2 }}
          className="bg-white p-4 rounded-lg shadow-lg w-72"
        >
          <CustomCardComponent
            image={autoImage}
            cardTitle="Auto Wala"
            text="Some quick example text to build on the card title and make up the bulk of the card."
          />
        </motion.div>

        <motion.div
          ref={ref3}
          variants={cardVariants}
          initial="hidden"
          animate={isInView3 ? "visible" : "hidden"}
          transition={{ duration: 2 }}
          className="bg-white p-4 rounded-lg shadow-lg w-72"
        >
          <CustomCardComponent
            image={bikeImage}
            cardTitle="Car-Taxi"
            text="Some quick example text to build on the card title and make up the bulk of the card's content."
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
