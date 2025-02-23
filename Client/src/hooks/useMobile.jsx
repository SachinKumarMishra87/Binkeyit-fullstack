import React, { useEffect, useState } from 'react'

const useMobile = (breakPoint = 768) => {

    const [isMobail, setIsMobail] = useState(window.innerWidth < breakPoint);

    const handleResize = () => {
        const checkPoint = window.innerWidth < breakPoint;
        setIsMobail(checkPoint);
    }

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }

    }, [])

    return [isMobail]
}

export default useMobile;
