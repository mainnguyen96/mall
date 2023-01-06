import classNames from "classnames/bind";
import Button from "~/components/Button";

import Search from "~/components/Search";
import SearchCategory from "~/components/SearchCategory";

import styles from './Home.module.css'

const cx = classNames.bind(styles)

function Home() {
    return ( 
        <div className={cx('wrapper')}>
            <Search/>
            <SearchCategory/>
            <Button/>
        </div>
     );
}

export default Home;