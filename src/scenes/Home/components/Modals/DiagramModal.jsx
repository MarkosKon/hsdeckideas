import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import TreeDiagram from '../TreeDiagram/TreeDiagram';

const root = document.getElementById('root');
Modal.setAppElement(root);

const HistoryModal = ({ isOpen, closeModal, deck }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    closeTimeoutMS={300}
    style={{
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: '1001',
        maxWidth: '100vw',
      },
      content: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        border: 'none',
      },
    }}
    appElement={root}
    contentLabel="Diagram modal"
  >
    <TreeDiagram deck={deck} closeModal={closeModal} />
  </Modal>
);

HistoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  deck: PropTypes.object.isRequired,
};

export default HistoryModal;
