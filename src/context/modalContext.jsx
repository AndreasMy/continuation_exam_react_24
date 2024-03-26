import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (modals.length > 0) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [modals.length]);

  const openModal = (content, mgID = null) => {
    setModals((currentModals) => [...currentModals, { content, mgID }]);
  };

  const closeModal = () => {
    setModals((currentModals) => currentModals.slice(0, -1));
  };
  console.log(modals);
  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        modals,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
