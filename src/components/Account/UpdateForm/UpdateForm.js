import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import Button from "~/components/Button";
import styles from "./UpdateForm.module.css";

const cx = classNames.bind(styles);

function UpdateForm({ label, icon }) {
  return (
    <Formik>
      {(formik) => (
        <Form className={cx("form")}>
          <FontAwesomeIcon icon={faXmark} className={cx("close")} />
          <label className={cx("label")}>{label}</label>
          <div className={cx("input")}>
            <FontAwesomeIcon icon={icon} className={cx("icon")} />
            <Field type="text" />
          </div>
          <Button
            type="submit"
            styles={"primary"}
            className={cx("submit")}
            label={"Save changes"}
          ></Button>
        </Form>
      )}
    </Formik>
  );
}

export default UpdateForm;
