import styled from "styled-components";

export const ModalOverlay = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: rgba(107, 114, 128, 0.5);
  z-index: 9;
  width: 100%;
  min-height: 100vh;
`;

export const ModalWrapper = styled.div`
  position: relative;
  background-color: #fff;
  width: 500px;
  border: 1px solid rgb(179, 179, 179);
  border-radius: 4px;
  overflow: hidden;
  padding: 52px 32px 32px 32px;
`;

export const ModalContent = styled.div`
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: var(--neutral-600);
    border: 1px solid var(--neutral-200);
  }
`;