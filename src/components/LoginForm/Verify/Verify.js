import { useRef } from "react";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import Button from "~/components/Button";
import styles from "./Verify.module.css";

const cx = classNames.bind(styles);

function Verify() {
  const codeRef1 = useRef();
  const codeRef2 = useRef();
  const codeRef3 = useRef();
  const codeRef4 = useRef();
  const codeRef5 = useRef();
  const codeRef6 = useRef();
  const codeRef = [codeRef1, codeRef2, codeRef3, codeRef4, codeRef5, codeRef6];

  const handleChange = (e) => {
    console.log("keydown:", [e.target.value]);
    // console.log(document.activeElement)
    if (e.target.value) {
      if (codeRef[codeRef.length - 1].current === document.activeElement) {
        codeRef[codeRef.length - 1].current.blur();
        console.log("blur");
      }
      for (let i = 0; i < codeRef.length - 1; i++) {
        if (codeRef[i].current === document.activeElement) {
          codeRef[i + 1].current.focus();
          break;
        }
      }
    } else {
      for (let i = 5; i > 0; i--) {
        if (codeRef[i].current === document.activeElement) {
          codeRef[i - 1].current.focus();
          break;
        }
      }
    }
  };
  return (
    <div className={cx("form-content")}>
      <button className={cx("back-btn")}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h2 className={cx("form-desc1")}>Enter verification code</h2>
      <p className={cx("form-desc2")}>
        Enter the 6-digit verification code just sent to{" "}
        <span className={cx("phone")}>0398289949</span>
      </p>
      <Formik
        initialValues={{
          code: ["", "", "", "", "", ""],
        }}
        validate={{}}
      >
        {(values) => (
          <form className={cx("form")}>
            <div className={cx("code-input")}>
              {Array(6)
                .fill(0)
                .map((code, index) => (
                  <input
                    key={index}
                    ref={codeRef[index]}
                    className={cx("code")}
                    type="number"
                    name="code"
                    value={values.code}
                    placeholder={0}
                    maxLength={1}
                    onChange={handleChange}
                  />
                ))}
            </div>
            <Button label={"Verification"} type={"submit"} />
          </form>
        )}
      </Formik>
      <p className={cx("text")}>
        Resend code later
        <span className={cx("time")}>30s</span>
      </p>
      <p className={cx("text")}>
        Verification code is valid for
        <span className={cx("time")}>15 minutes</span>
      </p>
    </div>
  );
}

export default Verify;
