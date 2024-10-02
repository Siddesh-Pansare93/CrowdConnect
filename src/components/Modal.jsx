// Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl w-full">
                <div className="p-4">
                    <button
                        onClick={onClose}
                        className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Close
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
