import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  padding-top: ${getStatusBarHeight() + 23}px;

  justify-content: center;
  align-items: center;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'large',
  color: colors.primary,
})`
  justify-content: center;
  align-items: center;
  height: 260px;
`;

export const Adrress = styled.Text`
  font-family: 'Roboto-Regular';
  color: ${colors.primary};
  font-size: 32px;
`;

export const Update = styled.Text`
  font-family: 'Roboto-Regular';
  color: ${colors.primary};
  font-size: 12px;
  margin-top: 5px;
  padding-left: 5px;
`;

export const Description = styled.Text`
  font-size: 12px;
  font-weight: bold;
`;

export const Climate = styled.Text`
  font-family: 'Roboto-Regular';
  color: ${colors.primary};
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
  font-size: 70px;
`;

export const Sensation = styled.Text`
  color: ${colors.primary};
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const AvatarClimate = styled.Image`
  width: 70px;
  height: 70px;
`;

export const Wheather = styled.SafeAreaView`
  width: 220px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Temp = styled.Text`
  color: ${colors.primary};
  font-size: 18px;
`;
