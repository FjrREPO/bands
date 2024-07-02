import TableUsers from "./_components/TableUsers"
import NavbarDashboard from "@/components/NavbarDashboard"

async function page() {
    return (
        <div className='w-screen h-svh'>
            <NavbarDashboard/>
            <div className="pt-[50px] px-5">
                <TableUsers/>
            </div>
        </div>
    )
}

export default page