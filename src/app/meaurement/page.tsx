import { MeasurementApi } from "@/libs/meaurementApi";
import MeaurementsTable from "./_components/MeaurementsTable";
const getAllMeaurements = async () => {
    let itemsPerPage = 10;
    let meaurements = []
    meaurements = await MeasurementApi.getAllMeaurements();
    let totalPages = Math.ceil(meaurements.length / itemsPerPage);

    return { meaurements, totalPages }
}

const Meaurement = async () => {

    const { meaurements , totalPages} = await getAllMeaurements()

    return (
        <section className="w-full p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Measurements Table</h1>

            <MeaurementsTable meaurements={meaurements} totalPages={totalPages}/>

        </section>
    );
};

export default Meaurement;
