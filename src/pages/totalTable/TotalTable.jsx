import React, { useEffect } from "react";
import { useState } from "react";
const rows = [
  {
    item: "Headphone",
    qty: 2,
    price: "$600.25",
    total: "$1200.50",
  },
  {
    item: "Headphone",
    qty: 2,
    price: "$600.25",
    total: "$1200.50",
  },
  {
    item: "Headphone",
    qty: 2,
    price: "$600.25",
    total: "$1200.50",
  },
  {
    item: "Headphone",
    qty: 2,
    price: "$600.25",
    total: "$1200.50",
  },
];

const TotalTable = (props) => {
  const[rows,setRows]=useState(props.data);
  const [total,setTotal]=useState(0);
useEffect(()=>{
  setTotal(rows.reduce((acc,curr)=>acc+Number(curr.price),0))
},[])
  return (
    <div>
      <table className="w-full border-collapse table-fixed dark:border-slate-700 dark:border">
        <tr>
          <th
            colSpan={2}
            className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left"
          >
            <span className="block px-6 py-5 font-semibold">Item</span>
          </th>
          <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left"
          colSpan={2}>
            <span className="block px-6 py-5 font-semibold">Description</span>
          </th>
          <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
            <span className="block px-6 py-5 font-semibold">PRICE</span>
          </th>
          <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
            <span className="block px-6 py-5 font-semibold">TOTAL</span>
          </th>
        </tr>
        {rows.map((data, index) => (
          <tr
            key={index}
            className="border-b border-slate-100 dark:border-slate-700"
          >
            <td
              colSpan={2}
              className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4"
            >
              {data.itemName}
            </td>
            <td colSpan={2} className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
              {data.description}
            </td>
            <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
              {data.price}
            </td>
            <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left px-6 py-4">
              {data.price}
            </td>
          </tr>
        ))}
      </table>
      <div className="md:flex px-6 py-6 items-center">
        <div className="flex-1 text-slate-500 dark:text-slate-300 text-sm">
          {props.notes}
        </div>
        <div className="flex-none min-w-[270px] space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-slate-600 text-xs dark:text-slate-300 uppercase">
              subtotal:
            </span>
            <span className="text-slate-900 dark:text-slate-300">₹{total}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-slate-600 text-xs dark:text-slate-300 uppercase">
              GST (5%):
            </span>
            <span className="text-slate-900 dark:text-slate-300">{total*0.05}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-slate-600 text-xs dark:text-slate-300 uppercase">
              Invoice total:
            </span>
            <span className="text-slate-900 dark:text-slate-300 font-bold">
              {total+total*0.05}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalTable;
