import { useState, forwardRef, useEffect } from "react";
import classNames from "classnames/bind";

import images from "~/assets/images";
import styles from "./Image.module.css";

const cx = classNames.bind(styles);

const Image = forwardRef(
  ({ alt, src, className, fallback: customFallback, ...props }, ref) => {
    const [fallback, setFallback] = useState(null);
    useEffect(() => {
      setFallback(src ? src : customFallback || images.noImage);
    }, [src, customFallback]);
    const handleError = () => {
      setFallback(customFallback || images.noImage);
    };
    return (
      <img
        ref={ref}
        alt={alt}
        src={fallback}
        className={classNames(styles.wrapper, className)}
        {...props}
        onError={handleError}
      />
    );
  }
);

export default Image;
