import styled from 'styled-components';

export const Select = styled.div`
  p {
    color: #000 !important;
  }
`;

export const TrocoCondition = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #fff;

  div {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Total = styled.div`
  max-width: 100vw;
`;

export const TrocoSection = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;

  input {
    padding: 10px;
    border-radius: 5px;
  }
`;

export const PaymentSection = styled.div`
  display: flex;

  margin: 20px 0;
  flex-direction: column;

  h1 {
    color: #fff;
  }
  span {
    width: 100%;
    color: #fff;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: start;
    margin: 10px 0;
  }
  input {
    display: none;
  }
  input:checked + label {
    background: ${(selected) => (selected ? '#0003' : 'none')};
  }
  img {
    width: 20px;
    height: 20px;
  }
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 3px 10px;
    gap: 5px;
    border-radius: 10px;

    &:hover {
      background: #0002;
    }
  }
`;

export const Message = styled.div`
  span {
    color: #fff;
  }
`;

export const Footer = styled.div`
  display: flex;
  margin-top: 30px;
  color: #fff;

  a{
    text-decoration: none;
    color: #fff;
  }
`;
