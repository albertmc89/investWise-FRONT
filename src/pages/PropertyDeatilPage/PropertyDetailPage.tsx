import { NavLink, useParams } from "react-router-dom";
import useInvestmentsApi from "../../hooks/useInvestmentsApi";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadSelectedPropertyActionCreator } from "../../store/properties/propertiesSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import "./PropertyDetailPage.css";
import paths from "../../paths/paths";
import back from "../../../public/img/back.png";

const PropertyDetailPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const selectedProperty = useAppSelector(
    (state) => state.propertiesState.selectedProperty,
  );
  const { loadSelectedPropertyApi } = useInvestmentsApi();
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const formatedPrice = selectedProperty
    ? selectedProperty.price.toLocaleString()
    : "";

  const rent = selectedProperty ? selectedProperty.rent : 0;
  const price = selectedProperty ? selectedProperty.price : 0;
  const result = ((Math.round(rent * 12) / price) * 100).toFixed(2);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (user && id) {
        const selectedPropertyApi = await loadSelectedPropertyApi(id);

        dispatch(loadSelectedPropertyActionCreator(selectedPropertyApi));

        document.title = `InvestWise | ${selectedProperty?.address}`;
      }
    })();
  }, [dispatch, loadSelectedPropertyApi, user, id, selectedProperty?.address]);

  return (
    <div className="property-page">
      <div className="backpage">
        <NavLink to={paths.properties} className="backpage">
          <img src={back} alt="back icon" width="25" height="25" />
          <h4>Back</h4>
        </NavLink>
      </div>
      <h2 className="title">
        {selectedProperty?.address}, {selectedProperty?.city}
      </h2>
      <div className="property__section">
        <article className="property-detail">
          <img
            className="property__detail-picture"
            src={selectedProperty?.image1}
            alt={`Views of ${selectedProperty?.address}`}
          />
          <div className="property__detaildata-container">
            <h2 className="property__address">
              {selectedProperty?.address}, {selectedProperty?.city}
            </h2>
            <div className="property__data">
              Mkt value:
              <span className="property__data-price">{formatedPrice}€</span>
            </div>
            <ul className="property__data-list">
              <li className="property__data">
                {selectedProperty?.rooms}
                <span className="property__data-label">hab.</span>
              </li>
              <li className="property__data">
                {selectedProperty?.meters}
                <span className="property__data-label">m2</span>
              </li>
              <li className="property__data-detail">
                {selectedProperty?.level}
              </li>
              <li className="property__data">
                {selectedProperty?.elevator === "Yes" ? (
                  <span className="property__data-label">with lift</span>
                ) : (
                  <span className="property__data-label">no lift</span>
                )}
              </li>
            </ul>
            <div className="property__detail-description-preview">
              {!open && (
                <>
                  <p className="property__detail-description-preview">
                    {selectedProperty?.description}
                  </p>
                  <button
                    className="description-more"
                    onClick={() => setOpen(true)}
                  >
                    More...
                  </button>
                </>
              )}
              {open && (
                <>
                  <p className="property__detail-fulldescription">
                    {selectedProperty?.description}
                  </p>
                  <button
                    className="description-more"
                    onClick={() => setOpen(false)}
                  >
                    Hide...
                  </button>
                </>
              )}
            </div>
          </div>
          <h3 className="features__title">Building</h3>
          <ul className="properties-features__list">
            <li className="list-features">{selectedProperty?.type}</li>
          </ul>
          <h3 className="features__title">Basic features</h3>
          <ul className="properties-features__list">
            <li className="list-features">{selectedProperty?.meters}m2</li>
            <li className="list-features">
              {selectedProperty?.rooms} bedrooms
            </li>
            <li className="list-features">
              {selectedProperty?.bathrooms} bathrooms
            </li>
            <li className="list-features">Built in {selectedProperty?.year}</li>
            <li className="list-features">
              {selectedProperty?.parking === "Yes" ? (
                <span className="list-features">With parking</span>
              ) : (
                <span className="list-features">No parking</span>
              )}
            </li>
            <li className="list-features">
              {selectedProperty?.heating === "Yes" ? (
                <span className="list-features">With heating</span>
              ) : (
                <span className="list-features">No heating</span>
              )}
            </li>
            <li className="list-features">
              {selectedProperty?.aircon === "Yes" ? (
                <span className="list-features">With aircon</span>
              ) : (
                <span className="list-features">No aircon</span>
              )}
            </li>
            <li className="list-features">
              {selectedProperty?.elevator === "Yes" ? (
                <span className="list-features">With lift</span>
              ) : (
                <span className="list-features">No lift</span>
              )}
            </li>
          </ul>
          <h3 className="features__title">Energy performance</h3>
          <ul className="properties-features__list">
            <li className="list-features">
              {selectedProperty?.consumption} kWh/m2
            </li>
            <li className="list-features">
              {selectedProperty?.emissions} kg CO2/m2 year
            </li>
          </ul>
        </article>
        <div className="property__yield">
          <div className="button-container__card">
            <span
              className={selectedProperty?.isRented ? "rented" : "not-rented"}
            >
              {selectedProperty?.isRented ? "rented" : "not rented"}
            </span>
          </div>
          <span>Yield</span>
          {selectedProperty?.isRented === true ? (
            <span className="property__data-label">{result}%</span>
          ) : (
            <span className="property__data-label">Not rented</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
