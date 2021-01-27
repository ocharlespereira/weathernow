import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ptBR, { format } from 'date-fns';

import { useGetLocation } from '../../hooks/useGetLocation';

import { api, weatherKey } from '../../services/api';
import { themeWeather, iconWeather } from '../../utils/utils';
import colors from '../../styles/colors';

import Button from '../../components/Button';

import {
  Container,
  Loading,
  Adrress,
  Update,
  Description,
  Climate,
  Sensation,
  AvatarClimate,
  Wheather,
  Temp,
} from './styles';

interface WeatherProps {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  country: string;
  name: string;
  sys: {
    country: string;
  };
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    },
  ];
}

const Home: React.FC = () => {
  const [repoWeather, setRepoWeather] = useState<WeatherProps>();
  const [dateNow, setDateNow] = useState('');
  const [theme, setTheme] = useState(colors.default);
  const [weatherIcon, setWeatherIcon] = useState('');
  const [loading, setLoading] = useState(false);

  // context api
  const {
    handleCallLocation,
    currentLatitude,
    currentLongitude,
  } = useGetLocation();

  // chama api openweathermap
  const handleUpdateWeather = useCallback(() => {
    if (currentLatitude && currentLongitude) {
      setLoading(true);
      api
        .get('weather', {
          params: {
            lat: currentLatitude.substr(0, 8),
            lon: currentLongitude.substr(0, 8),
            appid: weatherKey,
            lang: 'pt_br',
            units: 'metric',
          },
        })
        .then(res => {
          const currentTheme = themeWeather(res.data?.weather[0].main);
          const currentIcon = iconWeather(res.data?.weather[0].icon);

          setRepoWeather(res.data);
          setTheme(currentTheme);
          setWeatherIcon(currentIcon);

          if (res.status === 200) {
            setDateNow(
              format(new Date(), "'Atualizado' dd/MM/yyy '-' HH:mm '- '", {
                locale: ptBR,
              }),
            );
          }
        })
        .catch(error => {
          Alert.alert('Mensagem de erro', error);
        })
        .finally(() => setLoading(false));
    }
  }, [currentLatitude, currentLongitude]);

  // executa verificação do sistema para verificar permissão e trazer lon e lat
  useEffect(() => {
    handleCallLocation();
  }, []); //eslint-disable-line

  // assim que trazer latitude e longitude o sistema executa a função para trazer Api/Rest
  useEffect(() => {
    handleUpdateWeather();
  }, [currentLatitude, currentLongitude, handleUpdateWeather]);

  return (
    <Container style={{ backgroundColor: theme }}>
      {loading ? (
        <Loading />
      ) : (
        repoWeather && (
          <>
            <Adrress>
              {`${repoWeather?.name} - ${repoWeather?.sys.country}`}
            </Adrress>
            <Update>
              {dateNow}
              <Description>
                {repoWeather?.weather.map(desc => desc.description)}
              </Description>
            </Update>

            <Climate>
              {`${repoWeather?.main.temp}º`}
              <AvatarClimate
                source={{
                  uri: weatherIcon || '',
                }}
              />
            </Climate>

            <Sensation>
              {`Sensação termica: ${repoWeather?.main.feels_like}º`}
            </Sensation>

            <Wheather>
              <Temp>
                <Icon name="thermometer-full" size={19} color="red" />
                {` ${repoWeather?.main.temp_max}º`}
              </Temp>

              <Temp>
                <Icon name="thermometer-quarter" size={19} color="blue" />
                {` ${repoWeather?.main.temp_min}º`}
              </Temp>

              <Temp>
                <Icon name="tint" size={19} color="blue" />
                {` ${repoWeather?.main.humidity}%`}
              </Temp>
            </Wheather>
          </>
        )
      )}
      <Button
        onPress={() => {
          handleCallLocation();
          handleUpdateWeather();
        }}
      >
        Atualizar
      </Button>
    </Container>
  );
};

export default Home;
