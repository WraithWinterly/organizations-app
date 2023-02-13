export default function OpenModal({
  modalId,
  text,
}: {
  modalId: string;
  text: string;
}) {
  return (
    <label htmlFor={`modal-${modalId}`} className="btn">
      {text}
    </label>
  );
}
