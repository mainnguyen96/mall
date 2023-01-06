import classNames from 'classnames/bind';
import Search from '../Search';

import styles from './Header.module.css'

const cx = classNames.bind(styles)

function Header() {
    return ( 
        <header className={cx('wrapper')}>
            <Search/>
        </header>
     );
}

export default Header;