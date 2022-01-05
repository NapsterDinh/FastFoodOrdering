import React, { useState, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import QRCode from "react-qr-code";

import "./modalSharing.scss";

function ModalSharing({ isShow, closeModal, code }) {
  const [url, setUrl] = useState(code);
  const fixedUrl = code;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    const oldUrl = url;
    setUrl("Copied to clipboard...");

    setTimeout(() => {
      setUrl(oldUrl);
    }, 2000);
  };

  return (
    <Modal
      show={isShow}
      size="lg"
      onHide={closeModal}
      aria-labelledby="contained-modal-title-vcenter"
      id="modal-covid"
    >
      <div className="modal-header modal-header-sm dark bg-dark">
        <h3 className="modal-title">Chia sẻ với nhóm của bạn</h3>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={closeModal}
        >
          <i className="ti ti-close"></i>
        </button>
      </div>
      <div className="modal-body">
        <div className="modal-container">
          <QRCode value={fixedUrl} />
          <div className="right-content">
            <h3>Sao chép link và gửi cho nhóm</h3>
            <input
              className="input-text"
              type="text"
              value={url}
              readonly
              onClick={copyToClipboard}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalSharing;
