import "../styles/invoice.css";
import html2pdf from "html2pdf.js";

const Preview = ({ data }) => {

  console.log("PREVIEW LOADED");
  if (!data.type) return null;

  const downloadPDF = () => {
    const element = document.querySelector(".invoice-container");

    const opt = {
      margin: 5,
      filename: data.type === "INVOICE" ? "invoice.pdf" : "estimate.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <>
      <div className="invoice-container">

        <div className="title">{data.type}</div>

        <div className="company">
          <div><b>EYE VISTA ENTERPRISES</b></div>
          <div>SR. NO. 126, MOHANNAGAR, CHINCHWAD, PUNE – 411019</div>
          <div>Mob No: 7758933301, 8177907144</div>
        </div>

        <div className="client-section">
          <div>
            <b>{data.type === "INVOICE" ? "Bill to," : "Estimate to,"}</b>
            <div>{data.clientName}</div>
            <div>{data.address}</div>
          </div>

          <div>
            <b>Date</b>
            <div>{data.date}</div>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Description of Goods</th>
              <th>QTY</th>
              <th>RATE</th>
              <th>Units</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {data.items?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td style={{ textAlign: "left" }}>{item.desc}</td>
                <td>{item.qty}</td>
                <td>{item.rate}</td>
                <td>{item.unit}</td>
                <td>{item.qty * item.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total">
          ₹ {data.total}
        </div>

        <div className="footer">
          <div>
            <b>Amount (in words):</b> {data.amountInWords}
          </div>

          {data.type === "INVOICE" && (
            <div className="bank">
              <div>Note - Please make cheques in favor of</div>
              <br />
              <div>Bank Name: IndusInd Bank</div>
              <div>Account No: 201026931011</div>
              <div>Branch: Chinchwad</div>
              <div>IFSC Code: INDB0000002</div>
            </div>
          )}

          <div className="sign">
            Authorized Signatory
          </div>
        </div>

      </div>

      <button onClick={downloadPDF}>
        Download {data.type}
      </button>
    </>
  );
};

export default Preview;