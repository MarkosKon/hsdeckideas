import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Loadable from 'react-loadable';

import Loading from '../../../../components/Loading/Loading';

const root = document.getElementById('root');
Modal.setAppElement(root);

const LoadableTreeDiagram = Loadable({
  loader: () => import(/* webpackChunkName: "treediagram" */ '../TreeDiagram/TreeDiagram'),
  loading: Loading,
});

const HistoryModal = ({ isOpen, closeModal, deck }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    className="history-modal"
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
      },
    }}
    appElement={root}
    contentLabel="History modal"
  >
    <LoadableTreeDiagram deck={deck} closeModal={closeModal} />
  </Modal>
);

HistoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  deck: PropTypes.object.isRequired,
};

export default HistoryModal;
