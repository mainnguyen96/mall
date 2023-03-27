import { useState, forwardRef } from "react";
import classNames from "classnames/bind";

import images from "~/assets/images";
import styles from "./Image.module.css";

const cx = classNames.bind(styles);

function Image({
  alt,
  src,
  ref,
  className,
  fallback: customFallback,
  ...props
}) {
  const [fallback, setFallback] = useState(() =>
    src ? src : customFallback || images.noImage
  );
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

export default forwardRef((props, ref) => <Image {...props} ref={ref} />);
