// src/utils/animations.js
export const fadeInUp = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0 
    },
    exit: { 
      opacity: 0, 
      y: 20 
    },
    transition: { 
      duration: 0.5 
    }
  };
  
  export const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  export const fadeIn = {
    initial: { 
      opacity: 0 
    },
    animate: { 
      opacity: 1 
    },
    exit: { 
      opacity: 0 
    },
    transition: { 
      duration: 0.3 
    }
  };
  
  export const slideIn = {
    initial: { 
      x: -100, 
      opacity: 0 
    },
    animate: { 
      x: 0, 
      opacity: 1 
    },
    exit: { 
      x: 100, 
      opacity: 0 
    },
    transition: { 
      type: "spring", 
      damping: 25, 
      stiffness: 500 
    }
  };
  
  export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };