import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from '@fortawesome/free-solid-svg-icons'

import styles from './Button.module.css'

const cx = classNames.bind(styles)

function Button({icon, lable}) {
    return ( 
        <button className={cx('wrapper')}>
            <FontAwesomeIcon icon={faBell} />
            Notify
        </button>
     );
}

export default Button;