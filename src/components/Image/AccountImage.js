import { forwardRef } from "react";
import classNames from "classnames/bind";

import images from "~/assets/images";
import Image from "./Image";
import styles from "./Image.module.css";

const cx = classNames.bind(styles);

const AccountImage = forwardRef(({ src, alt, ...props }, ref) => {
  return (
    <Image
      src={src}
      alt={alt}
      ref={ref}
      {...props}
      fallback={images.noAccountImage}
    />
  );
});

export default AccountImage;
