import "./Category.css";
import { ArrowLeft, EllipsisVertical, Wrench, House, User } from "lucide-react";

const ExpensesDetail = () => {
  const gastos = [
    { data: "25/02/2026", valor: "230,00" },
    { data: "25/02/2026", valor: "230,00" },
    { data: "25/02/2026", valor: "230,00" },
  ];

  return (
    <div className="expenseDetailContainer">
      <p className="expenseCategory">Gastos com Combustíveis</p>

      <div className="expenseCard">
        <button className="backButton" aria-label="Voltar">
          <ArrowLeft size={28} />
        </button>

        <img
          src="/logo.png"
          alt="Car Assist Logo"
          className="logoExpense"
        />

        <h1>Gastos com combustíveis</h1>

        <div className="expensesBox">
          {gastos.map((gasto, index) => (
            <div key={index}>
              <div className="expenseRow">
                <span>{gasto.data}</span>

                <div className="expenseValueContainer">
                  <span>R$ {gasto.valor}</span>
                  <EllipsisVertical size={20} />
                </div>
              </div>

              {/* Só renderiza a linha divisória se não for o último item */}
              {index !== gastos.length - 1 && (
                <div className="expenseDivider"></div>
              )}
            </div>
          ))}
        </div>

        <div className="bottomNav">
          <Wrench size={30} />
          <House size={30} />
          <User size={30} />
        </div>
      </div>
    </div>
  );
};

export default ExpensesDetail;