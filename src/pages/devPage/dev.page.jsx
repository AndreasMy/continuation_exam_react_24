import { Modal } from "../../components/modal/modal.component";
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { WorkoutEntry } from "../../molecules/workoutEntry/workoutEntry.molecules";
import { Button } from "../../components/button/button.component";

import { useState } from "react";

export const DevPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Wrapper className="page-content-wrapper">
        <h1>Dev page</h1>
        <Button onClick={handleOpenModal}>Cick me</Button>
      </Wrapper>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <WorkoutEntry />
        </Modal>
      )}
    </>
  );
};
