import colors from '../styles/colors';

export const iconWeather = (icon: string) =>
  `http://openweathermap.org/img/w/${icon}.png`;

export const themeWeather = (main: string) => {
  switch (main) {
    case 'Thunderstorm':
      return colors.thunderstorm;

    case 'Drizzle':
      return colors.drizzle;

    case 'Rain':
      return colors.rain;

    case 'Snow':
      return colors.snow;

    case 'Clear':
      return colors.clear;

    case 'Clouds':
      return colors.clouds;

    case 'Haze':
      return colors.haze;

    case 'Mist':
      return colors.mist;

    default:
      return colors.clouds;
  }
};
