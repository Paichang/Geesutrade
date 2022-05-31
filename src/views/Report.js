import React, { useState, useEffect } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer";

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
        setInputs({...inputs, [name]: value});
    }

    function handleSubmit() {
        getSalesperson();
    }

    function getSalesperson() {
        if(!inputs) {
            fetch('http://localhost:8080/api/sales/salesperson/salesthisweek')
                .then(res => res.json())
                .then(res => {
                    let optionlist = [<option selected value=''></option>];
                    res['message'].forEach(element => {
                        optionlist.push(<option value={element}>{element}</option>);
                    });
                    return optionlist;
                })
                .then(data => {setSelect(data)});
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
    <IndexNavbar fixed />
      <main>
      <div className="flex flex-wrap mt-20">
        <div className="w-full sm:w-6/12 px-4">
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
        <div className="w-full mb-12 px-4 mt-4">
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
