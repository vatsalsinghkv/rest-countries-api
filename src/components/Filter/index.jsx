import FilterItem from '../FilterItem';
import Card from '../UI/Card';
import { getId } from '../../helper';
import { useDispatch, useSelector } from 'react-redux';
import { filterRegionActions } from '../../store/filter-region';
import { countriesActions } from '../../store/countries';
import { REGION_TYPES } from '../../helper/config';
import './index.scss';

const Filter = () => {
  const { region, showFilter } = useSelector(state => state.filterRegion);

  const { toggleFilter, hideFilter, changeRegion } = filterRegionActions;
  const { filterCountries } = countriesActions;

  const dispatch = useDispatch();

  /**
   * Opens and Closes the filter button (selector)
   */

  const filterClickHandler = () => {
    dispatch(toggleFilter());
  };

  /**
   * Update the region in filtered-region state and filter the countries according to filtered region
   * @param {Event} e event object
   */

  const regionChangeHandler = e => {
    dispatch(filterCountries(e.target.value));
    dispatch(changeRegion(e.target.value));
    dispatch(hideFilter());
  };

  return (
    <div className="select">
      <Card className="select__header" onClick={filterClickHandler}>
        {region === 'all' ? 'Filtered by Region' : region}
        {showFilter ? (
          <ion-icon name="chevron-up-outline"></ion-icon>
        ) : (
          <ion-icon name="chevron-down-outline"></ion-icon>
        )}
      </Card>
      {showFilter && (
        <Card className="select__options" onChange={regionChangeHandler}>
          {REGION_TYPES.map(item => (
            <FilterItem key={getId()} value={item} />
          ))}
        </Card>
      )}
    </div>
  );
};

export default Filter;
