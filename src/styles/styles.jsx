import styled from 'styled-components';

export const Select = styled.div`
  p {
    color: #000 !important;
  }
`;

export const PaymentSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  h1 {
    color: #fff;
  }
  span {
    color: #fff;
    align-items: center;
    display: flex;
    flex-direction: row;
  }
  input {
    opacity: 0;
  }
  input:checked + label {
    background: ${(selected) => (selected ? '#0003' : 'none')};
  }
  img {
    width: 50px;
    height: 50px;
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
