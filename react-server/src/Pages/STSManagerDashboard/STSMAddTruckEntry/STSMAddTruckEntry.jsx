import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "./../../../context/AuthContext";

const STSMAddTruckEntry = () => {
  const { register, handleSubmit, reset } = useForm();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { user } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/mswm/sites/${user.managed_site}/vehicles`, {
      method: "GET",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data);
      });
  }, [backendUrl, user.managed_site]);

  function convertToISO(timeStr) {
    // Create a new date object
    const now = new Date();
    // Extract hours and minutes from the time string
    const [hours, minutes] = timeStr.split(":");
    // Set the hours and minutes of the date object
    now.setHours(hours, minutes);
    // Return the date in ISO string format
    return now.toISOString();
  }

  // Send request to server function
  const onSubmit = (data) => {
    data.site = user.managed_site;
    data.arrival_time = convertToISO(data.arrival_time);
    data.departure_time = convertToISO(data.departure_time);

    fetch(`${backendUrl}/mswm/travel-logs/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 201) {
        alert("Travel logs updated successfully");
        reset();
      } else {
        alert("Travel logs upload unsuccessful");
      }
    });
  };

  console.log(user);

  return (
    <div className="bg-white p-5 drop-shadow-md rounded-md">
      <Helmet>
        <title>Truck Entry</title>
      </Helmet>
      <h1 className="text-xl text-gray-600 font-semibold p-5 text-center">
        Add Truck Entry
      </h1>
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[600px]"
        >
          <div className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="vehicle"
                className="block font-semibold text-gray-600"
              >
                Truck Number:
              </label>
              <select
                name="vehicle"
                id="vehicle"
                className="select select-accent w-full"
                {...register("vehicle", {
                  required: true,
                  valueAsNumber: true,
                })}
              >
                <option value="">-- Select a truck ---</option>
                {vehicles.site_vehicles &&
                  vehicles.site_vehicles.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="waste_weight"
                className="font-semibold text-gray-600"
              >
                Weight of waste:
              </label>
              <input
                type="number"
                id="waste_weight"
                name="waste_weight"
                className="input input-accent w-full"
                placeholder="Write weight of waste"
                {...register("waste_weight", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="flex gap-5">
              <div className="w-full">
                <label
                  htmlFor="arrival_time"
                  className="font-semibold text-gray-600"
                >
                  Time of arrival:
                </label>
                <input
                  type="time"
                  name="arrival_time"
                  className="block p-2 border border-accent rounded w-full"
                  {...register("arrival_time", {
                    required: true,
                  })}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="departure_time"
                  className="font-semibold text-gray-600"
                >
                  Time of departure:
                </label>
                <input
                  type="time"
                  name="departure_time"
                  className="block p-2 border border-accent rounded w-full"
                  {...register("departure_time", {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn btn-accent w-1/2 text-white font-semibold"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default STSMAddTruckEntry;
