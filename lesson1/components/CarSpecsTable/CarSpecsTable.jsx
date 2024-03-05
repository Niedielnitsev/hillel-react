import CARS from '../../src/constants.js';
import './CarSpecsTable.css';

export default function CarSpecsTable() {
    return (
        <table>
            <tbody>
            {CARS.map((brand, index) => {
                return (
                    <>
                        <CarBrandRow content={brand} key={index}/>
                        <CarModelsTable content={brand.models} key={index}/>
                    </>
                )
            })}
            </tbody>
        </table>
    )
}

const CarBrandRow = ({content}) => {
    return (
        <tr className="row__brand">
            <td colSpan="2">{content.brand}</td>
        </tr>
    )
}

const CarModelsTable = ({content = []}) => {
    return (
        <>
            {content.map((model, index) => {
                return content ? <CarModelSpecList collection={model.collection} name={model.name}/> : null
            })}
        </>
    )
}

const CarModelSpecList = ({collection = [], name = ""}) => {
    return (
        <>
            {collection.map((spec, index) => {
                return (
                    <tr key={index}>
                        <CarModelCell rowSpan={collection.length} name={name} index={index}/>
                        <td>
                            <ul key={index}>
                                <li>Version: {spec.version}</li>
                                <li>Year: {spec.year}</li>
                                <li>Horsepower: {spec.horsepower}</li>
                                <li>Engine: {spec.engine}</li>
                            </ul>
                        </td>
                    </tr>
                )
            })}
        </>
    )
}

const CarModelCell = ({rowSpan, name, index}) => {
    return index === 0 && name ? <td rowSpan={rowSpan} className="cell__model">{name}</td> : null
}