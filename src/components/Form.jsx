import { useState } from "react";
import numberToWords from "../utils/numberToWords";

const Form = ({ setData }) => {

  // ✅ ADD HERE
  console.log("LATEST FORM FILE LOADED");

  const [formData, setFormData] = useState({
    type: "INVOICE",
    clientName: "",
    address: "",
    date: "",
    items: [{ desc: "", qty: 1, rate: 0, unit: "Nos." }],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemChange = (index, e) => {
    const updatedItems = [...formData.items];
    updatedItems[index][e.target.name] = e.target.value;

    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { desc: "", qty: 1, rate: 0, unit: "Nos." }],
    });
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => {
      return total + item.qty * item.rate;
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const total = calculateTotal();
    const amountInWords = numberToWords(total);

    setData({
      ...formData,
      total,
      amountInWords,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Document</h2>

      <label>
        <input
          type="radio"
          name="type"
          value="INVOICE"
          checked={formData.type === "INVOICE"}
          onChange={handleChange}
        />
        Invoice
      </label>

      <label>
        <input
          type="radio"
          name="type"
          value="ESTIMATE"
          checked={formData.type === "ESTIMATE"}
          onChange={handleChange}
        />
        Estimate
      </label>

      <br /><br />

      <input
        type="text"
        name="clientName"
        placeholder="Client Name"
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="address"
        placeholder="Address"
        onChange={handleChange}
      />

      <br /><br />

      <input type="date" name="date" onChange={handleChange} />

      <br /><br />

      <h3>Items</h3>

      {formData.items.map((item, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="desc"
            placeholder="Description"
            value={item.desc}
            onChange={(e) => handleItemChange(index, e)}
          />

          <input
            type="number"
            name="qty"
            value={item.qty}
            onChange={(e) => handleItemChange(index, e)}
          />

          <input
            type="number"
            name="rate"
            value={item.rate}
            onChange={(e) => handleItemChange(index, e)}
          />

          <input
            type="text"
            name="unit"
            value={item.unit}
            onChange={(e) => handleItemChange(index, e)}
          />

          <button type="button" onClick={() => removeItem(index)}>
            ❌
          </button>
        </div>
      ))}

      <button type="button" onClick={addItem}>
        ➕ Add Item
      </button>

      <br /><br />

      <button type="submit">Generate</button>
    </form>
  );
};

export default Form;