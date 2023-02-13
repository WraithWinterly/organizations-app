// import { uploadOrganizationBgImage } from "@/utils/restApiTypes";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { deleteImage, uploadImage } from "@/utils/cloudinary";
import { getImage } from "@/utils/formidable";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name } = req.query;
    const session = await getServerAuthSession({ req, res });

    if (req.method !== "POST") {
      throw new Error("Only POST requests allowed.");
    }
    if (!session) {
      throw new Error("You must be signed in to view this page.");
    }
    if (!name) {
      throw new Error("You must provide an organization name.");
    }

    const org = await prisma.organization.findUnique({
      where: {
        name: name as string,
      },
      include: {
        backgroundImage: true,
      },
    });
    if (org?.ownerId === session.user.id) {
      if (!!org.backgroundImage && !!org.backgroundImage.publicId) {
        await deleteImage(org.backgroundImage.publicId);
        await prisma.image.delete({
          where: {
            id: org.backgroundImage.id,
          },
        });
      }

      const imageUploaded = await getImage(req);

      const imageData: any = await uploadImage(imageUploaded.filepath);

      const newImage = await prisma.image.create({
        data: {
          publicId: imageData.public_id,
          format: imageData.format,
          version: imageData.version.toString(),
        },
      });

      await prisma.organization.update({
        where: {
          name: name as string,
        },
        include: {
          backgroundImage: true,
        },
        data: {
          backgroundImage: {
            connect: {
              id: newImage.id,
            },
          },
        },
      });
    }
    return res.send({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
    });
  }
}
