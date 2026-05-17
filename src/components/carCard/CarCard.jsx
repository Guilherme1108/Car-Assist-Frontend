import React from "react";
import "../../pages/home/Home.css";

const CarCard = ({ car, isDesktop, onNavigate }) => {
  return (
    <div
      className="card"
      onClick={ () => onNavigate("./veiculo")}
    >

      <img className="imgCar" src={car.image} alt={car.name} />

      <span className="carName">{car.name}</span>

      <div className="lowerInformations">
        <span className="carPlate">{car.plate}</span>
        <span className="carPoints">{car.points}</span>
      </div>

      <div className="alinhamentoBtn">
      </div>
    </div>
  );
};

export default CarCard;