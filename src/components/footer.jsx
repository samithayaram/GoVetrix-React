import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaAngleRight } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">GoVetrix</h2>
          <p className="flex items-center gap-2"><FaMapMarkerAlt /> 123 Street, New York, USA</p>
          <p className="flex items-center gap-2"><FaPhone /> +012 345 67890</p>
          <p className="flex items-center gap-2"><FaEnvelope /> info@example.com</p>
          <div className="flex gap-4 mt-4">
            <a href="https://www.facebook.com/" className="text-white hover:text-gray-400"><FaFacebook size={24} /></a>
            <a href="https://x.com/i/flow/login" className="text-white hover:text-gray-400"><FaTwitter size={24} /></a>
            <a href="https://github.com/" className="text-white hover:text-gray-400"><FaGithub size={24} /></a>
            <a href="https://www.linkedin.com/feed/" className="text-white hover:text-gray-400"><FaLinkedin size={24} /></a>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Services</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><FaAngleRight />Standard Rides</li>
            <li className="flex items-center gap-2"><FaAngleRight />Parcel & Package Delivery </li>
            <li className="flex items-center gap-2"><FaAngleRight /> Carpooling (Shared Rides) </li>
            <li className="flex items-center gap-2"><FaAngleRight /> Luxury Rides</li>
            <li className="flex items-center gap-2"><FaAngleRight /> XL Rides </li>
            <li className="flex items-center gap-2"><FaAngleRight /> Subscription Plans</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/about" className="flex items-center gap-2 hover:underline"><FaAngleRight /> About us</Link></li>
            <li><Link to="/services" className="flex items-center gap-2 hover:underline"><FaAngleRight /> Our services</Link></li>
            <li><Link to="/safety" className="flex items-center gap-2 hover:underline"><FaAngleRight /> Safety</Link></li>
            <li><Link to="/team" className="flex items-center gap-2 hover:underline"><FaAngleRight /> Our Team</Link></li>
            <li><Link to="/contact" className="flex items-center gap-2 hover:underline"><FaAngleRight /> Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">Newsletter</h2>
          <p className="text-gray-400 text-center">Stay updated with our latest news and offers.</p>
          <div className="mt-4 flex justify-center">
            <input type="email" placeholder="Enter your email" className="px-4 py-2 w-full bg-gray-800 text-white border border-gray-600 rounded-l-md focus:outline-none" />
            <button className="px-4 py-2 bg-teal-500 text-white rounded-r-md hover:bg-teal-600">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-6 py-4 border-t border-gray-700">
        &copy; {new Date().getFullYear()} @samithayaram, All Rights Reserved.
      </div>
    </footer>
  );
}
