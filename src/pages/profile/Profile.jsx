import React, { useState, useEffect, useRef } from "react";
import "./Profile.css";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import NavBar from "../../components/navBar/NavBar";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { LogOut, LockKeyholeOpen, Camera, Trash2 } from "lucide-react";

const ProfileScreen = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [isEditable, setIsEditable] = useState(false);
    const [loading, setLoading] = useState(true);

    const [profileData, setProfileData] = useState({
        id: "",
        nome: "",
        cpf: "",
        dataNascimento: "",
        email: "",
        senha: ""
    });

    const [userImage, setUserImage] = useState(null);
    const [imageError, setImageError] = useState(false);

const formatDateForInput = (isoString) => {
    if (!isoString) return "";
    try {
        const str = String(isoString);
        return str.includes("T") ? str.substr(0, 10) : str;
    } catch (e) {
        return "";
    }
};

const formatDateForBackend = (dateString) => {
    if (!dateString) return "";
    
    const actualString = Array.isArray(dateString) ? dateString : dateString;
    
    return String(actualString).substr(0, 10);
};
    useEffect(() => {
        const loadUserData = () => {
            try {
                const storageUser = localStorage.getItem("user");

                if (!storageUser) {
                    navigate("/");
                    return;
                }

                const userLogged = JSON.parse(storageUser);
                const rawDate = userLogged.dataNascimento || userLogged.data_nascimento || "";

                setProfileData({
                    id: userLogged.id || "",
                    nome: userLogged.nome || "",
                    cpf: userLogged.cpf || "",
                    dataNascimento: formatDateForInput(rawDate),
                    email: userLogged.email || "",
                    senha: ""
                });

                if (userLogged.foto_usuario) {
                    setUserImage(userLogged.foto_usuario);
                    setImageError(false);
                } else {
                    setUserImage(null);
                }

            } catch (error) {
                console.error("Erro ao carregar dados do localStorage:", error);
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const files = Array.from(e.target.files);
        const file = files[0];
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

        if (!allowedTypes.includes(file.type)) {
            alert("Apenas arquivos PNG ou JPEG são permitidos.");
            e.target.value = "";
            return;
        }

        if (userImage && userImage.startsWith("blob:")) {
            URL.revokeObjectURL(userImage);
        }

        setUserImage(URL.createObjectURL(file));
        setImageError(false);
    };

    const handleRemoveImage = (e) => {
        e.stopPropagation();
        if (userImage && userImage.startsWith("blob:")) {
            URL.revokeObjectURL(userImage);
        }
        setUserImage(null);
        setImageError(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleCancel = () => {
        setIsEditable(false);
        const userLogged = JSON.parse(localStorage.getItem("user"));

        setProfileData({
            id: userLogged.id || "",
            nome: userLogged.nome || "",
            cpf: userLogged.cpf || "",
            dataNascimento: formatDateForInput(userLogged.dataNascimento || userLogged.data_nascimento || ""),
            email: userLogged.email || "",
            senha: ""
        });
        setUserImage(userLogged.foto_usuario || null);
        setImageError(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!profileData.nome || !profileData.email) {
            alert("Os campos Nome e Email são obrigatórios.");
            return;
        }

        try {

            const updatedPayload = {
                nome: profileData.nome,
                email: profileData.email,
                cpf: profileData.cpf,
                data_nascimento: formatDateForBackend(profileData.dataNascimento),
                senha: profileData.senha || undefined,
                foto_usuario: userImage || "",
                is_ativo: true
            };

            console.log(updatedPayload)

            const response = await api.put(`/usuario/${profileData.id}`, updatedPayload);

            if (response.data && response.data.status) {

                localStorage.setItem("user", JSON.stringify({
                    ...JSON.parse(localStorage.getItem("user")),
                    ...profileData,
                    data_nascimento: updatedPayload.data_nascimento,
                    foto_usuario: userImage
                }));

                alert("Perfil atualizado com sucesso!");
                setIsEditable(false);
            } else {
                alert(response.data?.message || "Erro ao atualizar dados do perfil.");
            }
        } catch (error) {
            console.error("Erro ao salvar alterações do perfil:", error);
            alert(error.response?.data?.message || "Não foi possível conectar ao servidor.");
        }
    };

    if (loading) {
        return (
            <div className="profileScreen loadingContainer">
                <h2>Carregando dados do perfil...</h2>
            </div>
        );
    }

    return (
        <div className="profileScreen">
            <div className="topHeaderActions">
                <button className="btnLogout" onClick={handleLogout}>
                    <LogOut size={20} />
                    Sair do App
                </button>
            </div>

            <main className="profileContainer">
                <h1 className="profileTitle">MEU PERFIL</h1>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleImageChange}
                />

                <div
                    className={`avatarWrapper ${isEditable ? "activeEditable" : ""}`}
                    onClick={() => isEditable && fileInputRef.current?.click()}
                >
                    {userImage && !imageError ? (
                        <img
                            src={userImage}
                            alt="Foto de perfil"
                            className="userProfileImage"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <svg className="avatarIcon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                    )}

                    {isEditable && (
                        <div className="avatarOverlay">
                            <Camera size={24} color="#ffffff" />
                        </div>
                    )}

                    {isEditable && userImage && (
                        <button className="removeAvatarBtn" onClick={handleRemoveImage} type="button">
                            <Trash2 size={14} color="#ffffff" />
                        </button>
                    )}
                </div>

                {!isEditable && (
                    <button className="btnEnableEdit" onClick={() => setIsEditable(true)}>
                        <LockKeyholeOpen size={18} />
                        Habilitar Edição
                    </button>
                )}

                <form className="profileForm" onSubmit={handleSave}>
                    <div className="profileInputGroup">
                        <label>Nome</label>
                        <Input
                            name="nome"
                            type="text"
                            value={profileData.nome}
                            onChange={handleChange}
                            disabled={!isEditable}
                            placeholder="Digite seu nome"
                        />
                    </div>

                    <div className="profileInputGroup">
                        <label>CPF</label>
                        <Input
                            name="cpf"
                            type="text"
                            value={profileData.cpf}
                            onChange={handleChange}
                            disabled={!isEditable}
                            placeholder="000.000.000-00"
                        />
                    </div>

                    <div className="profileInputGroup">
                        <label>Data Nascimento</label>
                        <Input
                            name="dataNascimento"
                            type="date"
                            value={profileData.dataNascimento}
                            onChange={handleChange}
                            disabled={!isEditable}
                        />
                    </div>

                    <div className="profileInputGroup">
                        <label>Email</label>
                        <Input
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleChange}
                            disabled={!isEditable}
                            placeholder="seuemail@exemplo.com"
                        />
                    </div>

                    {isEditable && (
                        <div className="profileInputGroup">
                            <label>Senha</label>
                            <Input
                                name="senha"
                                type="password"
                                value={profileData.senha}
                                onChange={handleChange}
                                placeholder="Confirme a senha se desejar alterar"
                            />
                        </div>
                    )}

                    {isEditable && (
                        <div className="profileActionButtons">
                            <Button
                                text="Cancelar"
                                variant="secondary"
                                type="button"
                                onClick={handleCancel}
                                className="btnCancelProfile"
                            />
                            <Button
                                text="Salvar"
                                variant="primary"
                                type="submit"
                                className="btnSaveProfile"
                            />
                        </div>
                    )}
                </form>
            </main>
            <NavBar />
        </div>
    );
};

export default ProfileScreen;