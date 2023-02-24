import React from "react";
import { useFormik } from "formik";
import { addSchema } from "./../schemas/index";

const initialValues = {
  clientName: "",
  contactPerson: "",
  contactNumber: "",
  mobileNumber: "",
  address: "",
  description: "",
  isActive: "",
};
function MyForm({ edit, toggleSubmit }) {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: addSchema,
      onSubmit: (values, action) => {
        fetch("https://client-portal-xi.vercel.app/client", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(values);
            action.resetForm();
          });
      },
    });
  return (
    <div className="flex justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="input-block">
          <label htmlFor="Client Name" className="input-label block">
            Client Name
          </label>
          <input
            className="border py-2 px-2 w-full rounded-md"
            type="name"
            autoComplete="off"
            name="clientName"
            id="clientName"
            placeholder="Client Name"
            value={toggleSubmit ? edit?.clientName : values.clientName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.clientName && touched.clientName ? (
            <p className="text-sm text-red-600">{errors.clientName}</p>
          ) : null}
        </div>
        <div className="input-block">
          <label htmlFor="Contact Person Name" className="input-label block">
            Contact Person Name
          </label>
          <input
            className="border py-2 px-2 w-full rounded-md"
            type="name"
            autoComplete="off"
            name="contactPerson"
            id="contactPerson"
            placeholder=" Contact Person Name"
            value={values.contactPerson}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.contactPerson && touched.contactPerson ? (
            <p className="text-sm text-red-600">{errors.contactPerson}</p>
          ) : null}
        </div>
        <div className="input-block">
          <label htmlFor="Contact Number" className="input-label block">
            Contact Number
          </label>
          <input
            className="border py-2 px-2 w-full rounded-md"
            type="phone"
            autoComplete="off"
            name="contactNumber"
            id="contactNumber"
            placeholder="Contact Number"
            value={values.contactNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.contactNumber && touched.contactNumber ? (
            <p className="text-sm text-red-600">{errors.contactNumber}</p>
          ) : null}
        </div>
        <div className="input-block">
          <label htmlFor="Moblie Number" className="input-label block">
            Moblie Number
          </label>
          <input
            className="border py-2 px-2 w-full rounded-md"
            type="phone"
            autoComplete="off"
            name="mobileNumber"
            id="mobileNumber"
            placeholder="Moblie Number"
            value={values.mobileNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.mobileNumber && touched.mobileNumber ? (
            <p className="text-sm text-red-600">{errors.mobileNumber}</p>
          ) : null}
        </div>
        <div className="input-block">
          <label htmlFor="Address" className="input-label block">
            Address
          </label>
          <input
            className="border py-2 px-2 w-full rounded-md"
            type="text"
            autoComplete="off"
            name="address"
            id="address"
            placeholder="Address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.address && touched.address ? (
            <p className="text-sm text-red-600">{errors.address}</p>
          ) : null}
        </div>
        <div className="input-block">
          <label htmlFor="Description" className="input-label block">
            Description
          </label>
          <textarea
            className="border py-2 px-2 w-full rounded-md"
            type="text"
            autoComplete="off"
            name="description"
            id="description"
            placeholder="Description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.description && touched.description ? (
            <p className="text-sm text-red-600">{errors.description}</p>
          ) : null}
        </div>
        <div className="flex">
          <div>
            <input
              id="active"
              className="peer/draft"
              type="radio"
              defaultChecked
              name="active"
              value={values.isActive}
            />
            <label
              htmlFor="draft"
              className="peer-checked/draft:text-sky-500 px-2"
            >
              Active
            </label>
          </div>
          <div className="md:px-20">
            <input
              id="active"
              className="peer/published"
              type="radio"
              name="active"
              value={values.isActive}
            />
            <label
              htmlFor="published"
              className="peer-checked/published:text-sky-500 px-2"
            >
              Not Active
            </label>
          </div>
        </div>
        <div className="py-4">
          <button className="bg-green-400 px-4 py-1" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyForm;
