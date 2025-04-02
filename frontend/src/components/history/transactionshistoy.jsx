import React, { useEffect, useState, useRef } from "react";
import "./transactionhistory.css";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Important: Import after jsPDF

const Transactionshistoy = () => {
  const [datas, setdata] = useState([]);
  const id = JSON.parse(localStorage.getItem("userdetails"));
  const tableRef = useRef(null);

  useEffect(() => {
    async function get_transactions_history() {
      try {
        const response = await fetch(
          `http://localhost:3000/transactionbyid/${id.id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setdata(data);
        } else {
          console.error("Invalid or empty data from API:", data);
          setdata([]);
        }
      } catch (error) {
        console.error("Error fetching transaction history:", error);
        setdata([]);
      }
    }
    get_transactions_history();
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction History", 10, 10);

    const tableData = datas.map((transaction) => [
      transaction.fullname,
      transaction.id,
      transaction.amount,
      transaction.timestamp,
    ]);

    doc.autoTable({
      head: [["Full Name", "ID", "Amount", "Timestamp"]],
      body: tableData,
      startY: 20, // Start table after the title
    });

    doc.save("transaction_history.pdf");
  };

  return (
    <>
      <div className="statement">
        <p>Statement</p>
        <button onClick={handleDownloadPDF}>Download PDF</button>
      </div>

      <div className="allstatement" ref={tableRef}>
        {datas.map((transaction) => (
          <Transactionlist transaction={transaction} key={transaction.id} />
        ))}
      </div>
    </>
  );
};

const Transactionlist = ({ transaction }) => {
  return (
    <div className="history">
      <div>
        <p>{transaction.fullname}</p>
        <p>{transaction.id}</p>
      </div>

      <div className="date">
        <p
          className={`amount ${
            parseInt(transaction.amount) > 0 ? "blue" : "red"
          }`}
        >
          {transaction.amount}
        </p>
        <p>{transaction.timestamp}</p>
      </div>
    </div>
  );
};

export default Transactionshistoy;
