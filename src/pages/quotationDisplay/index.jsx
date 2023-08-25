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
const QuotationDisplay = () => {
  const navigate = useNavigate();
  const [quotationData, setquotationData] = useState();

  async function getQuotation() {
    try {
      let { data: quotations, error } = await supabase
        .from("quotations")
        .select("*")
        .range(0, 9)
        .ilike("user_id", `%${Cookies.get("userID")}%`);

      console.log(quotations);

      setquotationData(quotations);
      // setTimeout(() => {
      //   setquotationData(quotations);
      // }, 5000);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getQuotation();
  }, []);

  const columns = [
    {
      label: "Quotation ID",
    },
    {
      label: "Quotation Date",
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

  return !quotationData ? (
    <Loading />
  ) : (
    <>
      <Card title="Quotations" 
       headerslot={
          <Button
            text="Add new"
            icon="heroicons-outline:plus"
            className="btn-dark"
            onClick={() => navigate("/quotation/add")}
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
                  {quotationData.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <td className="table-td">{row.quotation_Id}</td>
                      <td className="table-td">
                        {row.quotationData.creationDate.split("T")[0]}
                      </td>
                      <td className="table-td">
                        {row.quotationData.recipientName}
                      </td>
                      <td className="table-td">
                      ₹ {row.quotationData.itemData.reduce((a, b) => a + Number(b.price), 0)}
                      </td>
                      <td className="table-td align-middle">
                        {
                          <Link to={`/quotation/preview/${row.quotation_Id}`}>
                          <Tooltip
                                title={
                                  <>
                                    <Icon
                                      icon="heroicons-outline:eye"
                                      className="w-5 h-5 text-slate-800 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                                    />
                                  </>
                                }
                                content="Preview Quotation"
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
                          <Link to={`/quotation/edit/${row.quotation_id}`}>
                          <Tooltip
                                title={
                                  <>
                                    <Icon
                                      icon="heroicons-outline:pencil-square"
                                      className="w-5 h-5 text-slate-800 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                                    />
                                  </>
                                }
                                content="Edit Quotation"
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
                                content="Delete Quotation"
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

export default QuotationDisplay;
