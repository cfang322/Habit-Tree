import "./Modal.css";

function Modal({ children }) {
  return (
    <div id="modal">
      <div id="modal-background" />
      <div id="modal-content">{children}</div>
    </div>
  );
}

export default Modal;
