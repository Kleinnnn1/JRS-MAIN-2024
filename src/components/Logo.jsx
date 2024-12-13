import { motion } from "framer-motion";
import LogoJRS from "/src/assets/images/logo_jrs_.gif";

export default function Logo() {
  return (
    <motion.img
      src={LogoJRS}
      alt="Logo"
      className="py-2 w-[12vh] h-[14vh]"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 8 }}
      whileHover={{
        scale: 1.2, // Slightly increase size
        filter: "brightness(1.0)", // Increase brightness
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
    />

  );
}

//Color and Scale Change
{/* <motion.img
  src={LogoJRS}
  alt="Logo"
  className="py-2 w-[12vh] h-[14vh]"
  initial={{ scale: 0.5, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 150, damping: 8 }}
  whileHover={{
    scale: 1.2, // Slightly increase size
    filter: "brightness(1.5)", // Increase brightness
    transition: { duration: 0.3, ease: "easeInOut" },
  }}
/> */}

// Pulse Effect

{/* <motion.img
  src={LogoJRS}
  alt="Logo"
  className="py-2 w-[12vh] h-[14vh]"
  initial={{ scale: 0.5, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 150, damping: 8 }}
  whileHover={{
    scale: [1, 1.1, 1], // Scale up and down
    transition: { duration: 0.6, ease: "easeInOut", repeat: Infinity },
  }}
/> */}

//FLIP ANIMATION
{/* <motion.img
  src={LogoJRS}
  alt="Logo"
  className="py-2 w-[12vh] h-[14vh]"
  initial={{ scale: 0.5, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 150, damping: 8 }}
  whileHover={{
    rotateY: 180, // Flip horizontally
    transition: { duration: 0.6, ease: "easeInOut" },
  }}
/> */}

//Wobble Effect
{/* <motion.img
  src={LogoJRS}
  alt="Logo"
  className="py-2 w-[12vh] h-[14vh]"
  initial={{ scale: 0.5, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 150, damping: 8 }}
  whileHover={{
    y: [0, -10, 0], // Move up and down
    transition: { duration: 0.5, ease: "easeInOut", repeat: Infinity },
  }}
/> */}
