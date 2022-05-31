import React, { useState, useEffect } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer";

export default function Sales() {
    const [sales, setSales] = useState(false);
    const [select, setSelect] = useState(false);
    const [option, setOption] = useState(false);
    useEffect(() => {
        getSalesperson();
    }, [option]);

    function handleChange(event) {
        setOption(event.target.value);
    }

    function getSalesperson() {
        if(!option) {
            fetch('http://localhost:8080/api/sales/salesperson/salesthisweek')
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    let optionlist = [<option selected value=''></option>];
                    res['message'].forEach(element => {
                        optionlist.push(<option value={element}>{element}</option>);
                    });
                    return optionlist;
                })
                .then(data => {setSelect(data)});
        }
        else {
            let url = 'http://localhost:8080/api/sales/' + option + '/salesthisweek';
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    setSales(res.message);
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
        <div className="w-full sm:w-6/12 md:w-4/12 px-4">
            <div className="relative inline-flex align-middle w-full">
                <select className="rounded" onChange={handleChange}>{select}</select>
            </div>
        </div>
        <div className="w-full mb-12 px-4 mt-4">
            <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"}>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                        <tr>
                            <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                                Selling Price
                            </th>
                            <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                                title
                            </th>
                            <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                                Artist
                            </th>
                            <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                                Customer Name
                            </th>
                            <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                                Customer address
                            </th>
                            <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                                Date of Sale
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {sales ? sales.map((sale, idx) => (
                            sale.salesperson ?
                                <tr>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">${sale.salingPrice}</td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{sale.title}</td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{sale.artistName}</td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{sale.custName}</td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{sale.custAddress}</td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{sale.dateSold.split('T')[0].replace(/-/g, '/')}</td>
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
