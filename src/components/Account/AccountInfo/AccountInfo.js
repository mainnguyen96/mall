import { useState } from "react";
import classNames from "classnames/bind";
import { Formik, Form } from "formik";
import Tippy from "@tippyjs/react";

import Button from "~/components/Button";
import RadioForm from "~/components/Form/RadioForm";
import SelectForm from "~/components/Form/SelectForm/SelectForm";
import TextForm from "~/components/Form/TextForm/TextForm";
import styles from "./AccountInfo.module.css";

import {
  faEnvelope,
  faFileArrowUp,
  faImage,
  faKey,
  faPhone,
  faShieldHalved,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import AccountItem from "~/components/AccountItemList/AccountItem";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import UpdateForm from "../UpdateForm/UpdateForm";
import AccountPage from "../AccountPage/AccountPage";

const cx = classNames.bind(styles);
const birthYear = [];
for (let i = 1920; i <= new Date().getFullYear(); i++) {
  birthYear.push(i);
}
const birthMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const avatarMenu = [
  {
    icon: faImage,
    label: "See profile picture",
  },
  {
    icon: faFileArrowUp,
    label: "Update profile picture",
  },
  {
    icon: faTrashCan,
    label: "Delete profile picture",
  },
];

function AccountInfo() {
  const [birthDay, setBirthDay] = useState([1]);
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

  const Avatar = (
    <ul className={cx("avatar-menu")}>
      {avatarMenu.map((avatar, index) => (
        <li key={index}>
          <AccountItem data={avatar} size={"small"} />
        </li>
      ))}
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
    <AccountPage header={"Account Infomation"}>
      <div className={cx("wrapper")}>
        <section className={cx("personal")}>
          <h3 className={cx("label")}>Personal Infomation</h3>
          <Formik
            initialValues={{
              name: "Nguyen Duc Chinh",
              birthYear: 1996,
              birthMonth: 10,
              birthDay: 11,
              sex: "male",
            }}
            onSubmit={(values) => {
              console.log(values);
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
                  <Tippy
                    content={Avatar}
                    interactive={true}
                    placement={"bottom"}
                    trigger={"click"}
                  >
                    <img
                      src="https://lh5.googleusercontent.com/-BGbVNgJFryw/AAAAAAAAAAI/AAAAAAAAAjk/C2iOlUOhQfA/photo.jpg"
                      alt="personal avatar"
                      className={cx("avatar")}
                    />
                  </Tippy>
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
        {/* <UpdateForm label={"Phone number"} icon={faPhone} /> */}
      </div>
    </AccountPage>
  );
}

export default AccountInfo;
