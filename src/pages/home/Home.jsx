import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import imagemCarro from "../../assets/imagem_carro_card.jpg";
import { useNavigate } from "react-router-dom";
import { CopyPlus, ChevronLeft, ChevronRight, CarFront } from "lucide-react";
import NavBar from "../../components/navBar/NavBar";
import CarCard from "../../components/CarCard/CarCard";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [myCars, setMyCars] = useState([]);
  
  // Referência para controlar o scroll do contêiner dos cards
  const carouselRef = useRef(null);

  useEffect(() => {
    // Simulando dados do backend
    setMyCars([
      { id: 1, name: "Civic SI", plate: "EXE3006", points: 100, image: imagemCarro },
      { id: 2, name: "Porshe 911", plate: "EXE3006", points: 100, image: imagemCarro },
      { id: 3, name: "Maclaren Senna", plate: "EXE3006", points: 100, image: imagemCarro },
      { id: 4, name: "Ferrari Puro Sangue", plate: "EXE3006", points: 100, image: imagemCarro },
    ]);
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      // Descobre a largura de um card dinamicamente para rolar a quantia exata
      const cardWidth = carouselRef.current.firstChild?.offsetWidth || 300;
      carouselRef.current.scrollBy({ left: -(cardWidth + 20), behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.firstChild?.offsetWidth || 300;
      carouselRef.current.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
    }
  };

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

      <span className="backgorundCarName">Civic SI</span>

      <div className="carouselContainer">
        <button className="carouselBtn prev" onClick={scrollLeft} aria-label="Voltar">
          <ChevronLeft size={32} />
        </button>

        <div className="cards" ref={carouselRef}>
          {myCars.map((car) => (
            <div key={car.id} className="carouselItem">
              <CarCard 
                car={car} 
                onNavigate={navigate} 
              />
            </div>
          ))}
        </div>

        <button className="carouselBtn next" onClick={scrollRight} aria-label="Avançar">
          <ChevronRight size={32} />     
        </button>
      </div>

      <div className="addCarArea">
        <CarFront className="iconCarFront" size={32}></CarFront>
        
        <span className="textAddCar primaryText">
          Adicione um novo carro
        </span>

        <span className="textAddCar">
          Mantenha seu perfil sempre atualizado
        </span>

        <button className="addCarButton">
        <CopyPlus className="iconAddCarButton" size={18} />
        <p className="textScore">Adicionar Carro</p>
      </button>
      </div>

      

      <NavBar/>
    </div>
  );
};

export default HomeScreen;