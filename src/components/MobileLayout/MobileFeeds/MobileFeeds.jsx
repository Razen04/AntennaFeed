import hinduImg from '../../../assets/hindu.jpeg'

const MobileFeeds = () => {
    return (
        <div className='absolute top-28 px-5 w-full grid gap-4 justify-evenly grid-cols-3 grid-flow-row'>
            <div className="each-feed relative w-24">
                <div className='absolute bg-blue-400 top-2 right-2 text-center p-1 rounded-lg'>
                    <p className='font-semibold'>10</p>
                </div>
                <img src={hinduImg} alt="" className='rounded-t-md' />
                <h1 className='bg-secondary py-2 text-center rounded-b-md'>The Hindu</h1>
            </div>
            <div className="each-feed relative w-24">
                <img src={hinduImg} alt="" className='rounded-t-md' />
                <h1 className='bg-secondary py-2 text-center rounded-b-md'>The Hindu</h1>
            </div>
            <div className="each-feed relative w-24">
                <img src={hinduImg} alt="" className='rounded-t-md' />
                <h1 className='bg-secondary py-2 text-center rounded-b-md'>The Hindu</h1>
            </div>
            <div className="each-feed relative w-24">
                <img src={hinduImg} alt="" className='rounded-t-md' />
                <h1 className='bg-secondary py-2 text-center rounded-b-md'>The Hindu</h1>
            </div>
            <div className="each-feed relative w-24">
                <img src={hinduImg} alt="" className='rounded-t-md' />
                <h1 className='bg-secondary py-2 text-center rounded-b-md'>The Hindu</h1>
            </div>
        </div>
    )
}

export default MobileFeeds