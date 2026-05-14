import React from "react";
import "./CarCard.css"; // Se você optar por separar o CSS do Card

const CarCard = ({ car, isDesktop, onNavigate }) => {
  return (
    <div
      className="card"
      /* No mobile, o card inteiro é clicável */
      onClick={!isDesktop ? () => onNavigate("/veiculo") : undefined}
    >
      <img className="imgCar" src={car.image} alt={car.name} />

      <span className="carName">{car.name}</span>

      <div className="lowerInformations">
        <span className="carPlate">{car.plate}</span>
        <span className="carPoints">{car.points}</span>
      </div>

      <div className="alinhamentoBtn">
        <button
          className="buttonVerDetalhes"
          /* No desktop, apenas o botão navega */
          onClick={(e) => {
            if (isDesktop) {
              e.stopPropagation(); // Evita conflitos de clique
              onNavigate("/veiculo");
            }
          }}
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
};

export default CarCard;