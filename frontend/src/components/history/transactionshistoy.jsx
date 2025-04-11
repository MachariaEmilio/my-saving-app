import React, { useEffect, useState, useRef } from "react";
import "./transactionhistory.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TransactionHistory = () => {
  console.log(jsPDF.API.autoTable); // should NOT be undefined

  const [transactions, setTransactions] = useState([]);
  const tableRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("userdetails"));

  useEffect(() => {
    async function fetchTransactionHistory() {
      try {
        const response = await fetch(
          `http://localhost:3000/transactionbyid/${user.id}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        if (result && Array.isArray(result.data)) {
          setTransactions(result.data);
        } else {
          console.error("Invalid or empty data from API:", result);
          setTransactions([]);
        }
      } catch (error) {
        console.error("Error fetching transaction history:", error);
        setTransactions([]);
      }
    }

    fetchTransactionHistory();
  }, [user.id]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction History", 14, 15);

    const tableData = transactions.map((tx) => [
      tx.fullname,
      tx.id,
      tx.amount,
      tx.timestamp,
    ]);

    doc.autoTable({
      head: [["Full Name", "ID", "Amount", "Timestamp"]],
      body: tableData,
      startY: 25,
      styles: { fontSize: 10 },
    });

    doc.save("transaction_history.pdf");
  };

  return (
    <div className="statement-container">
      <div className="statement-header">
        <h2>Transaction Statement</h2>
        {transactions.length > 0 && (
          <button onClick={handleDownloadPDF} className="download-btn">
            Download PDF
          </button>
        )}
      </div>

      <div className="all-statement" ref={tableRef}>
        {transactions.length === 0 ? (
          <p className="no-data">No transactions available.</p>
        ) : (
          transactions.map((tx) => (
            <TransactionItem
              transaction={tx}
              key={`${tx.id}-${tx.timestamp}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

const TransactionItem = ({ transaction }) => {
  const isPositive = parseFloat(transaction.amount) > 0;

  return (
    <div className="history">
      <div>
        <p>{transaction.fullname}</p>
        <p>ID: {transaction.id}</p>
      </div>
      <div className="date">
        <p className={`amount ${isPositive ? "blue" : "red"}`}>
          {transaction.amount}
        </p>
        <p>{transaction.timestamp}</p>
      </div>
    </div>
  );
};

export default TransactionHistory;
