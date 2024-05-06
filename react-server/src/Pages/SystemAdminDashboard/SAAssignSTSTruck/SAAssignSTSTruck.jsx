import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const SAAssignSTSTruck = () => {
  const { register, handleSubmit, reset } = useForm();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [sitesData, setSitesData] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/mswm/sites/?type=STS`, {
      method: "GET",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSitesData(data);
        fetch(`${backendUrl}/mswm/sites/vehicles/?available=true`, {
          method: "GET",
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setVehicles(data);
          });
      });
  }, [backendUrl]);

  // Send request to server function
  const onSubmit = (data) => {
    fetch(`${backendUrl}/mswm/sites/${data.sts_id}/vehicles/`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ site_vehicles: data.vehicle_id }),
    }).then((res) => {
      if (res.status === 200) {
        alert("Truck assigned successfully");
      } else {
        alert("Truck assigned unsuccessful");
      }
    });
  };

  return (
    <div className="bg-white p-5 drop-shadow-md rounded-md">
      <Helmet>
        <title>Assign STS Truck</title>
      </Helmet>
      <h1 className="text-xl text-gray-600 font-semibold p-5 text-center">
        Assign Trucks to Secondary Transfer Station
      </h1>
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[600px]"
        >
          <div className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="sts_id"
                className="block font-semibold text-gray-600"
              >
                Select Secondary Transfer Station:
              </label>
              <select
                name="sts_id"
                id="sts_id"
                className="select select-accent w-full"
                {...register("sts_id", {
                  required: true,
                })}
              >
                <option value="">--- Select a station ---</option>
                {sitesData.map((item) => (
                  <option key={item.id} value={item.id}>
                    Ward: {item.ward_number}, Type: {item.site_type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="vehicle_id"
                className="block font-semibold text-gray-600"
              >
                Select Truck:
              </label>
              <select
                name="vehicle_id"
                id="vehicle_id"
                className="select select-accent w-full"
                {...register("vehicle_id", {
                  required: true,
                })}
              >
                <option value="">--- Select a truck ---</option>
                {vehicles.map((item) => (
                  <option key={item.id} value={item.id}>
                    Type: {item.vehicle_type}, Reg No:{" "}
                    {item.registration_number}
                  </option>
                ))}
              </select>
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

export default SAAssignSTSTruck;
