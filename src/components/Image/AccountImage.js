import { forwardRef } from "react";
import classNames from "classnames/bind";

import images from "~/assets/images";
import Image from "./Image";
import styles from "./Image.module.css";

const cx = classNames.bind(styles);

function AccountImage({ src, ref, alt, ...props }) {
  return (
    <Image
      src={src}
      alt={alt}
      ref={ref}
      {...props}
      fallback={images.noAccountImage}
    />
  );
}

export default forwardRef((props, ref) => (
  <AccountImage {...props} ref={ref} />
));
