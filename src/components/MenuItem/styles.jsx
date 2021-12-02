import styled from 'styled-components';

export const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Miniature = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 15px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
  }
`;

export const Content = styled.div`
  width: 100%;
`;
