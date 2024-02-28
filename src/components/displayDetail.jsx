import './../App.css'

function DisplayDetail({countryName,region,temeperature,weatherCondition,windSpeedKph,windSpeedMph,humidity,image}) {

    return (
        
        <div className="col d-flex align-items-start card m-2 p-3 containerStyles ">
            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                <svg className="bi" width="1em" height="1em"><use xlink:href="#cpu-fill" /></svg>
            </div>
            <div>
                <h3 className="fs-2 text-body-emphasis ">{countryName}</h3>
                <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                <a href="#" className="btn btn-primary">
                    Primary button
                </a>
            </div>
        </div>
     
    )
}

export default DisplayDetail