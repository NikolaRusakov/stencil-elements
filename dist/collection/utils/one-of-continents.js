import selectedAfrica from '../css/json/selected_africa.json';
import selectedAmericas from '../css/json/selected_americas.json';
import selectedAsia from '../css/json/selected_asia.json';
import selectedEurope from '../css/json/selected_europe.json';
// export type OneOfContinents = 'americas' | 'africa' | 'asia' | 'europe';
export default function (input) {
  const isAfrica = selectedAfrica.some(value => input == value);
  if (isAfrica) {
    return 'africa';
  }
  const isAmericas = selectedAmericas.some(value => input == value);
  if (isAmericas) {
    return 'americas';
  }
  const isAsia = selectedAsia.some(value => input == value);
  if (isAsia) {
    return 'asia';
  }
  const isEurope = selectedEurope.some(value => input == value);
  if (isEurope) {
    return 'europe';
  }
}
