import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const SAAssignLFSManager = () => {
  const { register, handleSubmit, reset } = useForm();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [sitesData, setSitesData] = useState([]);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/mswm/sites/?type=Landfill`, {
      method: "GET",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSitesData(data);
        fetch(`${backendUrl}/rbac/roles/?format=json`, {
          method: "GET",
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const role = data.find((item) => item.name === "Landfill Manager");
            fetch(
              `${backendUrl}/mswm/sites/managers/?role=${role.id}&available=true`,
              {
                method: "GET",
                headers: {
                  Authorization: "Token " + localStorage.getItem("token"),
                },
              }
            )
              .then((res) => res.json())
              .then((data) => setManagers(data));
          });
      });
  }, [backendUrl]);

  console.log(sitesData, managers);

  // Send request to server function
  const onSubmit = (data) => {
    console.log(data);

    fetch(`${backendUrl}/mswm/sites/${data.sts_id}/managers/`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ managers: data.manager_id }),
    }).then((res) => {
      if (res.status === 200) {
        alert("Manager assigned successfully");
      } else {
        alert("Manager assigned unsuccessful");
      }
    });
  };

  return (
    <div className="bg-white p-5 drop-shadow-md rounded-md">
      <Helmet>
        <title>Assign LFS Manager</title>
      </Helmet>
      <h1 className="text-xl text-gray-600 font-semibold p-5 text-center">
        Assign Manager to Landfill Site
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
                Select Landfill Site:
              </label>
              <select
                name="sts_id"
                id="sts_id"
                className="select select-accent w-full"
                {...register("sts_id", {
                  required: true,
                  valueAsNumber: true,
                })}
              >
                <option value="">--- Select a landfill site ---</option>
                {sitesData.map((item) => (
                  <option key={item.id} value={item.id}>
                    Ward: {item.ward_number}, Type: {item.site_type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="manager_id"
                className="block font-semibold text-gray-600"
              >
                Select Manager:
              </label>
              <select
                name="manager_id"
                id="manager_id"
                className="select select-accent w-full"
                {...register("manager_id", {
                  required: true,
                })}
              >
                <option value="">--- Select Manager ---</option>
                {managers.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.username}
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

export default SAAssignLFSManager;
