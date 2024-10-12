import axios from "axios";
async function getUniversidades(){
    const url="http://universities.hipolabs.com/search?country=Mexico";
    const universidades=await axios.get(url);
    //console.log(universidades.data);
    return universidades.data;
}

export default async function Universidades(){
    const universidades=await getUniversidades();
    return(
        <>
        <h1>Universidades</h1>
        <table className="table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Universidad</th>
                <th>Sitio web</th>
                </tr>
            </thead>
            <tbody>
                {
                    universidades.map((universidad,i)=>(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{universidad.name}</td>
                            <td>{universidad.web_pages[0]}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </>
    );
}