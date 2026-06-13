import React from "react";
import "./Service.css";
import NavBar from "../../components/navBar/NavBar";
import { Wrench } from "lucide-react";

const ServiceScreen = () => {
    return (
        <div className="serviceScreen">
            <div className="constructionContainer">
                <div className="iconAnimation">
                    <Wrench size={48} className="constructionIcon" />
                </div>
                <h1 className="titleConstruction">Página em Construção</h1>
                <p className="textConstruction">
                    Estamos trabalhando duro para trazer os melhores <span className="primaryText">serviços</span> para o seu veículo em breve!
                </p>
            </div>
            
            <NavBar />
        </div>
    );
}

export default ServiceScreen;