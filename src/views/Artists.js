import React, { useState, useEffect } from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { Link } from "react-router-dom";

export default function Artworks() {
  const [artists, setArtists] = useState([
    {
      "id": 1,
      "name": "Tweizh",
      "address": "ABC",
      "phone": "3345678",
      "email": "ABC@mail.com",
      "usualType": "type",
      "usualMedium": "medium",
      "usualStyle": "style",
      "salesLastYear": "123",
      "salesToDate": "123",
      "createdAt": "2022-05-31T01:30:46.546Z",
      "updatedAt": "2022-05-31T01:30:46.547Z"
    },
    {
      "id": 2,
      "name": "PaiChang",
      "address": "DEF",
      "phone": "09193949",
      "email": "DEF@mail.com",
      "usualType": "type",
      "usualMedium": "medium",
      "usualStyle": "style",
      "salesLastYear": "123",
      "salesToDate": "123",
      "createdAt": "2022-05-31T01:30:46.547Z",
      "updatedAt": "2022-05-31T01:30:46.547Z"
    }
  ]);

  useEffect(() => {
    getAllArtworks();
  }, []);


  const getAllArtworks = () => {
    fetch('http://127.0.0.1:8080/api/artists/all')
      .then(res => res.json())
      .then(res => {
        setArtists(res.message);
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
                    Artists
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
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
        <section className="pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {artists.map((artist, idx) => (
                artist.name ?
                  <div key={artist.id} className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                    <div className="px-6">
                      <img
                        alt="..."
                        src={require(`assets/img/team-${idx + 1}-800x800.jpg`).default}
                        className="shadow-lg rounded-full mx-auto max-w-120-px"
                      />
                      <div className="pt-6 text-center">
                        <h5 className="text-xl font-bold">{artist.name}</h5>
                        <div className="mt-6">
                          {artist.usualType}, {artist.usualMedium}, {artist.usualStyle}
                        </div>
                      </div>
                    </div>
                  </div> : <></>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};