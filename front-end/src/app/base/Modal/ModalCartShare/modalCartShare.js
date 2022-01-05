import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import QRCode from "react-qr-code";

import "./modalCartShare.scss";

function ModalSharing({ isShow, sayNo, sayYes }) {

  return (
    <Modal
      show={isShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      id="modal-covid"
    >
      <div className="modal-header modal-header-sm dark bg-dark">
        <h3 className="modal-title">Bạn có link đặt hàng theo nhóm tại nhà hàng này. Bạn có muốn tiếp tục đặt hàng nhóm?</h3>
      </div>
      <div className="modal-body">
        <div className="modal-container">
          <Button onClick={sayNo} variant="secondary">Không</Button>{' '}
          <Button onClick={sayYes} variant="primary">Đồng ý</Button>{' '}
        </div>
      </div>
    </Modal>
  );
}

export default ModalSharing;
