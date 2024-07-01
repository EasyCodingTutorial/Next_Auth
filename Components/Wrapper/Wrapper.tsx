import React from 'react'

import styles from './Wrapper.module.css'

const Wrapper = (
    { children }: { children: React.ReactNode }
) => {
    return (
        <div className={styles.Wrapper}>
            <div>
                <img src="/assets/auth.jpg" alt="" />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Wrapper