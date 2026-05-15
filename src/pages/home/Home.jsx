import React, { useState, useEffect } from "react";
import "./Home.css";
import imagemCarro from "../../assets/carroTeste.webp";
import { useNavigate } from "react-router-dom";
import { CopyPlus } from "lucide-react";
import NavBar from "../../components/navBar/NavBar";
import CarCard from "../../components/CarCard/CarCard";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [myCars, setMyCars] = useState([]);
  const isDesktop = window.innerWidth >= 1024;

  useEffect(() => {
    // Simulando dados do backend
    setMyCars([
      { id: 1, name: "Civic SI", plate: "EXE3006", points: 100, image: imagemCarro },
      { id: 2, name: "Porshe 911", plate: "EXE3006", points: 100, image: imagemCarro },
      { id: 3, name: "Maclaren Senna", plate: "EXE3006", points: 100, image: imagemCarro },
      { id: 4, name: "Ferrari Puro Sangue", plate: "EXE3006", points: 100, image: imagemCarro },
    ]);
  }, []);

  return (
    <div className="homeScreen">
      <span className="titleHome">Garagem</span>

      <div className="containerScore">
        <div className="textsScore">
          <span className="garagePoints">80</span>
          <p className="textScore">Score da garagem</p>
        </div>
        <div className="bar"><div className="filledBar"></div></div>
      </div>

      <div className="cards">
        {myCars.map((car) => (
          <CarCard 
            key={car.id} 
            car={car} 
            isDesktop={isDesktop} 
            onNavigate={navigate} 
          />
        ))}
      </div>

      <button className="addCarButton">
        <CopyPlus className="iconAddCarButton" size={18} />
        <p className="textScore">Adicionar Carro</p>
      </button>

      <NavBar />
    </div>
  );
};

export default HomeScreen;