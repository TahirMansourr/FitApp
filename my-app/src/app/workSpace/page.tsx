import React from 'react'

const WorkSpace = () => {
  return (
    <div className='  flex gap-4 pt-6 pl-3  '>
        <section className=' w-[40rem] h-[25rem] border-[1rem] rounded-3xl border-gray shadow-2xl bg-white p-3 relative' >
        <h1 className=' text-center pb-4 font-bold'>Excercise name and date maybe</h1>
            <div className='  flex justify-between'>
            <div>
                <ul>
                    <li> excercises</li>
                    <li> excercises</li>
                    <li> excercises</li>
                    <li> excercises</li>
                </ul>
            </div>
                 <div className=' w-1 bg-black'></div>
                <div className=' '>
                    <h1>Notes</h1>
                    <p> It is really important to keep notes for the students</p>
                </div>
               
                
            </div>
            <footer className=' absolute bottom-3 right-3 flex'>
               <p>fire icon</p>
               <p>like icon</p> 
            </footer>
        </section>
        <section className=' bg-black w-1 h-[25rem] items-center rounded-3xl'>

        </section>
        <section className='h-fit '>
               <div>
                    <div className="flex gap-3">
                    <h1>coach image</h1>
                    <h1>coach name</h1>
                    </div>
                    <h1>Participants</h1>
                    <ul>
                        <li>participant</li>
                        <li>participant</li>
                        <li>participant</li>
                    </ul>

                
               </div>
        </section>
    </div>
  )
}

export default WorkSpace