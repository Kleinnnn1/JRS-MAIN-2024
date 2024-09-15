import DefaultImageUser from "../../../assets/images/DefaultImageUser.jpg";
import useUserStore from "../../../store/useUserStore";

export default function ProfileImage() {
  const { userMetadata } = useUserStore();

  // Construct the full URL if needed
  const avatarUrl = userMetadata.avatar
    ? userMetadata.avatar
    : DefaultImageUser;

  return (
    <img
      src={avatarUrl}
      alt="Profile"
      className="w-[20vh] h-[20vh] rounded-full border border-black object-cover"
    />
  );
}
