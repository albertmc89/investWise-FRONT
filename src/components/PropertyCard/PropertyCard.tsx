import { NavLink } from "react-router-dom";
import useInvestmentsApi from "../../hooks/useInvestmentsApi";
import { useAppDispatch } from "../../store";
import { deletePropertyActionCreator } from "../../store/properties/propertiesSlice";
import { Property } from "../../types";
import "./PropertyCard.css";
import paths from "../../paths/paths";

interface PropertyCardProps {
  property: Partial<Property>;
}

const PropertyCard = ({
  property: {
    address,
    price,
    rooms,
    meters,
    level,
    description,
    image1,
    elevator,
    id,
  },
}: PropertyCardProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { deletePropertyApi } = useInvestmentsApi();

  const deleteProperty = async () => {
    await deletePropertyApi(id!);

    dispatch(deletePropertyActionCreator(id!));
  };

  const formatedPrice = price ? price.toLocaleString() : "";

  return (
    <article className="property">
      <div className="property__container">
        <img
          className="property__picture"
          src={image1}
          alt={`Mountain views near ${address}`}
          loading="lazy"
        />
      </div>
      <div className="property__content">
        <div className="property__data-container">
          <h2 className="property__address">{address}</h2>
          <div className="property__data">
            Mkt value:
            <span className="property__data-price">{formatedPrice}$</span>
          </div>
          <ul className="property__data-list">
            <li className="property__data">
              {rooms}
              <span className="property__data-label">hab.</span>
            </li>
            <li className="property__data">
              {meters}
              <span className="property__data-label">m2</span>
            </li>
            <li className="property__data-detail">{level}</li>
            <li className="property__data">
              {elevator === "Yes" ? (
                <span className="property__data-label">con ascensor</span>
              ) : (
                <span className="property__data-label">sin ascensor</span>
              )}
            </li>
          </ul>
          <div className="property__data-description">
            <p className="property__description">{description}</p>
          </div>
        </div>
        <div className="property__button">
          <NavLink className="link--solid" to={`${paths.properties}/${id}`}>
            View details
          </NavLink>
          <button onClick={deleteProperty} className="button--circle">
            <img
              src="/img/DeleteForever.svg"
              aria-label="delete logo vector"
              className="delete-logo"
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
