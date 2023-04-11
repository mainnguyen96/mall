import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import Tippy from "@tippyjs/react";
import {
  faEnvelope,
  faFileArrowUp,
  faImage,
  faKey,
  faPhone,
  faShieldHalved,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import classNames from "classnames/bind";

import { updateUserData } from "~/firebaseServices";
import { processImageForUpload } from "~/ultil";
import {
  authSet,
  selectUserData,
  removeAvatar,
  selectAuth,
  updateAvatar,
} from "~/features/authSlice";
import AccountPage from "../AccountPage/AccountPage";
import Button from "~/components/Button";
import AccountItem from "~/components/AccountItemList/AccountItem";
import RadioForm from "~/components/Form/RadioForm";
import SelectForm from "~/components/Form/SelectForm/SelectForm";
import AccountImage from "~/components/Image/AccountImage";
import TextForm from "~/components/Form/TextForm/TextForm";
import styles from "./AccountInfo.module.css";

const cx = classNames.bind(styles);
const birthYear = [];
for (let i = 1920; i <= new Date().getFullYear(); i++) {
  birthYear.push(i);
}
const birthMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const monthDay = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];
const avatarMenu = [
  {
    icon: faImage,
    label: "See profile picture",
    id: "picture",
  },
  {
    icon: faFileArrowUp,
    label: "Update profile picture",
    id: "update",
  },
  {
    icon: faTrashCan,
    label: "Delete profile picture",
    id: "remove",
  },
];

function AccountInfo() {
  const [birthDay, setBirthDay] = useState(monthDay);
  const [tippyInstance, setTippyInstance] = useState(null);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const getDays = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const handleChangeDay = (year, month) => {
    const numberOfDay = getDays(year, month);
    console.log("number day:", numberOfDay);
    const day = [];
    for (let i = 1; i <= numberOfDay; i++) {
      day.push(i);
    }
    setBirthDay(day);
  };

  const handleRemoveAvatar = () => {
    tippyInstance.hide();
    dispatch(removeAvatar());
  };

  const Avatar = (
    <ul className={cx("avatar-menu")}>
      {avatarMenu.map((avatar, index) => {
        switch (avatar.id) {
          case "update": {
            return (
              <li key={index} className={cx("avatar-menu-item")}>
                <AccountItem
                  htmlFor={"userImage"}
                  data={avatar}
                  size={"small"}
                />
                <Formik initialValues={{ userImage: "" }}>
                  {(formik) => (
                    <Form className={cx("avatar-form")}>
                      <Field
                        type="file"
                        name="userImage"
                        id="userImage"
                        accept={"image/*"}
                        className={cx("avatar-input")}
                        onChange={(event) => {
                          tippyInstance.hide();
                          processImageForUpload(event.target.files[0]).then(
                            (url) => {
                              dispatch(updateAvatar(url));
                            }
                          );
                        }}
                      />
                    </Form>
                  )}
                </Formik>
              </li>
            );
          }
          case "remove": {
            return (
              <li
                onClick={handleRemoveAvatar}
                key={index}
                className={cx("avatar-menu-item")}
              >
                <AccountItem data={avatar} size={"small"} />
              </li>
            );
          }
          default: {
            return (
              <li key={index} className={cx("avatar-menu-item")}>
                <AccountItem data={avatar} size={"small"} />
              </li>
            );
          }
        }
      })}
    </ul>
  );

  const SectionItem = ({ data, btnLabel = "Update" }) => {
    return (
      <>
        <div className={cx("section-text")}>
          <AccountItem type={"normal"} size={"small"} data={data} />
        </div>
        <Button size={"small"} styles={"outline"} label={btnLabel} />
      </>
    );
  };
  return (
    <AccountPage header={"Account Information"}>
      {userData.name && (
        <div className={cx("wrapper")}>
          <section className={cx("personal")}>
            <h3 className={cx("label")}>Personal Information</h3>
            <Formik
              initialValues={{
                name: userData?.name,
                birthYear: userData?.birthYear || 1970,
                birthMonth: userData?.birthMonth || 1,
                birthDay: userData?.birthDay || 1,
                sex: userData?.sex,
              }}
              onSubmit={(values) => {
                console.log(values);
                dispatch(
                  authSet({
                    ...auth,
                    userName: values.name,
                  })
                );
                updateUserData(auth.userId, "username", null, values.name);
                updateUserData(
                  auth.userId,
                  "birthYear",
                  null,
                  values.birthYear
                );
                updateUserData(
                  auth.userId,
                  "birthMonth",
                  null,
                  values.birthMonth
                );
                updateUserData(auth.userId, "birthDay", null, values.birthDay);
                updateUserData(auth.userId, "sex", null, values.sex);
              }}
            >
              {(formik) => (
                <Form
                  onChangeCapture={() =>
                    handleChangeDay(
                      formik.values.birthYear,
                      formik.values.birthMonth
                    )
                  }
                >
                  <div className={cx("name")}>
                    <div>
                      <Tippy
                        content={Avatar}
                        interactive={true}
                        placement={"bottom"}
                        trigger={"click"}
                        hideOnClick={true}
                        onCreate={(instance) => setTippyInstance(instance)}
                      >
                        <AccountImage
                          src={auth.userData.avatar}
                          alt={"personal avatar"}
                          className={cx("avatar")}
                        />
                      </Tippy>
                    </div>
                    <TextForm
                      id={"name"}
                      name={"name"}
                      label={"Name"}
                      placeholder={"Add name"}
                    />
                  </div>
                  <div className={cx("birthday")}>
                    <label className={cx("label2")}>Date of birth</label>
                    <SelectForm id={"birthDay"} name={"birthDay"}>
                      {birthDay.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </SelectForm>
                    <SelectForm id={"birthMonth"} name={"birthMonth"}>
                      {birthMonth.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </SelectForm>
                    <SelectForm id={"birthYear"} name={"birthYear"}>
                      {birthYear.map((year) => (
                        <option value={year} key={year}>
                          {year}
                        </option>
                      ))}
                    </SelectForm>
                  </div>
                  <div className={cx("sex")}>
                    <label className={cx("label2")}>Sex</label>
                    <RadioForm
                      id={"sex"}
                      name={"sex"}
                      value={"male"}
                      label={"Male"}
                    />
                    <RadioForm
                      id={"sex"}
                      name={"sex"}
                      value={"female"}
                      label={"Female"}
                    />
                    <RadioForm
                      id={"sex"}
                      name={"sex"}
                      value={"other"}
                      label={"Other"}
                    />
                  </div>
                  <div className={cx("submit")}>
                    <Button
                      type={"submit"}
                      styles={"primary"}
                      label={"Save changes"}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </section>
          <div className={cx("other")}>
            <section className={cx("phone-email")}>
              <label className={cx("label")}>Phone and Email</label>
              <ul className={cx("section-list")}>
                <li className={cx("section-item")}>
                  <SectionItem
                    data={{ icon: faPhone, label: "Phone number 0398289941" }}
                  />
                </li>
                <li className={cx("section-item")}>
                  <SectionItem
                    data={{
                      icon: faEnvelope,
                      label: "Email address chinhnd1096@gmail.com",
                    }}
                  />
                </li>
              </ul>
            </section>
            <section className={cx("security")}>
              <label className={cx("label")}>Security</label>
              <ul className={cx("section-list")}>
                <li className={cx("section-item")}>
                  <SectionItem
                    data={{ icon: faShieldHalved, label: "Change Password" }}
                  />
                </li>
                <li className={cx("section-item")}>
                  <SectionItem
                    data={{
                      icon: faKey,
                      label: "Set up a PIN code",
                    }}
                    btnLabel={"Establish"}
                  />
                </li>
              </ul>
            </section>
            <section className={cx("social")}>
              <label className={cx("label")}>Social network link</label>
              <ul className={cx("section-list")}>
                <li className={cx("section-item")}>
                  <SectionItem
                    data={{ icon: faFacebook, label: "Facebook" }}
                    btnLabel={"linked"}
                  />
                </li>
                <li className={cx("section-item")}>
                  <SectionItem
                    data={{
                      icon: faGoogle,
                      label: "Google",
                    }}
                    btnLabel={"linked"}
                  />
                </li>
              </ul>
            </section>
          </div>
        </div>
      )}
    </AccountPage>
  );
}

export default AccountInfo;
