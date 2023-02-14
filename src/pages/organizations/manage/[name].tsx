import NotSignedIn from "@/components/notSignedIn";
import Modal from "@/components/ui/modal";
import OpenModal from "@/components/ui/openModal";
import { useUserContext } from "@/userContext/userContext";
import { api } from "@/utils/api";
import { constructImageURL } from "@/utils/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useId, useState } from "react";

export default function ManageOrganization() {
  const session = useSession();
  const ctx = useUserContext();
  const router = useRouter();
  const { name } = router.query;
  const id = useId();

  const organization = api.organizations.getByName.useQuery(name as string, {
    enabled: !!name && session.status === "authenticated",
    staleTime: Infinity,
    retry: false,
  });
  const isAdmin = organization.data?.ownerId === session.data?.user?.id;
  const { data } = organization;
  const bgImage = data?.backgroundImage;
  const deleteOrganization = api.organizations.deleteOrganization.useMutation({
    onSuccess: () => {
      router.push("/organizations");
    },
  });
  useEffect(() => {
    if (!!bgImage) {
      ctx.setBackgroundImage(constructImageURL(bgImage));
    } else {
      ctx.setBackgroundImage(null);
    }
  }, [bgImage]);

  if (session.status === "unauthenticated") {
    return <NotSignedIn />;
  }

  if (!isAdmin) {
    return (
      <>
        <h1>Access Denied.</h1>
        <h2>The organization does not exist or you are not the owner of it.</h2>
      </>
    );
  }

  return (
    <div>
      {organization.isLoading && <h1>Loading</h1>}
      {organization.isSuccess && data && (
        <>
          <h1>Manage Organization</h1>
          <button
            className="btn-error btn"
            onClick={() => deleteOrganization.mutate(data.name)}
          >
            Delete Organization
          </button>

          <OpenModal modalId={id} text="Upload BG Image" />
          <UploadBGImageSection modalId={id} orgName={name as string} />
        </>
      )}
    </div>
  );
}

interface UploadBGImageSectionProps {
  modalId: string;
  orgName: string;
}
function UploadBGImageSection({ modalId, orgName }: UploadBGImageSectionProps) {
  const router = useRouter();

  const [imageUploaded, setImageUploaded] = useState<File>();

  const handleChange = (e: any) => {
    setImageUploaded(e.target.files[0]);
  };

  const submit = async (e: any) => {
    e.preventDefault();
    if (!imageUploaded) {
      return;
    }

    const formData = new FormData();
    formData.append("image", imageUploaded);

    const response = await fetch(
      `/api/organizations/uploadImageBg/${orgName}`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.ok) {
      router.push(`/organizations/view/${orgName}`);
    }
  };

  return (
    <Modal uniqueId={modalId}>
      <div className="page">
        <form
          onSubmit={submit}
          className="flex flex-col gap-4 rounded-md  px-4 py-2"
        >
          <h1>Set Background Image</h1>

          <input
            onChange={handleChange}
            className="block w-full cursor-pointer rounded-lg border border-gray-800 bg-gray-700 text-sm text-gray-200 focus:outline-none"
            accept=".jpg, .png, .jpeg"
            type="file"
          ></input>

          <input
            type="submit"
            value="Upload"
            className="btn-primary btn "
            disabled={!imageUploaded}
          />
        </form>
      </div>
    </Modal>
  );
}
