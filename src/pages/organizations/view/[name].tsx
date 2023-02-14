import { useEffect, useId, useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { constructImageURL } from "@/utils/utils";
import { useUserContext } from "@/userContext/userContext";
import OpenModal from "@/components/ui/openModal";
import Modal from "@/components/ui/modal";
import Link from "next/link";

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
  const isAdmin = organization.data?.ownerId === session.data?.user?.id;
  const bgImage = data?.backgroundImage;

  const context = useUserContext();

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
    <div className="w-full max-w-2xl">
      <h1 className="text-center">Organization Page</h1>

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
            {isAdmin && (
              <div className="flex flex-col">
                <span>You are an admin of this organization.</span>
                <Link
                  href={`
                  /organizations/manage/${data.name}
                `}
                >
                  <button className="btn">Manage Organiation</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
