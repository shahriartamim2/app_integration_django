import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const LFMViewAllLogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const [travelLogs, setTravelLogs] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Get all users data
  useEffect(() => {
    setIsLoading(true);
    try {
      fetch(`${backendUrl}/mswm/travel-logs`, {
        method: "GET",
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTravelLogs(data);
          setItemCount(data.length);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, [backendUrl]);

  const generatePDF = (data) => {
    const doc = new jsPDF();
    const tableRows = [];

    Object.keys(data).forEach((key) => {
      let row = [key, data[key]];
      tableRows.push(row);
    });

    doc.autoTable(["Key", "Value"], tableRows, { startY: 20 });
    doc.save("receipt.pdf");
  };

  const handleReceiptDownload = (id) => {
    fetch(`${backendUrl}/mswm/travel-logs/${id}/bill/`, {
      method: "GET",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        generatePDF(data);
      });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${formattedDate}, ${formattedTime}`;
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else {
    return (
      <div className="w-screen md:w-full h-full">
        <div className="bg-white p-5 drop-shadow-md rounded-md">
          <Helmet>
            <title> Manage Users</title>
          </Helmet>
          <div className="flex justify-between items-center flex-wrap">
            <h1 className="text-xl text-gray-600 font-bold ml-3 raleway-font">
              Travel Logs
            </h1>
            <h2 className="text-gray-600 font-bold">Total logs: {itemCount}</h2>
          </div>
          <div>
            <div className="overflow-x-auto">
              <table className="table table-sm md:table-md table-zebra">
                <thead>
                  <tr>
                    <th></th>
                    <th className="text-sm">Vehicle ID</th>
                    <th className="text-sm">Weight of waste</th>
                    <th className="text-sm">Arrival Time</th>
                    <th className="text-sm">Departure Time</th>
                    <th className="text-sm">Download Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {travelLogs.map((item, index) => (
                    <tr key={item.id}>
                      <th>{index + 1}</th>
                      <td>{item.vehicle}</td>
                      <td>{item.waste_weight}</td>
                      <td>{formatDate(item.arrival_time)}</td>
                      <td>{formatDate(item.departure_time)}</td>
                      <td>
                        <button
                          className="btn btn-primary min-h-0 h-8"
                          onClick={() => handleReceiptDownload(item.id)}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default LFMViewAllLogs;
