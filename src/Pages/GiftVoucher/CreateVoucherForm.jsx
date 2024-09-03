import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useData from "../../Context/DataContext";
import { useUserContext } from "../../Context/UserContext";

const generateCode = (length = 6) => {
  const nums = "1234567890";
  const letters = "QWERTYUIOPASDFGHJKLZXCVBNM";

  let code = "";
  for (let i = 0; i < length; i++) {
    if (i < 3) {
      code += letters[Math.floor(Math.random() * letters.length)];
    } else {
      code += nums[Math.floor(Math.random() * nums.length)];
    }
  }

  return code;
};

export default function CreateVoucherForm({ open, toggleModel, setVouchers }) {
  const [creatingVoucher, setCreatingVoucher] = useState(false);
  const { axiosInstance } = useUserContext();

  const [form] = Form.useForm();

  const createVoucherHandler = async () => {
    try {
      let values = form.getFieldsValue();
      values.numberOfBooks = parseInt(values.numberOfBooks);
      if (typeof values.numberOfBooks !== "number") {
        toast.error("Please input correct number of books");
        return;
      }
      const { data } = await axiosInstance.post("/gift-voucher", values);
      setVouchers((prev) => [data, ...(prev || [])]);
      toast.success("Gift voucher created successfully.");
      toggleModel();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <Modal
      open={open}
      onOk={createVoucherHandler}
      okButtonProps={{
        loading: creatingVoucher,
      }}
      onCancel={toggleModel}
      okText="Create Voucher"
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="Number of books" name="numberOfBooks">
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
