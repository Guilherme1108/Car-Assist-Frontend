import "./Expenses.css";
import {useNavigate} from "react-router-dom";
import BottomBar from "../../components/bottomBar/BottomBar";

const ExpensesScreen = () => {
  const expenses = [
    { label: 'Combustível', value: 'R$ 230,00' },
    { label: 'Limpeza', value: 'R$ 230,00' },
    { label: 'Pedagio', value: 'R$ 230,00' },
    { label: 'Estacionamento', value: 'R$ 230,00' },
    { label: 'Manutenção', value: 'R$ 230,00' },
    { label: 'Multas', value: 'R$ 230,00' },
  ];

  return (
    <div className="expensesScreen">
      <h1 className="expensesTitle">Gastos</h1>

      <div className="filterContainer">
        <button className="btnFilter active">Semanal</button>
        <button className="btnFilter inactive">Mensal</button>
      </div>

      <div className="divider" />

      <div className="expensesList">
        {expenses.map((item, index) => (
          <div key={index} className="expenseItem">
            <div className="expenseLabel">{item.label}</div>
            <span className="expenseValue">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="expenseItem totalRow">
        <div className="expenseLabel totalLabel">Total</div>
        <span className="expenseValue totalValue">R$ 1380,00</span>
      </div>
      <BottomBar></BottomBar>
    </div>
  );
};

export default ExpensesScreen