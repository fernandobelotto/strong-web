import {
  businessDocLabels,
  documentTypeLabels,
  identityVerificationLabels,
  type BusinessDocument,
} from '@/constants/documents'
import { nhostClient } from '@/nhost'
import { parseISO } from 'date-fns'

interface Props {
  documents: BusinessDocument[]
  category: 'BUSINESS' | 'IDENTITY'
}

const includesDocCategories = (doc, cat) =>
  Object.keys(cat).includes(doc.documentCategory)

const returnDocs = ({ image, doc, cat }) => {
  return {
    image: image?.presignedUrl?.url,
    docType: doc.documentType,
    texts:
      cat === 'IDENTITY'
        ? [
            {
              key: 'Document',
              value: documentTypeLabels[doc.documentType]?.label,
            },
            {
              key: 'Date',
              value: parseISO(doc.uploadedAt)?.toLocaleDateString(),
            },
          ]
        : {
            key: 'Document',
            value: documentTypeLabels[doc.documentType]?.label,
          },
  }
}

export const getDocs = async ({ documents, category }: Props) => {
  try {
    const docs = []

    for (const doc of documents) {
      const isIdentityDoc = includesDocCategories(
        doc,
        identityVerificationLabels,
      )

      const isBusinessDoc = includesDocCategories(doc, businessDocLabels)
      const shouldReturnDocuments =
        category === 'IDENTITY' ? isIdentityDoc : isBusinessDoc

      const image = await nhostClient.storage.getPresignedUrl({
        fileId: doc?.image,
      })

      const newDoc = returnDocs({ image, cat: category, doc })

      if (shouldReturnDocuments) docs.push(newDoc)
    }

    return docs
  } catch (e) {
    return []
  }
}
