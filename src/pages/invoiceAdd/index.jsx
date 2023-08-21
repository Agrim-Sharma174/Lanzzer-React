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
const InvoiceAddPage = () => {
  const [picker, setPicker] = useState(new Date());
  const [invoiceId, setInvoiceId] = useState(
    uuidv4().slice(0, 8).toUpperCase()
  );
  const [itemData, setItemData] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
 
    itemData: {},
    creationDate: picker,
  });
  const sendData = (data) => {
    setItemData(data);
    // console.log(itemData);
  };


    function handleChange(e) {
      setInvoiceData((prevInvoiceData) => ({
        ...prevInvoiceData,
        [e.target.name]: e.target.value,
      }));
      // console.log(invoiceData);
    }
  

  const ownerData ={
    ownerEmail: Cookies.get("email"),
    
  }

  async function createInvoice() {
    try{
      const { data, error } = await supabase
      .from('invoices')
      .insert([
        { userId: Cookies.get('userID'), invoiceData: invoiceData, invoice_id: invoiceId },
      ])
      .select()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Invoice has been created.',
        showConfirmButton: false,
        timer: 1500
      })
    }
    catch(error){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...Something went wrong!',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  return (
    <div>
      <Card title="Create new invoice">
        <h4 className="text-slate-900 dark:text-white text-xl mb-4">
          <h6 className="pb-4">Invoice ID: </h6>

          {invoiceId}
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

            <Textinput
              label="Recipient's Name"
              type="text"
              placeholder="Add Recipient's Name"
              onChange={(e) => {
                handleChange(e);
                e.target.name = "recipientName";
              }}

            />
            <Textinput label="Recipient's Phone" type="text" placeholder="Add Recipient's phone" 
              onChange={(e) => {
                handleChange(e);
                e.target.name = "recipientPhone";
              }}
            />
            <Textinput
              label="Recipient's Email"
              type="email"
              placeholder="Add recipient's email"
              onChange={(e) => {
                handleChange(e);
                e.target.name = "recipientEmail";
              }}
            />
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
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div className="lg:col-span-2 col-span-1 text-slate-900 text-base dark:text-slate-300 font-medium">
              Owner info
            </div>

            <Textinput label="Name" type="text" placeholder="Add your name"
             onChange={(e) => {
                handleChange(e);
                e.target.name = "ownerName";
              }}
             />
            <Textinput label="Phone" type="text" placeholder="Add your phone
            " onChange={(e) => {
                handleChange(e);
                e.target.name = "ownerPhone";
              }} />
            <div className="lg:col-span-2 col-span-1">
              <Textinput
                label="Ower's Email"
                type="email"
                placeholder="Add your email"
                onChange={(e) => {
                handleChange(e);
                e.target.name = "ownerEmail";
              }}
              />
            </div>

            <div className="lg:col-span-2 col-span-1">
              <Textarea
                label="Owner's Address"
                type="text"
                placeholder="Add your address"
                rows="2"
              />
            </div>
          </div>
        </div>
        <div className="my-6">
          <Repeater sendData={sendData} />
        </div>
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
        />
        <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse mt-4">
        <Button text="Back" className="btn-dark" onClick={()=>{
            window.history.back();
            // console.log(invoiceData);
          }} />
          <Button text="Save" className="btn-dark" onClick={()=>{
            invoiceData.itemData = itemData;
            createInvoice();
            // console.log(invoiceData);
          }} />
        </div>
      </Card>
    </div>
  );
};

export default InvoiceAddPage;
