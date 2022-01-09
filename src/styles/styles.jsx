import styled from 'styled-components';

export const Select = styled.div`
  p {
    color: #000 !important;
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
