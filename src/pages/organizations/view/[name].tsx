import { useEffect, useId, useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { constructImageURL } from "@/utils/utils";
import { useUserContext } from "@/userContext/userContext";
import OpenModal from "@/components/ui/openModal";
import Modal from "@/components/ui/modal";

export default function Organization() {
  const id = useId();
  const router = useRouter();
  const session = useSession();
  const { name } = router.query;

  const organization = api.organizations.getByName.useQuery(name as string, {
    enabled: false,
    staleTime: Infinity,
    retry: false,
  });
  const { data } = organization;
  const bgImage = data?.backgroundImage;

  const deleteOrganization = api.organizations.deleteOrganization.useMutation({
    onSuccess: () => {
      router.push("/organizations");
    },
  });

  const context = useUserContext();
  const isAdmin = session.data?.user.id === organization.data?.ownerId;

  useEffect(() => {
    if (!!name) {
      organization.refetch();
    }
  }, [name]);
  useEffect(() => {
    if (!!bgImage) {
      context.setBackgroundImage(constructImageURL(bgImage));
    } else {
      context.setBackgroundImage(null);
    }
  }, [bgImage]);
  return (
    <div>
      <h1>Organization Page</h1>

      {organization.error && (
        <div>
          <h2>Not Found</h2>
          <span>{organization?.error?.message}</span>
        </div>
      )}
      {data && (
        <div className="rounded-lg bg-purple-900 px-4 py-4">
          <h3>Name: {data.name}</h3>
          <h3>Description: {data.description}</h3>
          <div className="flex flex-col gap-2 rounded-md bg-purple-800 px-2 py-2">
            <h3>Owner</h3>
            <span>Name: {data.owner?.name}</span>
            <img
              src={data.owner?.image as string}
              alt="profile"
              className="h-36 w-36 rounded-full"
            />
          </div>
          {isAdmin && (
            <>
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
      // router.push(`/organizations/view/${name}`);
      router.reload();
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
