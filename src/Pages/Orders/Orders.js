import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useClient from "../../Hooks/useClient";
import { RiDeleteBin5Line } from "react-icons/ri";

function Orders() {
  const [client] = useClient([]);
  const [inserted, setInserted] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    fetch("https://client-portal-xi.vercel.app/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setInserted(!inserted);
        }
        reset();
      });
  };

  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetch("https://client-portal-xi.vercel.app/order")
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [inserted]);
  return (
    <div className="">
      <div className="my-4 md:flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <h2 className="text-xl font-bold py-4">Order Here</h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:mr-4">
              <label
                htmlFor="Contact Person Name"
                className="input-label block"
              >
                Client Name
              </label>
              <select
                required
                {...register("clientName")}
                className="md:mr-4 border py-2 px-2  rounded-md w-full"
              >
                <option disabled selected>
                  Select Client Name
                </option>
                {client.map((c) => (
                  <option c={c} key={c._id}>
                    {c.clientName}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-block md:ml-4">
              <label
                htmlFor="Contact Person Name"
                className="input-label block"
              >
                Product Name
              </label>
              <input
                required
                {...register("productName")}
                className="border py-2 px-2 w-full rounded-md"
                type="name"
              />
            </div>
            <div className="input-block md:ml-8">
              <label htmlFor="Moblie Number" className="input-label block">
                Price
              </label>
              <input
                required
                {...register("price")}
                className="border py-2 px-2 w-full rounded-md"
                type="number"
                autoComplete="off"
              />
            </div>
            <div className="input-block md:ml-8">
              <label htmlFor="Contact Number" className="input-label block">
                Quantity
              </label>
              <input
                required
                {...register("qty")}
                className="border py-2 px-2 w-full rounded-md"
                autoComplete="off"
                type="number"
              />
            </div>
          </div>
          <div className="input-block">
            <label htmlFor="Description" className="input-label block">
              Description
            </label>
            <textarea
              required
              {...register("description")}
              className="border py-2 px-2 w-full rounded-md"
              type="text"
              autoComplete="off"
            />
          </div>
          <div className="py-1">
            <input
              required
              className="bg-green-400 px-4 py-1 rounded-md"
              type="submit"
              value="Order"
            />
          </div>
        </form>
      </div>
      <div className="md:flex md:justify-center">
        <div className="md:w-1/2">
          <h2 className="text-xl font-bold md:py-4"> Ordered -</h2>
          {order?.map((c) => (
            <div
              c={c}
              key={c._id}
              className="card w-100 bg-base-100 my-3 shadow-xl"
            >
              <div className="card-body">
                <div className="">
                  <div>
                    <div className="flex justify-between font-bold">
                      <p> Client Name :</p>
                      <p className="text-end">{c.clientName}</p>
                    </div>

                    <div className="">
                      <div className="flex justify-between">
                        <p>Product name :</p>
                        <p className="text-end">{c?.productName}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Product Price :</p>
                        <p className="text-end"> ${c?.price}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Quantity : </p>
                        <p className="text-end">{c?.qty} Pcs</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Tax (18%) : </p>
                        <p className="text-end"> ${c?.price * c?.qty * 0.18}</p>
                      </div>
                      <hr className="w-full" />
                      <div className="flex justify-between font-bold">
                        <p>Total Price : </p>
                        <p className="text-end">
                          $ {c?.price * c?.qty + c?.price * c?.qty * 0.18}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-justify">Description : {c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
