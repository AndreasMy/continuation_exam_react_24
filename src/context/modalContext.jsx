import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [muscleGroupID, setMuscleGroupID] = useState(null);

  const openModal = (content, mgID = null) => {
    setModalContent(content);
    setMuscleGroupID(mgID);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalContent,
        openModal,
        closeModal,
        muscleGroupID,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
