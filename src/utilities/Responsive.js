import { useEffect, useState } from "react";
function Responsive(){
    const [width, setWidth] = useState(window.innerWidth);
    
    const isDesktop = width >= 1400; 
    const isLaptop = width >= 1200; 
    const isMiniLaptop = width >= 992; 
    const isTablet = width >= 768; 
    const isMobile = width < 768; 

    useEffect(() => {
      const screenSize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", screenSize);
      return () => window.removeEventListener("resize", screenSize);
    }, []);

    return {isDesktop,isLaptop,isMiniLaptop,isTablet,isMobile};
}

export default Responsive