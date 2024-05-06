import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const STSManagerOptimizeFleet = () => {
  const { register, handleSubmit } = useForm();
  const [responseData, setResponseData] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Send request to server function
  const onSubmit = (data) => {
    fetch(
      `${backendUrl}/mswm/sites/managers/optimized-fleet/?capacity=${data.sts_waste_volume}`,
      {
        method: "GET",
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setResponseData(data));
  };

  return (
    <div className="bg-white p-5 drop-shadow-md rounded-md">
      <Helmet>
        <title>Optimize Fleet</title>
      </Helmet>
      <h1 className="text-xl text-gray-600 font-semibold p-5 text-center">
        Optimize Fleet
      </h1>
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[600px]"
        >
          <div className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="sts_waste_volume"
                className="block font-semibold text-gray-600"
              >
                STS Waste Volume:
              </label>
              <input
                name="sts_waste_volume"
                id="sts_waste_volume"
                className="input input-accent w-full"
                {...register("sts_waste_volume", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
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
      {responseData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-sm md:table-md table-zebra">
            <thead>
              <tr>
                <th></th>
                <th className="text-sm">Vehicle Type</th>
                <th className="text-sm">Registration Number</th>
              </tr>
            </thead>
            <tbody>
              {responseData.map((item, index) => (
                <tr key={item.id}>
                  <th>{index + 1}</th>
                  <td>{item.vehicle_type}</td>
                  <td>{item.registration_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default STSManagerOptimizeFleet;
