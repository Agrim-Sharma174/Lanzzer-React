import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Repeater from "../repeater/Repeater";
import Flatpickr from "react-flatpickr";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import supabase from "../auth/supabaseClient";
import Swal from "sweetalert2";
const QuotationAddPage = () => {
  const [picker, setPicker] = useState(new Date());
  const [quotationId, setquotationId] = useState(
    uuidv4().slice(0, 8).toUpperCase()
  );
  const [itemData, setItemData] = useState([]);
  const [quotationData, setquotationData] = useState({
    itemData: {},
    creationDate: picker,
  });

  const [formErrors, setFormErrors] = useState({
    recipientName: false,
    recipientPhone: false,
    recipientEmail: false,
    recipientAddress: false,
    ownerName: false,
    ownerPhone: false,
    ownerEmail: false,
    additionalNote: false,
  });

  const sendData = (data) => {
    setItemData(data);
    // console.log(itemData);
  };

  function handleChange(e) {
    const { name, value } = e.target;

    setquotationData((prevquotationData) => ({
      ...prevquotationData,
      [name]: value,
    }));

    // Clear the error for the corresponding input
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  }

  const ownerData = {
    ownerEmail: Cookies.get("email"),
  };

  async function createquotation() {
    try {
      const { data, error } = await supabase
        .from("quotations")
        .insert([
          {
            user_id: Cookies.get("userID"),
            quotationData: quotationData,
            quotation_Id: quotationId,
          },
        ])
        .select();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your quotation has been created.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  return (
    <div>
      <Card title="Create new quotation">
        <h4 className="text-slate-900 dark:text-white text-xl mb-4">
          <h6 className="pb-4">Quotation ID: </h6>

          {quotationId}
        </h4>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div className="lg:col-span-2 col-span-1 text-slate-900 dark:text-slate-300 text-base font-medium">
              Recipient info
            </div>
            <div>
              <label htmlFor="default-picker" className=" form-label">
                Issued Date
              </label>

              <Flatpickr
                className="form-control py-2"
                value={picker}
                onChange={(date) => setPicker(date)}
                id="default-picker"
              />
            </div>

            <div>
              <Textinput
                label="Recipient's Name"
                type="text"
                placeholder="Add Recipient's Name"
                onChange={(e) => {
                  handleChange(e);
                  e.target.name = "recipientName";
                }}
                error={formErrors.recipientName}
              />
              {formErrors.recipientName && (
                <p className="text-red-500 mt-2">
                  Recipient's Name is required.
                </p>
              )}
            </div>

            <div>
              <Textinput
                label="Recipient's Phone"
                type="text"
                placeholder="Add Recipient's phone"
                onChange={(e) => {
                  handleChange(e);
                  e.target.name = "recipientPhone";
                }}
                error={formErrors.recipientPhone}
              />
              {formErrors.recipientPhone && (
                <p className="text-red-500 mt-2">
                  Recipient's Phone is required.
                </p>
              )}
            </div>

            <div>
              <Textinput
                label="Recipient's Email"
                type="email"
                placeholder="Add recipient's email"
                onChange={(e) => {
                  handleChange(e);
                  e.target.name = "recipientEmail";
                }}
                error={formErrors.recipientEmail}
              />
              {formErrors.recipientEmail && (
                <p className="text-red-500 mt-2">
                  Recipient's Email is required.
                </p>
              )}
            </div>

            <div className="lg:col-span-2 col-span-1">
              <Textarea
                label="Recipient's Address"
                type="text"
                placeholder="Add Recipient's Address"
                rows="2"
                onChange={(e) => {
                  handleChange(e);
                  e.target.name = "recipientAddress";
                }}
                error={formErrors.recipientAddress}
              />
              {formErrors.recipientAddress && (
                <p className="text-red-500 mt-2">
                  Recipient's Address is required.
                </p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div className="lg:col-span-2 col-span-1 text-slate-900 text-base dark:text-slate-300 font-medium">
              Owner info
            </div>

            <div>
              <Textinput
                label="Name"
                type="text"
                placeholder="Add your name"
                onChange={(e) => {
                  handleChange(e);
                  e.target.name = "ownerName";
                }}
                error={formErrors.ownerName}
              />
              {formErrors.ownerName && (
                <p className="text-red-500 mt-2">Owner's Name is required.</p>
              )}
            </div>

            <div>
              <Textinput
                label="Phone"
                type="text"
                placeholder="Add your phone"
                onChange={(e) => {
                  handleChange(e);
                  e.target.name = "ownerPhone";
                }}
                error={formErrors.ownerPhone}
              />
              {formErrors.ownerPhone && (
                <p className="text-red-500 mt-2">Owner's Phone is required.</p>
              )}
            </div>

            <div className="lg:col-span-2 col-span-1">
              <Textinput
                label="Ower's Email"
                type="email"
                placeholder="Add your email"
                onChange={(e) => {
                  handleChange(e);
                  e.target.name = "ownerEmail";
                }}
                error={formErrors.ownerEmail}
              />
              {formErrors.ownerEmail && (
                <p className="text-red-500 mt-2">Owner's Email is required.</p>
              )}
            </div>

            <div className="lg:col-span-2 col-span-1">
              <Textarea
                label="Owner's Address"
                type="text"
                placeholder="Add your address"
                rows="2"
                error={formErrors.ownerAddress}
                onChange={(e) => {
                  handleChange(e);
                  e.target.name = "ownerAddress";
                }}
              />
              {formErrors.ownerAddress && (
                <p className="text-red-500 mt-2">
                  Owner's Address is required.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="my-6">
          <Repeater sendData={sendData} />
        </div>
        <div>
          <Textarea
            label="Additional note"
            type="text"
            rows="2"
            placeholder="Note"
            className="lg:w-1/2"
            onChange={(e) => {
              handleChange(e);
              e.target.name = "additionalNote";
            }}
            error={formErrors.additionalNote}
          />
          {formErrors.additionalNote && (
            <p className="text-red-500 mt-2">Additional Note is required.</p>
          )}
        </div>

        <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse mt-4">
          <Button
            text="Back"
            className="btn-dark"
            onClick={() => {
              window.history.back();
            }}
          />
          <Button
            text="Save"
            className="btn-dark"
            onClick={() => {
              // Check for form completeness
              const requiredFields = [
                "recipientName",
                "recipientPhone",
                "recipientEmail",
                "recipientAddress",
                "ownerName",
                "ownerPhone",
                "ownerEmail",
                "ownerAddress",
                "additionalNote",
              ];
              let hasErrors = false;

              const updatedErrors = { ...formErrors };

              requiredFields.forEach((field) => {
                if (!quotationData[field]) {
                  updatedErrors[field] = true;
                  hasErrors = true;
                }
              });

              if (hasErrors) {
                setFormErrors(updatedErrors);
                return;
              }

              // Form is valid, proceed with creating the quotation
              quotationData.itemData = itemData;
              createquotation();
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default QuotationAddPage;
