import React, { useState, useMemo, useEffect } from "react";
import { advancedTable } from "../../constant/table-data";
import Card from "@/components/ui/Card";
import { Icon } from "@iconify/react";
import Tooltip from "@/components/ui/Tooltip";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import supabase from "../auth/supabaseClient";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import { Link } from "react-router-dom";
import InvoiceAdd from "../invoiceAdd";
import InvoicePreview from "../invoicePreview";
const InvoiceDisplay = () => {
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState();

  async function getInvoice() {
    try {
      let { data: invoices, error } = await supabase
        .from("invoices")
        .select("*")
        .range(0, 9)
        .ilike("userId", `%${Cookies.get("userID")}%`);

      console.log(invoices);

      setInvoiceData(invoices);
      // setTimeout(() => {
      //   setInvoiceData(invoices);
      // }, 5000);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getInvoice();
  }, []);

  const columns = [
    {
      label: "Invoice ID",
    },
    {
      label: "Invoice Date",
    },
    {
      label: "Customer Name",
    },
    {
      label: "Total Amount",
    },
    {
      label: "Preview",
    },
    {
      label: "Edit",
    },
    {
      label: "Delete",
    },
  ];

  return !invoiceData ? (
    <Loading />
  ) : (
    <>
      <Card title="Invoices" 
       headerslot={
          <Button
            text="Add new"
            icon="heroicons-outline:plus"
            className="btn-dark"
            onClick={() => navigate("/invoices/add")}
          />
        }
      >
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                <thead className="bg-slate-200 dark:bg-slate-700">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                  {invoiceData.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <td className="table-td">{row.invoice_id}</td>
                      <td className="table-td">
                        {row.invoiceData.creationDate.split("T")[0]}
                      </td>
                      <td className="table-td">
                        {row.invoiceData.recipientName}
                      </td>
                      <td className="table-td">
                      ₹ {row.invoiceData.itemData.reduce((a, b) => a + Number(b.price), 0)}
                      </td>
                      <td className="table-td align-middle">
                        {
                          <Link to={`/invoices/preview/${row.invoice_id}`}>
                          <Tooltip
                                title={
                                  <>
                                    <Icon
                                      icon="heroicons-outline:eye"
                                      className="w-5 h-5 text-slate-800 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                                    />
                                  </>
                                }
                                content="Preview Invoice"
                                placement="top"
                                theme="dark"
                                className=" dark:text-white hover:text-white dark:hover:text-black"
                                arrow
                              />
                              </Link>
                        }
                      </td>
                      <td className="table-td align-middle">
                        {
                          <Link to={`/invoices/edit/${row.invoice_id}`}>
                          <Tooltip
                                title={
                                  <>
                                    <Icon
                                      icon="heroicons-outline:pencil-square"
                                      className="w-5 h-5 text-slate-800 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                                    />
                                  </>
                                }
                                content="Edit Invoice"
                                placement="top"
                                theme="dark"
                                className="w-5 h-5 text-slate-800 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                                arrow
                              />
                              </Link>
                        }
                      </td>
                      <td className="table-td align-middle">
                        {
                          <Tooltip
                                title={
                                  <>
                                    <Icon
                                      icon="heroicons-outline:trash"
                                      className="w-5 h-5 text-red-500 dark:text-red-500 hover:text-red-600 dark:hover:text-red-600 cursor-pointer"
                                    />
                                  </>
                                }
                                content="Delete Invoice"
                                placement="top"
                                theme="dark"
                                className=" dark:text-white hover:text-white dark:hover:text-black"
                                arrow
                              />
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default InvoiceDisplay;
