import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { useForm, useFieldArray } from "react-hook-form";

const Repeater = (props) => {
  const [itemData, setItemData] = useState([]);

  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      
    }
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  const handleFieldChange = (index, field, value) => {
    const updatedData = [...itemData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setItemData(updatedData);
    // console.log(itemData);
  };

  const handleFieldDelete = (index) => {
    const updatedData = [...itemData];
    updatedData.splice(index, 1);
    setItemData(updatedData);
    remove(index);
  };

  const onClick = () => {
    props.sendData(itemData);
  };

  return (
    <div>
      <div className="bg-slate-50 dark:bg-slate-800 -mx-6 px-6 py-6">
        <div className="mb-6 text-slate-600 dark:text-slate-300 text-xs font-medium uppercase">
          Items info
        </div>

        <div>
          <form>
            {fields.map((item, index) => (
              <div
                className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                key={index}
              >
                <Textinput
                  label="Item Name"
                  type="text"
                  id={`name${index}`}
                  placeholder="First Name"
                  register={register}
                  name={`test[${index}].firstName`}
                  onChange={(e) => {
                    handleFieldChange(index, "itemName", e.target.value);
                    onClick();
                  }}
                />

                <Textinput
                  label="Description"
                  type="textbox"
                  id={`name2${index}`}
                  placeholder="Last Name"
                  register={register}
                  name={`test[${index}].lastName`}
                  onChange={(e) => {
                    handleFieldChange(index, "description", e.target.value);
                    onClick();
                  }}
                />

                <div className="flex justify-between items-end space-x-5">
                  <div className="flex-1">
                    <Textinput
                      label="Price"
                      type="number"
                      id={`name3${index}`}
                      placeholder="Phone"
                      register={register}
                      name={`test[${index}].phone`}
                      onChange={(e) => {
                    handleFieldChange(index, "price", e.target.value);
                    onClick();
                  }}
                    />
                  </div>
                  {index > 0 && (
                    <div className="flex-none relative">
                      <button
                        onClick={() => {
                          handleFieldDelete(index);
                          onClick();
                        }}
                        type="button"
                        className="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                      >
                        <Icon icon="heroicons-outline:trash" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </form>
          <div className="mt-4">
            <Button
              text="Add new"
              icon="heroicons-outline:plus"
              className="text-slate-600 p-0 dark:text-slate-300"
              onClick={() => {
                append();
                setItemData([...itemData, {}]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repeater;
