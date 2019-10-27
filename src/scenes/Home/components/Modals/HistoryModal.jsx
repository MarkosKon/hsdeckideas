import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import History from '../History/History';

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
    contentLabel="History modal"
  >
    <History deck={deck} closeModal={closeModal} />
  </Modal>
);

HistoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  deck: PropTypes.shape({
    history: PropTypes.shape({
      steps: PropTypes.array,
      totalPrioritiesExamined: PropTypes.object,
      totalDeckFiltersExamined: PropTypes.object,
    }),
  }).isRequired,
};

export default HistoryModal;
