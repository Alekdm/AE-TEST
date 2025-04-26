import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ServiceCard from "./ServiceCard";
import {
  ArrowRight,
  MessageCircle,
  Phone,
  Mail,
  Star,
  Calendar,
} from "lucide-react";
import Chatbot from "./Chatbot";
import BookingSystem from "./BookingSystem";

interface TestimonialProps {
  name: string;
  company?: string;
  content: string;
  rating: number;
}

const Testimonial = ({
  name,
  company,
  content,
  rating = 5,
}: TestimonialProps) => {
  return (
    <Card className="bg-white h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <CardTitle className="text-lg">{name}</CardTitle>
        {company && <CardDescription>{company}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">"{content}"</p>
      </CardContent>
    </Card>
  );
};

const services = [
  {
    id: 1,
    title: "Security Camera Installation",
    description:
      "Professional setup of wired/wireless security cameras with mobile app configuration.",
    priceRange: "$150-$250 per camera",
    icon: "shield",
  },
  {
    id: 2,
    title: "Wi-Fi Network Setup",
    description:
      "Expert installation of routers and mesh systems for optimal home or office coverage.",
    priceRange: "$150-$300",
    icon: "wifi",
  },
  {
    id: 3,
    title: "Computer Setup & Tune-Up",
    description:
      "New PC setup, updates, and performance optimization to keep your systems running smoothly.",
    priceRange: "$100-$150 each",
    icon: "laptop",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Local Boutique Owner",
    content:
      "The security camera installation was quick and professional. Now I can monitor my store from anywhere!",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    company: "Small Law Firm",
    content:
      "Our office network has never been more reliable. Response time for support is always fast.",
    rating: 5,
  },
  {
    name: "Jennifer Lee",
    content:
      "Fixed my computer issues remotely in under an hour. Saved me so much time and frustration!",
    rating: 5,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              OC Tech Support
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Services
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Contact
            </a>
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Admin Login
            </a>
            <Button variant="ghost" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Professional IT Services for Orange County
              </h1>
              <p className="text-xl mb-8">
                Expert tech support for small businesses and home clients. Fast,
                reliable, and affordable solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Get a Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-blue-700"
                  onClick={() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1581092921461-eab10380ed66?w=800&q=80"
                alt="IT Support Services"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive IT solutions tailored to your needs. From security
              cameras to network setup, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                priceRange={service.priceRange}
                icon={service.icon}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                alt="IT Professional"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">About OC Tech Support</h2>
              <p className="text-lg text-gray-700 mb-6">
                With over 10 years of experience in the IT industry, I provide
                personalized tech solutions for small businesses and home
                clients throughout Orange County.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                My mission is to make technology work for you - not against you.
                I pride myself on clear communication, fair pricing, and lasting
                solutions.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  CompTIA A+ Certified
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Microsoft Certified
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Cisco Networking
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Apple Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to
              say about our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                name={testimonial.name}
                company={testimonial.company}
                content={testimonial.content}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to solve your tech problems?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. We'll help you
            find the right solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <BookingSystem />
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-blue-700"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions or ready to get started? Reach out to us using any
              of the methods below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white text-center">
              <CardHeader>
                <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="mt-4">Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">(949) 555-1234</p>
                <p className="text-gray-600">Mon-Fri: 8am - 6pm</p>
              </CardContent>
            </Card>

            <Card className="bg-white text-center">
              <CardHeader>
                <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="mt-4">Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">support@octechsupport.com</p>
                <p className="text-gray-600">We respond within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="bg-white text-center">
              <CardHeader>
                <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="mt-4">Live Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Click the chat button</p>
                <p className="text-gray-600">Available during business hours</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">OC Tech Support</h3>
              <p className="text-gray-300">
                Professional IT services for Orange County small businesses and
                home clients.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Security Camera Installation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Wi-Fi Network Setup
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Computer Setup & Tune-Up
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Smart Home Setup
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <address className="not-italic text-gray-300">
                <p>Orange County, CA</p>
                <p>(949) 555-1234</p>
                <p>support@octechsupport.com</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>
              &copy; {new Date().getFullYear()} OC Tech Support. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Home;
