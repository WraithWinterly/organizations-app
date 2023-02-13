import { ReactNode } from "react";
export default function Modal({
  children,
  uniqueId,
}: {
  children: ReactNode;
  uniqueId: string;
}) {
  return (
    <>
      <input
        type="checkbox"
        id={`modal-${uniqueId}`}
        className="modal-toggle"
      />
      <label htmlFor={`modal-${uniqueId}`} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          {children}
        </label>
      </label>
    </>
  );
}
