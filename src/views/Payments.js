import React, { useState, useEffect } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer";

export default function Sales() {
  const [payments, setPayments] = useState([]);
  const [salespersonSelect, setSalespersonSelect] = useState(false);
  const [salespersonOption, setSalespersonOption] = useState(false);

  useEffect(() => {
    getAllPayments();
  }, []);

  function handleSalesperson(event) {
    setSalespersonOption(event.target.value);
  }

  function getAllPayments() {
    fetch('http://localhost:8080/api/payments/all')
      .then(res => res.json())
      .then(res => {
        setPayments(res.message);
      });
  }

  return (
    <>
      <IndexNavbar fixed />
      <main className="mb-12">
        <div className="flex flex-wrap mt-20">
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
                        Artist Name
                      </th>
                      <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                        Customer Name
                      </th>
                      <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                        Type
                      </th>
                      <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                        Medium
                      </th>
                      <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                        Style
                      </th>
                      <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                        Selling Price
                      </th>
                      <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                        Salesperson
                      </th>
                      <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                        Date Sold
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments ? payments.map((payment, idx) => (
                      payment.salesperson ?
                        <tr key={payment.id}>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{payment.title}</td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{payment.artistName}</td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{payment.custName}</td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{payment.type}</td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{payment.medium}</td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{payment.style}</td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">${payment.salingPrice}</td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{payment.salesperson}</td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{payment.dateSold.split('T')[0].replace(/-/g, '/')}</td>
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
