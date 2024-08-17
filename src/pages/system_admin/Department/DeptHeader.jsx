import userIcon from '/src/assets/images/SysAdIcons/userIcon.png'

export default function DepartmentHeader() {
    return (
<div className="flex items-center rounded bg-custom-blue m-2 p-2">
                    <img src={userIcon} alt="User Icon" className="w-9 h-9 ml-4" />
                    <p className='text-yellow-500 text-lg font-bold ml-3 flex items-center'>
                        ALL DEPARTMENTS
                    </p>
                </div>
                 );
                }
                