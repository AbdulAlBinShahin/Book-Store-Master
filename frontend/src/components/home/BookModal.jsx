import ReactDOM from "react-dom"
import { AiOutlineClose } from "react-icons/ai"
import { BiUserCircle } from "react-icons/bi"
import { PiBookOpenTextLight } from "react-icons/pi"

const BookModal = ({ book, onClose }) => {
  return ReactDOM.createPortal((
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div 
        onClick={(event) => event.stopPropagation()}
        className='relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white/95 p-6 text-slate-900 shadow-2xl shadow-slate-200/60 backdrop-blur'
      >
       <AiOutlineClose 
          className='absolute right-5 top-5 cursor-pointer text-2xl text-slate-500 transition hover:text-slate-700'
          onClick={onClose}      
       />
        <div className='flex items-start justify-between gap-4'>
          <div className='flex min-w-0 items-start gap-3'>
            <div className='grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sky-50 ring-1 ring-sky-100'>
              <PiBookOpenTextLight className='text-2xl text-sky-300' />
            </div>
            <div className='min-w-0'>
              <h2 className='truncate text-xl font-bold tracking-tight'>{book.title}</h2>
              <div className='mt-2 flex items-center gap-2 text-sm text-slate-600'>
                <BiUserCircle className='text-lg text-slate-500' />
                <span className='truncate'>{book.author}</span>
              </div>
            </div>
          </div>

          <div className='rounded-xl bg-rose-500/15 px-3 py-1 text-xs font-semibold text-rose-200 ring-1 ring-rose-500/20'>
            {book.publishYear}
          </div>
        </div>

        <div className='mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4'>
          <div className='text-xs font-semibold uppercase tracking-wide text-slate-600'>Book ID</div>
          <div className='break-all font-mono text-sm text-slate-700'>{book._id}</div>
        </div>

        <div className='mt-4 grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4'>
          <div className='text-xs font-semibold uppercase tracking-wide text-slate-600'>Description</div>
          <div className='text-sm leading-6 text-slate-700'>
            {book.description?.trim() ? book.description : 'No description added yet.'}
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-2'>
          <button className='btn-secondary' onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  ), document.body)
}

export default BookModal