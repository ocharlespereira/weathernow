import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const Container = styled.TouchableOpacity`
  margin-top: 30px;
  width: 150px;
  height: 50px;
  border-radius: 25px;
  background: ${colors.button};
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${colors.primary};
  font-family: 'Roboto-Regular';
  font-size: 16px;
  color: ${colors.primary};
`;
