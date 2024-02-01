import styled from "styled-components";

export const StyledCheckbox = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: var(--neutral-0);
  border: 1px solid var(--neutral-300);
  border-radius: 4px;
  transition: all 0.1s ease-in-out;

  svg {
    opacity: 0;
    transition: all 0.1s ease-in-out;
  }

  &.disabled {
    cursor: not-allowed;
    background-color: var(--neutral-100);
    border-color: var(--neutral-300);
    color: var(--neutral-400);
  }

  &.checked {
    background-color: var(--primary-600);
    border-color: var(--primary-600);
    color: var(--neutral-0);

    svg {
      opacity: 1;
    }
  }
`;
