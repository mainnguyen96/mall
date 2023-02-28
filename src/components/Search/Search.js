import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import { fetchProducts } from "~/features/productsSlice";
import SearchList from "./SearchList/SearchList";
import Modal from "../Modal";
import config from "../../config";
import styles from "./Search.module.css";

const cx = classNames.bind(styles);

function Search() {
  const [showList, setShowList] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParam = location.state ? location.state.search : "";
  return (
    <div className={cx("wrapper")}>
      <div className={cx("search-bar")}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx("icon")} />
        <Formik
          initialValues={{ search: searchParam }}
          onSubmit={(values) => {
            console.log(values);
            navigate(config.routes.home, {
              state: values,
            });
            dispatch(fetchProducts(values.search));
            setShowList(false);
          }}
        >
          {(formik) => (
            <Form
              className={cx("form")}
              onSubmit={formik.handleSubmit}
              onChangeCapture={() => {
                if (inputRef.current.value) {
                  setShowList(true);
                } else {
                  setShowList(false);
                }
              }}
            >
              <input
                autoComplete="off"
                name={"search"}
                id={"search"}
                ref={inputRef}
                type="text"
                value={formik.values.search}
                onChange={formik.handleChange}
                onClick={() => setShowList(true)}
                placeholder="What are you looking for today?"
                className={cx("text")}
              />
              <button type="submit" className={cx("button")}>
                Search
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {showList && (
        <>
          <div className={cx("modal")}>
            <Modal onClick={() => setShowList(false)} />
          </div>
          <div onClick={() => setShowList(false)} className={cx("search-list")}>
            <SearchList />
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
