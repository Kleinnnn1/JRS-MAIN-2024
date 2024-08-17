import CertificateOfJobCompletion from "/src/assets/images/certificateOfJobCompletion.png";

export default function ImageCertificate() {
  return (
    <img
      src={CertificateOfJobCompletion}
      alt="Certificate"
      className="300 w-auto  h-[480px] aspect-auto" // Add border, gray color, and adjust size
    />
  );
}
