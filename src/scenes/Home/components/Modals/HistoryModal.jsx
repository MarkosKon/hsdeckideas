import React from "react";
import Modal from "react-modal";
import Loadable from "react-loadable";

import Loading from "../../../../components/Loading/Loading";

const LoadableHistory = Loadable({
  loader: () => import("../History/History"),
  loading: Loading
});

const root = document.getElementById("root");
Modal.setAppElement(root);

const HistoryModal = ({ isOpen, closeModal, deck }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    className="history-modal"
    style={{
      content: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: "0"
      },
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: "1001",
        maxWidth: "100vw"
      }
    }}
    appElement={root}
    contentLabel="History modal"
  >
    <LoadableHistory deck={deck} closeModal={closeModal} />
  </Modal>
);

export default HistoryModal;