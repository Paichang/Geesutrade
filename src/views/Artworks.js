import React, { useState, useEffect } from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { Link } from "react-router-dom";

export default function Artworks() {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "",
      artistName: "",
      type: "",
      medium: "",
      style: "",
      askingPrice: "",
      sold: false,
      image: "",
      dateShow: "",
      createdAt: "",
      updatedAt: ""
    }
  ]);

  useEffect(() => {
    getAllArtworks();
  }, []);


  const getAllArtworks = () => {
    fetch('http://127.0.0.1:8080/api/artworks/all')
      .then(res => res.json())
      .then(res => {
        setProducts(res.message);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Creativity
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    This is a simple example of a Landing Page you can build
                    using Notus React. It features multiple CSS components based
                    on the Tailwind CSS design system.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>
        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto">
            <div className="justify-center flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4 -mt-12">
                <div className="flex flex-wrap pt-48">
                  {products.map((product) => (
                    <div key={product.id} className="w-full lg:w-4/12 px-4 mb-2">
                      <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg ease-linear transition-all duration-150">
                        <img
                          className="align-middle border-none h-48 w-96 rounded-lg"
                          src={product.image}
                        />
                      </div>
                      <div className="pt-2 flex items-center justify-between pb-2">
                        <h5 className="text-2xl font-semibold">
                          {product.title}
                        </h5>
                        <p className="pt-1 text-gray-900">{product.askingPrice}</p>
                      </div>
                      <div className="pt-2 flex items-center justify-between pb-2">
                        <h5 className="text-xl font-semibold">
                          {product.artistName}
                        </h5>
                        <p className="pt-1 text-gray-900">{product.type}, {product.medium}, {product.style}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};