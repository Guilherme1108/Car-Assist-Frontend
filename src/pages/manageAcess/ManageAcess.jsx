import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, MoreVertical, X } from "lucide-react";
import api from "../../services/api";
import "./ManageAcess.css";
import NavBar from "../../components/navBar/NavBar";

const ManageAcessScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const vehicle = location.state?.vehicleData;
  const vehicleId = vehicle?.id;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");
  const [showModal, setShowModal] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null);

  useEffect(() => {
    if (!vehicleId) {
      navigate("/home");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await api.get(`/usuario-veiculo/veiculo/${vehicleId}`);
        const relations = response.data.data.usuario_veiculo;

        const detailedUsers = await Promise.all(
          relations.map(async (rel) => {
            const userRes = await api.get(`/usuario/${rel.id_usuario}`);
            const userData = userRes.data.data.usuario[0];
            return { 
              ...rel, 
              nome: userData.nome, 
              foto: userData.foto_usuario || null 
            };
          })
        );
        setUsers(detailedUsers.sort((a, b) => b.is_ativo - a.is_ativo));
      } catch (err) { 
        console.error("Erro ao buscar dados:", err); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchData();
  }, [vehicleId, navigate]);

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      if (filter === "ativos") return u.is_ativo === 1;
      if (filter === "inativos") return u.is_ativo === 0;
      return true;
    });
  }, [users, filter]);

  if (loading) return <div className="manageAcessScreen loadingContainer">Carregando...</div>;

  return (
    <div className="manageAcessScreen">
      <header className="headerManageAcess">
        <ChevronLeft className="backIcon" onClick={() => navigate(-1)} />
        <span className="titleManageAcess">Gerenciar Acessos</span>
      </header>

      <div className="filterGroup">
        {["todos", "ativos", "inativos"].map(f => (
          <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="userList">
        {filteredUsers.map((user) => (
          <div key={`${user.id_usuario}-${user.data_vinculo}`} className="userCard">
            <div className={`roleBar ${user.is_ativo === 1 ? user.papel_usuario.toLowerCase().replace('á', 'a') : 'inactive'}`} />
            
            <img 
              src={user.foto} 
              alt={user.nome} 
              className={`userAvatar ${!user.foto ? 'hidden' : ''}`}
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling?.classList.remove('hidden'); }} 
            />
            
            <div className={`userAvatar userAvatarPlaceholder ${user.foto ? 'hidden' : ''}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>

            <div className="userInfo">
              <h4 className="userName">{user.nome} {user.is_ativo === 1 && user.papel_usuario === 'Proprietário' && "(Atual)"}</h4>
              <p className="userRole">{user.papel_usuario}</p>
              <p className="userDate">Desde: {new Date(user.data_vinculo).toLocaleDateString()}</p>
              {user.data_desvinculo && <p className="userDate">Até: {new Date(user.data_desvinculo).toLocaleDateString()}</p>}
            </div>
            
            {user.is_ativo === 1 && (
              <MoreVertical 
                className="menuIcon" 
                onClick={() => { setUserToRemove(user); setShowModal(true); }} 
              />
            )}
          </div>
        ))}
      </div>

      {showModal && userToRemove && (
        <div className="modalOverlay">
          <div className="modalManageAcess">
            <X className="closeModal" onClick={() => setShowModal(false)} />
            <p className="modalText">Você deseja remover a permissão de <strong>{userToRemove.nome}</strong>?</p>
            <div className="modalActions">
              <button className="btnCancel" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btnConfirm">Sim</button>
            </div>
          </div>
        </div>
      )}
      <NavBar />
    </div>
  );
};

export default ManageAcessScreen;