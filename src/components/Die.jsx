const Die = ({ digit, isHeld, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`align-items-center border col d-flex die fw-bold justify-content-center p-2 rounded shadow-sm text-center  ${
        isHeld ? "bg-success text-light" : "bg-light text-dark"
      }`}
    >
      {digit}
    </div>
  );
};

export default Die;
