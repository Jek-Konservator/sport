import styled from "@emotion/styled";
import { Button, Card, TextField } from "@mui/material";

export const InfoContainer = styled(Card)`
  width: 200px;
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 10px;
`;

export const InfoContainerTitle = styled("span")`
  text-align: center;
  font-size: 30px;
  margin: 0 -10px;
  border-bottom: 1px solid gray;
`;

export const InfoContainerText = styled("span")`
  font-size: 20px;
  margin: 5px 0;
`;

export const InfoContainerTextField = styled(TextField)`
  width: 50px;
  height: 10px;
  padding: 3px;
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const InfoContainerButton = styled(Button)`
  margin: 5px 0;
`;
