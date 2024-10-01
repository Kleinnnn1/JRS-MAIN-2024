import CertificateOfJobCompletion from "/src/assets/images/JRF.jpg";

export default function ImageCertificate() {
  return (
    <img
      src={CertificateOfJobCompletion}
      alt="Certificate"
      className="300 w-auto  h-[400px] aspect-auto" // Add border, gray color, and adjust size
    />
  );
}
