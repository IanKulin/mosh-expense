interface TDDeleteButtonProps {
  onClick: (id: string) => void;
  id: string;
}

function TDDeleteButton({ onClick, id}: TDDeleteButtonProps) {
  return (
    <td>
      <button
        className="btn btn-outline-danger"
        onClick={() => onClick(id)}
      >
        Delete
      </button>
    </td>
  );
};

export default TDDeleteButton;
