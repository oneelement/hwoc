type IconProps = {
  className?: string
}

export default function FolderIcon({ className }: IconProps) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.604 13l-1.272 7h-16.663l-1.272-7h19.207zm-14.604-11h-6v7h2v-5h3.084c1.38 1.612 2.577 3 4.916 3h10v2h2v-4h-12c-1.629 0-2.305-1.058-4-3zm17 9h-24l2 11h20l2-11z"/></svg>
    // <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.083 4c1.38 1.612 2.578 3 4.917 3h11v13h-20v-16h4.083zm.917-2h-7v20h24v-17h-13c-1.629 0-2.305-1.058-4-3z"/></svg>
  )
}