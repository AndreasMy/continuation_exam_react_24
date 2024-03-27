import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { useWorkoutContext } from "./workoutContext";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {loadExercises} = useWorkoutContext();

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
    setIsModalOpen(true);
    setModals((currentModals) => [...currentModals, { content, mgID }]);
  };

  const closeModal = async () => {
    setIsModalOpen(false);
    const newModals = modals.slice(0, -1);
    setModals(newModals);
    if (newModals.length === 0) {
      await loadExercises();
    }
  };
  
  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        modals,
        isModalOpen,
        setIsModalOpen,
      }}
      openModal
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
