import Sidebar from '@/app/ui/layout/Sidebar'
import Content from '@/app/ui/layout/Content'

const folders = [
  {
    id: 1,
    name: 'Folder 1'
  },
  {
    id: 2,
    name: 'Folder 2'
  },
  {
    id: 3,
    name: 'Folder 3'
  }
]

export default function Folders() {
  return (
    <div className="flex flex-col sm:flex-row">
      <Sidebar />
      <Content>
        <div>
          <h1 className="text-2xl font-semibold mb-4 flex justify-between items-center">
            Folders
            <button className="bg-primary-500 hover:bg-primary-500/80 rounded-[11px] px-4 py-1 text-sm">New folder</button>
          </h1>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {folders.map(folder => (
              <div key={folder.id} className="mt-6">
                <a href={`/folders/${folder.id}`} className="">
                  <div className="bg-primary-600 pt-4 rounded-lg relative aspect-[4/3] shadow-inner">
                    <div className="absolute bg-primary-600 rounded-tl-lg rounded-tr-[16px] left-0 h-12 w-[70%] -top-3">
                      <div className="pl-2 pt-2 text-xs truncate">{folder.name}</div>
                    </div>
                    <div className="rounded-lg bg-primary-500 hover:bg-primary-500/80 p-4 shadow relative h-full">
                      
                    </div>
                  </div>                  
                </a>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-semibold mb-4">My destinations</h2>
        </div>
      </Content>
    </div>    
  )
}