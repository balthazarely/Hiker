export const pageAnimation = {
  hidden: {
    opacity: 0,
    // y: 50,
  },
  show: {
    opacity: 1,
    // y: 0,
    transition: {
      duration: 0.25,
      when: "beforeChildren",
      staggerChildren: 0.25,
    },
  },
  exit: {
    opacity: 0,
    // y: 50,
    transition: {
      duration: 0.25,
    },
  },
};

export const cardAnimation = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      when: "beforeChildren",
      staggerChildren: 0.25,
    },
  },
};
