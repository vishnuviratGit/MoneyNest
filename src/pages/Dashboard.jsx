import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Cards from "../components/Cards/Cards";
import { Modal } from "antd";
import AddExpense from "../components/Modals/AddExpense";
import AddIncome from "../components/Modals/AddIncome";
import { addDoc, collection, getDoc, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import TrasactionsTable from "../components/TransactionsTable/Trasactions";
import Chart from "../components/Charts/chart";
import Notransactions from "../components/Notransactions";
const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    console.log(newTransaction);
    addTransaction(newTransaction);
  };
  const addTransaction = async (transaction, many) => {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID:", docRef.id);
      
      setTransactionList([...transactionList, transaction]);

      if(!many)toast.success("Transaction Added!");
    } catch (error) {
      console.log("error added", error);

      if(!many) toast.error("Could not add transaction");
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, [user]);
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      if (user) {
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        let transactionArray = [];
        querySnapshot.forEach((doc) => {
          transactionArray.push(doc.data());
        });
        setTransactionList(transactionArray);

        console.log(transactionArray);
        toast.success("Transaction fetched!");
      }
    } catch (error) {
      console.log("error is:", error);
      toast.error(error.message);
    }

    setLoading(false);
  };
  useEffect(() => {
    calculateBalance();
  }, [transactionList]);
  const calculateBalance = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;
    transactionList.forEach((transaction) => {
      if (transaction.type == "income") {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });
    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  };
  let sortedTransactions=transactionList.sort((a, b)=> new Date(a.date)- new Date(b.date));
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Header />
          <Cards
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            totalIncome={income}
            totalExpense={expense}
            totalBalance={totalBalance}
          />

          {transactionList.length!==0?<Chart sortedTransactions={sortedTransactions}/>:<Notransactions/>}
          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
            
          />
          <TrasactionsTable trsctions={transactionList} addTransaction={addTransaction} fetchTransactions={fetchTransactions}/>
        </div>
      )}
    </>
  );
};

export default Dashboard;
