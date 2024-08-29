import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const ContactSection = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-black">Contact Us</h2>
        <p className="text-lg mb-12 text-black">
          We'd love to hear from you! Reach out to us using any of the methods
          below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8">
          {/* Phone */}
          <div className="card bg-white shadow-xl">
            <div className="card-body flex flex-col items-center">
              <FaPhoneAlt className="text-4xl text-primary mb-4" />
              <h3 className="card-title text-xl font-semibold text-black text-center">
                Call Us
              </h3>
              <p className="text-black">+1 (123) 456-7890</p>
            </div>
          </div>

          {/* Email */}
          <div className="card bg-white shadow-xl">
            <div className="card-body flex flex-col items-center">
              <FaEnvelope className="text-4xl text-primary mb-4" />
              <h3 className="card-title text-xl font-semibold text-black text-center">
                Email Us
              </h3>
              <p className="text-black">info@blooddonation.com</p>
            </div>
          </div>

          {/* Location */}
          <div className="card bg-white shadow-xl">
            <div className="card-body flex flex-col items-center">
              <FaMapMarkerAlt className="text-4xl text-primary mb-4" />
              <h3 className="card-title text-xl font-semibold text-black text-center">
                Visit Us
              </h3>
              <p className="text-black">123 Donation St., City, Country</p>
            </div>
          </div>

          {/* Facebook */}
          <div className="card bg-white shadow-xl">
            <div className="card-body flex flex-col items-center">
              <FaFacebook className="text-4xl text-primary mb-4" />
              <h3 className="card-title text-xl font-semibold text-black text-center">
                Facebook
              </h3>
              <p className="text-black">@BloodDonation</p>
            </div>
          </div>

          {/* Twitter */}
          <div className="card bg-white shadow-xl">
            <div className="card-body flex flex-col items-center">
              <FaTwitter className="text-4xl text-primary mb-4" />
              <h3 className="card-title text-xl font-semibold text-black text-center">
                Twitter
              </h3>
              <p className="text-black">@DonateBlood</p>
            </div>
          </div>

          {/* Instagram */}
          <div className="card bg-white shadow-xl">
            <div className="card-body flex flex-col items-center">
              <FaInstagram className="text-4xl text-primary mb-4" />
              <h3 className="card-title text-xl font-semibold text-black text-center">
                Instagram
              </h3>
              <p className="text-black">@BloodDonationOfficial</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
