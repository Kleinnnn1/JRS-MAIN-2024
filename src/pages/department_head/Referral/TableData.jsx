import { useMutation, useQueryClient } from "@tanstack/react-query";
import ButtonDeleteReferral from "./ButtonDeleteReferral";
import { deleteReferral } from "../../../service/apiReferral";
import toast from "react-hot-toast";
import ButtonEditReferral from "./ButtonEditReferral";
import { useNavigate } from "react-router-dom";

export function TableData(referrals) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteReferral,
    onSuccess: () => {
      toast.success("Referral successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["referrals"] });
    },
    onError: (err) => toast.error(err.message),
  });

  // Transform the referral data into the desired format
  const formattedData = referrals
    ? referrals.map(
        (
          {
            referral_id, // Destructuring each object
            job_description,
            job_type,
            requestor_name,
            date_submitted,
            location,
            image,
          },
          index
        ) => [
          `${index + 1}. ${String(referral_id)}`, // Sequential number + referral_id
          job_description,
          job_type,
          requestor_name,
          new Date(date_submitted).toLocaleDateString(),
          location,
          <>
            <ButtonDeleteReferral onClick={() => mutate(referral_id)} />
            <ButtonEditReferral
              onClick={() =>
                navigate(`/department_head/referral/edit/${referral_id}`, {
                  state: {
                    referral_id,
                    job_description,
                    job_type,
                    requestor_name,
                    date_submitted,
                    location,
                    image,
                  },
                })
              }
            />

            {/* <ButtonEditReferral
              onClick={() =>
                navigate(`/department_head/referral/edit/${referral_id}`)
              } // Use referral_id in URL
            /> */}
          </>,
          image ? (
            <img
              src={image}
              alt="Referral"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
          ) : (
            "No image"
          ),
        ]
      )
    : []; // Default to empty array if no data

  // Fill remaining rows with empty arrays if there are fewer than 10 rows
  const filledData = [
    ...formattedData,
    ...Array(Math.max(0, 10 - formattedData.length)).fill([]),
  ];

  return filledData;
}

// export function transformReferralData(referral) {
//   const {
//     referral_id,
//     requerter_id,
//     job_description,
//     job_type,
//     requestor_name,
//     date_submitted,
//   } = referral;

//   const formattedData = referral
//     ? referral.map((item, index) => [
//         `${index + 1}. ${String(item.requester_id)}`, // Sequential number + requester_id
//         item.job_description,
//         item.job_type,
//         item.requestor_name,
//         new Date(item.date_submitted).toLocaleDateString(),
//         item.location,
//       ])
//     : []; // Default to empty array if no data
//   // Fill remaining rows with empty arrays if there are fewer than 10 rows
//   const filledData = [
//     ...formattedData,
//     ...Array(Math.max(0, 10 - formattedData.length)).fill([]),
//   ];
//   return filledData;
// }
