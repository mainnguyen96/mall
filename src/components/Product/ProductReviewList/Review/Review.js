import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/fontawesome-free-regular";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import StarBar from "../StarBar/StarBar";
import Button from "~/components/Button";
import styles from "./Review.module.css";

const cx = classNames.bind(styles);

const image = [
  "https://salt.tikicdn.com/cache/750x750/ts/review/2e/de/03/dc36e053c91bbbc4c31d5780a5bf1615.jpg.webp",
  "https://salt.tikicdn.com/cache/750x750/ts/review/98/73/98/fc1814d18ff25058ac2ad6c1095ceaf2.jpg.webp",
  "https://salt.tikicdn.com/cache/750x750/ts/review/db/51/6f/e9b3db1ebda6d9cfc87bc063c4f01156.jpg.webp",
  "https://salt.tikicdn.com/cache/750x750/ts/review/3a/df/31/90a60928123a1698349b17158b3d4803.jpg.webp",
  "https://salt.tikicdn.com/cache/750x750/ts/review/25/6c/fb/3a00b5d6b8581f6c8fd7c966c94e57b4.jpg.webp",
];

function Review() {
  const [writeComment, setWriteComment] = useState(false);
  const handleCreateCmt = () => {
    setWriteComment(true);
  };
  const Comment = (
    <div className={cx("comment")}>
      <img
        src="https://lh5.googleusercontent.com/-BGbVNgJFryw/AAAAAAAAAAI/AAAAAAAAAjk/C2iOlUOhQfA/photo.jpg"
        alt="comment avatar"
        className={cx("comment-avatar")}
      />
      <div className={cx("comment-info")}>
        <h4 className={cx("comment-name")}>
          Nguyen Duc Chinh
          <span className={cx("comment-time")}>1 month ago</span>
        </h4>
        <p className={cx("comment-content")}>
          Can I ask if it's a genuine VN/A product?
        </p>
      </div>
    </div>
  );
  const CommentWrite = (
    <div className={cx("comment-write")}>
      <img
        src="https://lh5.googleusercontent.com/-BGbVNgJFryw/AAAAAAAAAAI/AAAAAAAAAjk/C2iOlUOhQfA/photo.jpg"
        alt="comment avatar"
        className={cx("comment-avatar")}
      />
      <input
        type={"text"}
        className={cx("comment-input")}
        placeholder={"Write the answer"}
      />
      <FontAwesomeIcon className={cx("comment-sent")} icon={faPaperPlane} />
    </div>
  );
  return (
    <div className={cx("wrapper")}>
      <div className={cx("account")}>
        <div className={cx("account-item")}>
          <img
            src={
              "https://lh5.googleusercontent.com/-BGbVNgJFryw/AAAAAAAAAAI/AAAAAAAAAjk/C2iOlUOhQfA/photo.jpg"
            }
            alt="account"
            className={cx("account-img")}
          />
          <div className={cx("info")}>
            <h4 className={cx("name")}>Nguyen Duc Chinh</h4>
            <p className={cx("joined")}>Joined for 7 years</p>
          </div>
        </div>
        <div className={cx("review-info")}>
          <div className={cx("write")}>
            <FontAwesomeIcon icon={faComment} className={cx("review-icon")} />
            Written: 443 Reviews
          </div>
          <div className={cx("receive")}>
            <FontAwesomeIcon icon={faThumbsUp} className={cx("review-icon")} />
            Received: 179 Thanks
          </div>
        </div>
      </div>
      <div className={cx("review-content")}>
        <div className={cx("rating")}>
          <StarBar rate={5} size="medium" />
          <h4 className={cx("rate-label")}>Extremely satisfied</h4>
        </div>
        <p className={cx("content")}>
          Near 1:30 am on October 14, booked. I thought everyone was lucky
          enough to order a lucky one. The price of 32.9 is also much better
          than outside. Tiki delivered this morning. The machine is very
          beautiful, the packaging is also very secure. Everything is very
          satisfied 🥰 only scheduled for October 21 to deliver but this morning
          arrived 😘 New device with iOS 16.0.1 pre-installed 😌
        </p>
        <ul className={cx("image-list")}>
          {image.map((img, index) => (
            <li key={index} className={cx("image-item")}>
              <img src={img} alt="review" />
            </li>
          ))}
        </ul>
        <p className={cx("review-time")}>Review in 4 months </p>
        <div className={cx("action-btns")}>
          <Button icon={faThumbsUp} styles={"outline"} label={"Useful(25)"} />
          <Button
            onClick={handleCreateCmt}
            styles={"non-outline"}
            label={"Comment"}
          />
          <Button styles={"non-outline"} label={"Share"} />
        </div>
        <ul className={cx("comment-list")}>
          {writeComment && CommentWrite}
          {Comment}
        </ul>
      </div>
    </div>
  );
}

export default Review;
