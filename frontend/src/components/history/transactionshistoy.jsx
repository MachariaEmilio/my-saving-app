import React, { useEffect, useState } from "react";
import "./transactionhistory.css";

const Transactionshistoy = () => {
  const [datas, setdata] = useState([]);
  const id = JSON.parse(localStorage.getItem("userdetails"));

  useEffect(() => {
    async function get_transactions_history() {
      const data = await fetch(
        `http://localhost:3000/transactionbyid/${id.id}`
      ).then((data) => data.json());
      console.log(data);
      setdata(data);
    }
    get_transactions_history();
  }, []);

  return (
    <>
    <div className="statement">     <p>statement </p>  
    <button> download</button>
 </div>

      <div className="allstatement">
        {datas.map((transaction) => (
          <Transactionlist
    
            transaction={transaction}
          />
        ))}
      </div>
    </>
  );
};

const Transactionlist = ({ transaction }) => {
  return (
    <>
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
          <p>{transaction.timestamp} </p>
        </div>
      </div>
    </>
  );
};
export default Transactionshistoy;
