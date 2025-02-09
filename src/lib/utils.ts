import imageCompression from 'browser-image-compression'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeLink(link?: string) {
  if (!link) return ''

  return link
    .replace(/\s/g, '')
    .replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,ˆ.<>\/?]+/, '')
    .toLocaleLowerCase()
}

export async function compressFile(files: File[]) {
  const compressPromises = files.map(async file => {
    try {
      return await compressImage(file)
    } catch (error) {
      console.error(error)
      return null
    }
  })

  return (await Promise.all(compressPromises)).filter(item => item !== null)
}

async function compressImage(file: File): Promise<File> {
  return new Promise(resolve => {
    imageCompression(file, {
      maxSizeMB: 0.2, // 200kb
      maxWidthOrHeight: 900,
      useWebWorker: true,
      fileType: 'image/png',
    }).then(compressedFile => {
      resolve(compressedFile)
    })
  })
}

export function formatUrl(url: string) {
  return url.startsWith('http') ? url : `https://${url}`
}

export function triggerImageInput(id: string) {
  document.getElementById(id)?.click()
}

export function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0] ?? null
  if (file) {
    const imageUrl = URL.createObjectURL(file)
    return imageUrl
  }

  return null
}
