import { useEffect } from "react";
import { propertiesMock } from "../../mocks/propertiesMock";
import { useAppDispatch } from "../../store";
import { loadPropertiesActionCreator } from "../../store/properties/propertiesSlice";
import "./PropertiesListPage.css";
import PropertiesList from "../../components/PropertiesList/PropertiesList";

const PropertiesListPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPropertiesActionCreator(propertiesMock));
  }, [dispatch]);

  return (
    <>
      <section className="properties-page">
        <h2 className="properties-title">Properties</h2>
        <PropertiesList />
      </section>
    </>
  );
};

export default PropertiesListPage;
