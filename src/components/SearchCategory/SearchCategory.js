import classNames from "classnames/bind";

import styles from './SearchCategory.module.css'

const cx = classNames.bind(styles)

function SearchCategory() {
    return ( 
        <div className={cx('wrapper')}>
            <ul className={cx('cate-list')}>
                <li className={cx('cate-item')}>fruits</li>
                <li className={cx('cate-item')}>fruits</li>
            </ul>
        </div>
     );
}

export default SearchCategory;