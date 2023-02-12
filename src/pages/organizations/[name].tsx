import { useEffect } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Organization() {
  const router = useRouter();
  const session = useSession();
  const { name } = router.query;

  const organization = api.organizations.getByName.useQuery(name as string, {
    enabled: false,
    staleTime: Infinity,
    retry: false,
  });
  const { data } = organization;

  const deleteOrganization = api.organizations.deleteOrganization.useMutation({
    onSuccess: () => {
      router.push("/organizations");
    },
  });

  const isAdmin = session.data?.user.id === organization.data?.ownerId;

  useEffect(() => {
    if (!!name) {
      organization.refetch();
    }
  }, [name]);
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
            <button
              className="btn-error btn"
              onClick={() => deleteOrganization.mutate(data.name)}
            >
              Delete Organization
            </button>
          )}
        </div>
      )}
    </div>
  );
}
