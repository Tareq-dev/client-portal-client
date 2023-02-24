import * as Yup from "yup";

export const addSchema = Yup.object({
  clientName: Yup.string().min(2).max(25).required("Please enter Client name"),
  address: Yup.string().min(10).max(70).required("Please enter Address"),
  description: Yup.string()
    .min(25)
    .max(300)
    .required("Please enter Description"),
  contactPerson: Yup.string()
    .min(2)
    .max(25)
    .required("Please enter contect person name"),
  contactNumber: Yup.number().required("Please enter Number"),
  mobileNumber: Yup.number().required("Please enter Number"),
  isActive: Yup.boolean(),
});
