import React, { useRef, useState } from "react";
import { Table, Select, Radio, Button } from "antd";
import "./styles.css";
import { unparse, parse } from "papaparse";
import { toast } from "react-toastify";
const TrasactionsTable = ({ trsctions, addTransaction, fetchTransactions }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const fileInputRef= useRef(null);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];
  let filteredData = trsctions.filter(
    (transaction) =>
      transaction.name.toLowerCase().includes(search.toLowerCase()) &&
      transaction.type.includes(typeFilter)
  );
  let sortedData = filteredData.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortKey === "amount") {
      return b.amount - a.amount;
    } else {
      return 0;
    }
  });
  const exportCSV =()=>{
      var csv=unparse({
        fields: ["name", "type", "tag", "date", "amount"],
        data: trsctions,
      })
      const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});
      const url=URL.createObjectURL(blob);
      const link= document.createElement("a");
      link.href=url;
      link.download="transactions.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

  }
  const handleClick=()=>{
    fileInputRef.current.click();
  }
  const importCSV=(event)=>{
        event.preventDefault();
        try{
            parse(event.target.files[0],{
                header: true,
                skipEmptyLines: true,
                complete: async function(results){
                    for(const transaction of results.data){
                        if (!transaction.name || !transaction.amount || !transaction.type || !transaction.date) {
                            
                            continue;
                          }
                        const newTransaction={
                            ...transaction, amount: parseFloat(transaction.amount),
                        };
                      
                        await addTransaction(newTransaction, true);
                    }
                    fetchTransactions();
                    toast.success("All transactions added");
                }
            })
           
            event.target.files=null;
           
        }
        catch(error){
             toast.error(error.message);
        }
  }


  
  return (
    <div className="main-container">
        <div className="search-select">
        <div className="searchDiv">
          <input
            type="text"
            className="searchBar"
            value={search}
            placeholder="Search by name..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <Select
          className="filter"
          placeholder="All"
          value={typeFilter}
          onChange={(value) => setTypeFilter(value)}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expense">Expense</Select.Option>
        </Select>
        </div>
     
      <div className="radio-table">
      <div className="headingTable">
      <p className="p-tag">My Transactions</p>
      <Radio.Group
        className="input-radio"
        onChange={(e) => setSortKey(e.target.value)}
        value={sortKey}
      >
        <Radio.Button value="" style={{height: "35px"}}>No Sort</Radio.Button>
        <Radio.Button value="date" style={{height: "35px"}}>Sort by Date</Radio.Button>
        <Radio.Button value="amount" style={{height: "35px"}}>Sort by Amount</Radio.Button>
      </Radio.Group>
      <div className="csv-btns">
      <Button className="imp-exp" style={{marginRight: "5px", backgroundColor: "var(--theme)", color: "white", height: "35px"}} onClick={handleClick}>Import to CSV</Button>
      <Button className="imp-exp" style={{marginRight: "5PX", height: "35px"}} onClick={exportCSV}> Export to CSV</Button>
      <input id="file-csv" type="file" accept=".csv" style={{display: "none"}} onChange={importCSV} ref={fileInputRef}/>
      </div>
      </div>
      <Table className="main-table" dataSource={sortedData} columns={columns} />
      </div>
    </div>
  );
};

export default TrasactionsTable;
