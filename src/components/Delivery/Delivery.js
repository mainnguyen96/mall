import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import { updateUserData } from "~/firebaseServices";
import { getDistrictsFromProvince, getWardsFromDistrict } from "~/ultil";
import {
  fetchUserLocations,
  selectAuth,
  selectUserLocation,
  selectUserLocations,
} from "~/features/authSlice";
import {
  fetchLocations,
  selectShippingLocations,
} from "~/features/shippingSlice";
import Button from "../Button";
import SelectForm from "../Form/SelectForm";
import styles from "./Delivery.module.css";

const cx = classNames.bind(styles);

const anotherData = [
  { label: "Province/City", id: "province" },
  { label: "District", id: "district" },
  { label: "Wards", id: "ward" },
];

function Delivery({ onClose }) {
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [chooseLocation, setChooseLocation] = useState(false);
  const userLocations = useSelector(selectUserLocations);
  const locations = useSelector(selectShippingLocations);
  const fetchLocationsStatus = useSelector(
    (state) => state.shipping.statusLocations
  );
  const currentUserLocation = useSelector(selectUserLocation);
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  useEffect(() => {
    if (fetchLocationsStatus === "succeeded") {
      dispatch(fetchUserLocations());
    }
  }, [dispatch, fetchLocationsStatus]);

  const getDistricts = (provinceId) => {
    const districtsData = getDistrictsFromProvince(locations, provinceId);
    setDistricts(districtsData);
  };

  const getWards = (districtId) => {
    const wardsData = getWardsFromDistrict(districts, districtId);
    setWards(wardsData);
  };

  return (
    <div className={cx("wrapper")}>
      <FontAwesomeIcon
        onClick={onClose}
        className={cx("close")}
        icon={faXmark}
      />
      <header className={cx("header")}>Delivery address</header>
      <p className={cx("desc")}>
        Please select the delivery address to receive the most accurate forecast
        of delivery time and packaging and shipping fees.
      </p>
      <Formik
        initialValues={{ location: currentUserLocation?.id }}
        onSubmit={(values) => {
          if (values.location === "another") {
            const id = nanoid();
            const { location, ...updateData } = values;
            updateUserData(auth.userId, "locations", id, updateData);
            updateUserData(auth.userId, "shippingLocation", null, id);
          } else {
            updateUserData(
              auth.userId,
              "shippingLocation",
              null,
              values.location
            );
          }
          onClose();
          window.location.reload();
        }}
      >
        {(formik) => (
          <Form
            className={cx("form")}
            onChangeCapture={(event) => {
              if (event.target.value === "another") {
                setChooseLocation(true);
              }
            }}
          >
            <ul className={cx("list-item")}>
              {userLocations?.map((location, index) => (
                <li key={index} className={cx("radio")}>
                  <label className={cx("item")}>
                    <Field
                      id={"location"}
                      name={"location"}
                      value={location.id}
                      className={cx("radio-btn")}
                      type="radio"
                    />
                    {location.label}
                  </label>
                </li>
              ))}
              <li className={cx("radio")}>
                <label className={cx("item")}>
                  <Field
                    id={"location"}
                    name={"location"}
                    value={"another"}
                    className={cx("radio-btn")}
                    type="radio"
                  />
                  {`Choose ${userLocations ? "another" : "a"} delivery area`}
                </label>
              </li>
              {chooseLocation && (
                <div className={cx("another")}>
                  {anotherData.map((location, index) => (
                    <li key={index} className={cx("select")}>
                      <label className={cx("item")}>
                        <span className={cx("item-label")}>
                          {location.label}
                        </span>
                        <SelectForm
                          name={location.id}
                          id={location.id}
                          size={"large"}
                          onChange={(event) => {
                            formik.handleChange(event);
                            if (location.id === "province") {
                              getDistricts(event.target.value);
                            } else if (location.id === "district") {
                              getWards(event.target.value);
                            }
                          }}
                        >
                          {location.id === "province"
                            ? locations?.map((province) => (
                                <option value={province.id} key={province.id}>
                                  {province.label}
                                </option>
                              ))
                            : location.id === "district"
                            ? districts?.map((district) => (
                                <option value={district.id} key={district.id}>
                                  {district.label}
                                </option>
                              ))
                            : wards.map((ward) => (
                                <option value={ward.id} key={ward.id}>
                                  {ward.label}
                                </option>
                              ))}
                        </SelectForm>
                      </label>
                    </li>
                  ))}
                </div>
              )}
            </ul>
            <div className={cx("submit")}>
              <Button
                styles={"outline"}
                type={"submit"}
                label={"Ship to this address"}
              ></Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Delivery;
