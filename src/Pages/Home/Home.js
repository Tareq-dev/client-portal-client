import React, { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineAddCircle } from "react-icons/md";
import MyForm from "../../components/MyForm";
import swal from "sweetalert";

function Home() {
  const [client, setClient] = useState([]);
  const [edit, setEdit] = useState({});
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(!open);

  useEffect(() => {
    fetch("https://client-portal-xi.vercel.app/client")
      .then((res) => res.json())
      .then((data) => setClient(data));
  }, [handleClose]);

  const handleEdit = (id) => {
    const editCard = client.find((c) => c._id === id);
    setEdit(editCard);
    setToggleSubmit(!toggleSubmit);
  };
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover it!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`https://client-portal-xi.vercel.app/client/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            const remaining = client.filter((c) => c._id === id);
            console.log(remaining);
            setClient(remaining);
          });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  return (
    <div className="flex justify-center">
      <div className="md:w-1/2 my-4">
        <div className="border-2 flex justify-between px-14 md:px-24 items-center py-1 rounded-2xl">
          <h2>Add Client :</h2>
          <label htmlFor="my-modal-3">
            <MdOutlineAddCircle size={34} className="text-sky-400" />
          </label>
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                onClick={handleClose}
                htmlFor="my-modal-3"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <MyForm />
            </div>
          </div>
        </div>
        {client.map((c) => (
          <div
            c={c}
            key={c._id}
            className="card w-100 bg-base-100 my-3 shadow-xl"
          >
            <div className="card-body">
              <div className="flex justify-between">
                <div>
                  <h2 className="font-bold">
                    Client Name :
                    <span
                      className={
                        c.isActive ? "text-green-600 ml-2" : "font-bold ml-2"
                      }
                    >
                      {c.clientName}
                    </span>
                  </h2>
                  <div className="">
                    <p>Contact Person : {c?.contactPerson}</p>
                    <p>Contact No : {c?.contactNumber}</p>
                    <p>Mobile No : {c?.mobileNumber}</p>
                  </div>
                </div>
                <div>
                  <p className="tooltip tooltip-info" data-tip="Edit">
                    <label
                      onClick={() => handleEdit(c._id)}
                      htmlFor="my-modal-3"
                    >
                      <TbEdit className="text-gray-400" size={24} />
                    </label>
                    <input
                      type="checkbox"
                      id="my-modal-3"
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="modal-box relative">
                        <label
                          htmlFor="my-modal-3"
                          className="btn btn-sm btn-circle absolute right-2 top-2"
                        >
                          ✕
                        </label>
                        <MyForm edit={edit} toggleSubmit={toggleSubmit} />
                      </div>
                    </div>
                  </p>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="pt-4 tooltip block tooltip-info"
                    data-tip="Delete"
                  >
                    <RiDeleteBin5Line className="text-gray-400" size={24} />
                  </button>
                </div>
              </div>
              <p>Address : {c.address}</p>
              <p className="text-justify">Description : {c.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
