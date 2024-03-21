import { Modal } from "../../components/modal/modal.component";
import { Wrapper } from "../../components/wrapper/wrapper.component";
import { WorkoutEntry } from "../../molecules/workoutEntry/workoutEntry.molecules";
import { Button } from "../../components/button/button.component";

import { useModal } from "../../context/modalContext";

export const DevPage = () => {
  const { openModal } = useModal();

  return (
    <>
      <Wrapper className="page-content-wrapper">
        <h1>Dev page</h1>
        <Button onClick={() => openModal(<WorkoutEntry />)}>
          Open Exercises From Global Scope
        </Button>
      </Wrapper>
    </>
  );
};
