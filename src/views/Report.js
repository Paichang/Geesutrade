import React, { useState, useEffect } from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/FooterSmall.js";


export default function Report() {
  const [report, setReport] = useState(false);
  const [select, setSelect] = useState(false);
  const [inputs, setInputs] = useState(false);
  useEffect(() => {
    getSalesperson();
  }, []);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setInputs({ ...inputs, [name]: value });
  }

  function handleSubmit() {
    getSalesperson();
  }

  function getSalesperson() {
    if (!inputs) {
      fetch('http://localhost:8080/api/sales/salesperson/salesthisweek')
        .then(res => res.json())
        .then(res => {
          let optionlist = [<option selected value=''></option>];
          res['message'].forEach(element => {
            optionlist.push(<option value={element}>{element}</option>);
          });
          return optionlist;
        })
        .then(data => { setSelect(data); });
    }
    else {
      let url = 'http://localhost:8080/api/sales/' + inputs['salesperson'] + '?startDate=' + inputs['start'] + '&endDate=' + inputs['end'];
      console.log(url);
      fetch(url)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setReport(res.message);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
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
                    Report
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
        <div className="flex flex-wrap mt-20">
          <div className="w-4/12 mx-auto sm:w-6/12 px-4">
            <div className="relative inline-flex align-middle w-full">
              <select name="salesperson" className="rounded mx-4" onChange={handleChange}>{select}</select>
              <input name="start" className="mx-4" type="date" onChange={handleChange}></input>
              <input name="end" className="mx-4" type="date" onChange={handleChange}></input>
              <button onClick={handleSubmit} className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Submit</button>
            </div>
          </div>
          {report ?
            <div className="w-full px-4 mx-4 mt-2">
              <span className="font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200 uppercase last:mr-0 mr-1">
                Total Sales: ${report[0]['s_sold']}
              </span>
            </div>
            : <></>}
          <div className="w-full mx-auto mb-12 px-4 mt-4" >
            <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"}>
              <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                        Title
                      </th>
                      <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                        Artist
                      </th>
                      <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                        Asking Price
                      </th>
                      <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                        Selling Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {report ? report.map((rep, idx) => (
                      rep.title ?
                        <tr>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{rep.title}</td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{rep.artistName}</td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">${rep.askingPrice}</td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">${rep.salingPrice}</td>
                        </tr>
                        : <></>
                    )) : <></>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
