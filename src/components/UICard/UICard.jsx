import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AnchorLink } from 'already-styled-components';

const CardContainer = styled.div`
  position: relative;
  background-color: beige;
  margin: 20px 10px;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  @media screen and (max-width: 767px) {
    margin: 20px 5px;
  }
`;
const CardHeader = styled.div`
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  padding: 1px 0 1px;
`;
const CustomAnchorLink = styled(AnchorLink)`
  button {
    padding: 0.16em;
  }
`;

const CardTitle = styled.h2`
  font-size: 42px;
  text-align: center;
  @media screen and (max-width: 767px) {
    font-size: 36px;
  }
`;
const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
const CardBody = styled.div`
  padding: 40px 20px 15px;
  @media screen and (max-width: 767px) {
    padding: 40px 10px 15px;
  }
`;

const UICard = ({
  id, title, withHeader, className, modalButton, children,
}) => (
  <CardContainer id={id} className={className}>
    {withHeader && (
      <CardHeader>
        <CardTitle>
          <CustomAnchorLink scrollTo={id} c="#2d2d2d" fs="36px" o=".8" hc="darkorange">
            {title}
          </CustomAnchorLink>
        </CardTitle>
        <ButtonContainer>{modalButton}</ButtonContainer>
      </CardHeader>
    )}
    <CardBody>{children}</CardBody>
  </CardContainer>
);

UICard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  withHeader: PropTypes.bool,
  modalButton: PropTypes.element,
  children: PropTypes.node.isRequired,
};

UICard.defaultProps = {
  id: null,
  title: null,
  className: null,
  withHeader: true,
  modalButton: null,
};

export default UICard;
