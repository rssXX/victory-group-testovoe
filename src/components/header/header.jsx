import React from 'react';
import styles from './header.module.scss'

const Header = () => {
    return (
        <header>
            <div className={`${styles.top}`}>
                <div className={`container ${styles.wrapper}`}>
                    <div>
                        Новосибирск, ул. Дунаевского, 25/1
                    </div>
                    <div>
                        Ежедневно с 9:00 до 20:00
                    </div>
                </div>
            </div>
            <div className={``}>
                <div>
                    <div>

                    </div>
                    <nav>

                    </nav>
                    <div>

                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;